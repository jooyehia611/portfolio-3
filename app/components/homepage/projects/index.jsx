import Image from 'next/image';
import { projectsData } from '@/utils/data/projects-data';
import GlowCard from '../../helper/glow-card';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <div
      id="projects"
      className="relative z-50 my-12 scroll-mt-28 border-t border-[#25213b] lg:my-24"
    >
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="my-5 flex justify-center lg:py-8">
        <div className="flex items-center">
          <span className="h-[2px] w-24 bg-[#1a1443]" />
          <span className="w-fit rounded-md bg-[#1a1443] p-2 px-5 text-xl text-white">
            Projects
          </span>
          <span className="h-[2px] w-24 bg-[#1a1443]" />
        </div>
      </div>

      <div className="pb-10 pt-2 lg:pb-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 px-4 sm:gap-8 md:grid-cols-2 lg:gap-8">
          {projectsData.map((project) => (
            <GlowCard
              key={project.id}
              identifier={`project-${project.id}`}
              fullHeight
            >
              <ProjectCard project={project} />
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
