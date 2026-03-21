import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { cn } from "@/utilities/ui";

type BannerMobileProps = {
  bg?: string;
  size?: "small" | "medium" | "large";
  title: string;
  description: string;
  button: {
    text: string;
    link: string;
  } | null;
  className?: string;
};

const BannerMobile: React.FC<BannerMobileProps> = ({
  bg,
  title,
  description,
  button,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative left-0 top-0 m-0 max-h-max p-0 align-top",
        className,
      )}
    >
      <div className="bg-yoi-header-from">
        <div className="justify-top container flex h-max w-screen flex-1 flex-col items-center space-y-4 pb-10 pt-8 text-center">
          <div className="relative w-screen">
            <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-transparent from-80% to-yoi-header-from" />
            <Image
              alt="Hero"
              className="mx-auto aspect-[2/1] overflow-hidden object-cover"
              height={400}
              src={bg ?? ""}
              width={800}
              quality={90}
              priority={true}
            />
          </div>
          <div className="space-y-2">
            <h1 className="fancy text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none">
              {title}
            </h1>
            <p className="text-gray-800 dark:text-gray-400 md:text-xl">
              {description}
            </p>
            {button === null ? null : (
              <Button className="w-[75%]">
                <Link href={button.link}>{button.text} </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerMobile;
