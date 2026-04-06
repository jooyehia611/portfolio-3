// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

/**
 * Profile photo (rounded) + wordmark — uses same image as About section.
 */
function BrandLogo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
      <span
        className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#16f2b3]/35 shadow-[0_0_24px_rgba(22,242,179,0.2)] [isolation:isolate]"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      >
        <Image
          src={personalData.profile}
          alt={personalData.name}
          fill
          sizes="44px"
          priority
          className="object-cover object-[center_25%]"
        />
      </span>

      <span className="font-bold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-[#16f2b3] via-[#5eead4] to-[#c084fc] bg-clip-text text-transparent [text-shadow:0_1px_0_rgba(0,0,0,0.35)]">
        Yousef
      </span>
    </span>
  );
}

export default BrandLogo;
