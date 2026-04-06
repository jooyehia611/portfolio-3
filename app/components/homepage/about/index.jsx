// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="group relative h-[min(85vw,300px)] w-[min(85vw,300px)] sm:h-[320px] sm:w-[320px] overflow-hidden rounded-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
            <Image
              src={personalData.profile}
              alt={personalData.name}
              fill
              priority
              quality={95}
              sizes="(max-width: 640px) min(85vw, 300px), 320px"
              className="object-cover object-[center_25%] transition-all duration-1000 grayscale group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;