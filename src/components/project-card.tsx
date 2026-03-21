/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Image from "next/image";
import React from "react";

type ProjectCardProps = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
  className?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  link,
  className,
}) => {
  const checkedTitle = title ?? "Project Title";
  const checkedImage = image ?? "/heroes/wexor-tmg-L-2p8fapOA8-unsplash.jpg";
  const checkedLink = link ?? "#";

  return (
    <div className={"group relative overflow-hidden rounded-lg " + className}>
      <Link className="absolute inset-0 z-10" href={checkedLink}>
        <span className="sr-only">View Project</span>
      </Link>
      <Image
        alt={checkedTitle}
        className="h-60 w-full object-cover transition-all duration-300 group-hover:scale-105"
        height={300}
        src={checkedImage}
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
        width={400}
      />
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
