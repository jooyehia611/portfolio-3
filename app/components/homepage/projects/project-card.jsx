// @flow strict

import * as React from 'react';
import Image from 'next/image';
import { BsFolder2Open } from 'react-icons/bs';

function ProjectCard({ project }) {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden p-5 sm:p-6 lg:p-8">
      <Image
        src="/blur-23.svg"
        alt=""
        width={1080}
        height={200}
        className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-60"
      />
      <div className="relative z-10 flex min-h-0 flex-1 gap-4 sm:gap-5">
        <div
          className="shrink-0 text-violet-500 transition-transform duration-300 group-hover:scale-110"
          aria-hidden
        >
          <BsFolder2Open className="h-8 w-8 sm:h-9 sm:w-9" />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#16f2b3]">
            {project.role}
          </p>
          <div className="shrink-0">
            <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">
              {project.name}
            </h3>
            {project.company && (
              <p className="mt-1.5 text-sm text-gray-400">{project.company}</p>
            )}
          </div>
          <ul
            className="flex shrink-0 flex-wrap gap-2"
            aria-label="Technologies"
          >
            {project.tools.map((tag, i) => (
              <li key={`${tag}-${i}`}>
                <span className="inline-block rounded-md border border-[#2a2e5a] bg-[#14162a]/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-300 sm:text-xs">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
          <p className="min-h-0 flex-1 overflow-y-auto border-t border-white/5 pt-3 text-sm leading-relaxed text-gray-400 [scrollbar-width:thin] sm:pt-4">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
