import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type PersonProps = {
  picture?: string;
  name?: string;
  pronouns?: string;
  role?: string;
  description?: string;
  className?: string;
};

const PersonCard: React.FC<PersonProps> = ({
  picture,
  name,
  pronouns,
  role,
  description,
  className,
}) => {
  // process name to extract initials
  // nullcheck name
  const checkedName = name ?? "Person Name";
  const splitName = checkedName.split(" ");
  const initials = `${splitName[0].charAt(0)}${splitName[1]?.charAt(0)}`;

  return (
    <Card className={"h-full grow " + className}>
      <CardHeader>
        <div className="mr-auto flex content-start justify-center gap-4">
          <Avatar className="size-[6rem] content-center">
            <AvatarImage
              alt={name}
              src={picture ?? "/images/placeholder.png"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between text-left">
            <span>
              <CardTitle className="font-medium">{name}</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                {pronouns}
              </CardDescription>
            </span>
            <CardTitle className="text-wrap font-medium">{role}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-justify">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PersonCard;
