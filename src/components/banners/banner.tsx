import BannerDesktop from "./banner-desktop";
import BannerMobile from "./banner-mobile";
import React from "react";

type BannerProps = {
  title: any;
  description: string;
  bg: string;
  size?: "small" | "medium" | "large";
  buttonName?: string;
  buttonLink?: string;
};

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  bg,
  size,
  buttonName,
  buttonLink,
}) => {
  let button = null;
  if (buttonName !== undefined && buttonLink !== undefined) {
    button = {
      text: buttonName,
      link: buttonLink,
    };
  }
  return (
    <div>
      <BannerMobile
        bg={bg ?? ""}
        title={title}
        description={description}
        button={button}
        className="relative block md:hidden"
      />
      <BannerDesktop
        bg={bg ?? ""}
        size={size ?? "large"}
        title={title}
        description={description}
        button={button}
        className="hidden md:relative md:block"
      />
    </div>
  );
};

export default Banner;
