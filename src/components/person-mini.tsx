import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

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
  // process name to extract initials
  // null-check name
  const checkedName = name ?? "Person Name";
  const splitName = checkedName.split(" ");
  const initials = `${splitName[0].charAt(0)}${splitName[1]?.charAt(0)}`;

  return (
    <Card
      className={
        "flex h-[11rem] grow border border-gray-200 pb-2 transition-all hover:scale-105 dark:border-gray-800" +
        className
      }
    >
      <Avatar className="aspect-square h-full w-auto overflow-hidden rounded-md">
        <AvatarImage alt={name} src={picture ?? "/images/placeholder.png"} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex h-full flex-col justify-between text-left align-middle">
        <CardHeader className="flex flex-col">
          <CardTitle>{checkedName}</CardTitle>
          <CardDescription>({pronouns})</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-gray-500 dark:text-gray-400">
            {role}
          </CardTitle>
        </CardContent>
      </div>
    </Card>
  );
};

export default PersonMiniCard;
