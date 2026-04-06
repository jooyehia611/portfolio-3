import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

function getTransporter() {
  const user = process.env.EMAIL_ADDRESS;
  const pass = process.env.GMAIL_PASSKEY;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
}

const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

async function sendEmail(transporter, payload, plainText) {
  const { name, email, message: userMessage } = payload;
  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_ADDRESS}>`,
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: plainText,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
}

async function sendViaResend(payload, plainText) {
  const { name, email, message: userMessage } = payload;
  const to = process.env.EMAIL_ADDRESS;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `New Message From ${name}`,
      text: plainText,
      html: generateEmailTemplate(name, email, userMessage),
      replyTo: email,
    });
    if (error) {
      console.error('Resend error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Resend send failed:', err.message);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    if (!name?.trim() || !email?.trim() || !userMessage?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;
    const hasTelegram = Boolean(token && chat_id);

    const hasResend = Boolean(
      process.env.RESEND_API_KEY?.trim() && process.env.EMAIL_ADDRESS?.trim()
    );
    const transporter = getTransporter();
    const hasGmail = Boolean(transporter);

    if (!hasTelegram && !hasResend && !hasGmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Contact form is not configured. Add RESEND_API_KEY (see .env.local), or EMAIL_ADDRESS + GMAIL_PASSKEY, or Telegram vars.',
        },
        { status: 503 }
      );
    }

    const plainText = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

    let telegramOk = true;
    if (hasTelegram) {
      telegramOk = await sendTelegramMessage(token, chat_id, plainText);
    }

    let emailOk = false;
    if (hasResend) {
      emailOk = await sendViaResend(payload, plainText);
    } else if (hasGmail) {
      emailOk = await sendEmail(transporter, payload, plainText);
    }

    if (telegramOk || emailOk) {
      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully.',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Could not send your message. Please try again or email directly.',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error occurred.' },
      { status: 500 }
    );
  }
}
