// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { MdAlternateEmail, MdArrowOutward } from "react-icons/md";

const contactMethods = [
  {
    key: "email",
    label: "Email",
    description: "Send me a message directly",
    href: `mailto:${personalData.email}`,
    external: false,
    icon: MdAlternateEmail,
    accent: "from-cyan-500/20 to-[#16f2b3]/10",
    iconBg: "bg-[#16f2b3]/15 text-[#16f2b3]",
    borderHover: "hover:border-[#16f2b3]/40",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description: "Connect on LinkedIn",
    href: personalData.linkedIn,
    external: true,
    icon: BiLogoLinkedin,
    accent: "from-blue-600/20 to-[#0A66C2]/10",
    iconBg: "bg-[#0A66C2]/20 text-[#70b5f9]",
    borderHover: "hover:border-[#0A66C2]/50",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    description: "Chat on WhatsApp",
    href: personalData.whatsapp,
    external: true,
    icon: FaWhatsapp,
    accent: "from-emerald-500/20 to-[#25D366]/10",
    iconBg: "bg-[#25D366]/15 text-[#25D366]",
    borderHover: "hover:border-[#25D366]/40",
  },
];

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-20 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-medium text-[#16f2b3] text-xl uppercase tracking-wide mb-3">
            Get in touch
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Let&apos;s work together
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Prefer a direct line? Choose how you&apos;d like to reach me — I&apos;ll get back to you
            as soon as I can.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {contactMethods.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
                <div className="relative flex flex-col items-center text-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={28} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.label}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{item.description}</p>
                    {item.key === "email" && (
                      <p className="text-sm text-[#16f2b3]/90 break-all px-1">
                        {personalData.email}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-[#16f2b3] transition-colors">
                    Open
                    <MdArrowOutward className="w-4 h-4" />
                  </span>
                </div>
              </>
            );

            const cardClass = `group relative flex flex-col rounded-2xl border border-[#1f223c] bg-[#0d1224] p-8 shadow-[0_0_40px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 ${item.borderHover} hover:shadow-[0_8px_40px_-12px_rgba(22,242,179,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16f2b3]`;

            if (item.key === "email") {
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={cardClass}
                  aria-label={`Email ${personalData.email}`}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
                aria-label={`${item.label} (opens in new tab)`}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
