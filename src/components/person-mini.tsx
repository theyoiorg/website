import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PersonMiniProps = {
  picture?: string;
  name?: string;
  pronouns?: string;
  role?: string;
  className?: string;
};

const PersonMiniCard: React.FC<PersonMiniProps> = ({ picture, name, pronouns, role, className }) => {
  const checkedName = name ?? "Person Name";
  const splitName = checkedName.split(" ");
  const initials = `${splitName[0].charAt(0)}${splitName[1]?.charAt(0) ?? ""}`;

  return (
    <Card className={"flex h-[11rem] grow overflow-hidden border border-gray-200 transition-all hover:scale-105 dark:border-gray-800 " + (className ?? "")}>
      {/* Avatar overridden to fill the full left side instead of a circle */}
      <Avatar className="h-full w-auto aspect-square rounded-none shrink-0 flex-none">
        <AvatarImage
          src={picture ?? "/images/placeholder.png"}
          alt={checkedName}
          className="h-full w-full object-cover object-center rounded-none"
        />
        <AvatarFallback className="h-full w-full rounded-none text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col justify-between min-w-0 text-left">
        <CardHeader className="flex flex-col">
          <CardTitle className="truncate">{checkedName}</CardTitle>
          <CardDescription>({pronouns})</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-gray-500 dark:text-gray-400">{role}</CardTitle>
        </CardContent>
      </div>
    </Card>
  );
};

export default PersonMiniCard;
