import React from "react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PersonMiniProps = {
  picture?: string;
  name?: string;
  pronouns?: string;
  role?: string;
  className?: string;
};

const PersonMiniCard: React.FC<PersonMiniProps> = ({
  picture,
  name,
  pronouns,
  role,
  className,
}) => {
  const checkedName = name ?? "Person Name";
  const splitName = checkedName.split(" ");
  const initials = `${splitName[0].charAt(0)}${splitName[1]?.charAt(0) ?? ""}`;

  return (
    <div
      className={
        "flex h-[11rem] grow overflow-hidden rounded-lg border border-gray-200 transition-all hover:scale-105 dark:border-gray-800 " +
        (className ?? "")
      }
    >
      {/* Photo — fills full left side, no gaps */}
      <div className="relative aspect-square h-full flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={picture}
            alt={checkedName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl font-medium text-gray-500">
            {initials}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col justify-between text-left">
        <CardHeader className="flex flex-col pb-2">
          <CardTitle className="truncate">{checkedName}</CardTitle>
          <CardDescription>({pronouns})</CardDescription>
        </CardHeader>
        <div className="px-6 pb-4">
          <CardTitle className="text-gray-500 dark:text-gray-400">
            {role}
          </CardTitle>
        </div>
      </div>
    </div>
  );
};

export default PersonMiniCard;
