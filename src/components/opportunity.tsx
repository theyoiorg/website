import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarIcon, Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type ProviderInfo = {
  name: string;
  image: string;
  url: string;
};

type AvailabilityInfo = {
  allAges: boolean;
  min: number;
  max: number;
  open: boolean;
};

type OpportunityInfo = {
  title: string;
  posted: string;
  deadline: string;
  location: string;
  description: string;
  provider: ProviderInfo;
  link: string;
  availability: AvailabilityInfo;
  tags: string[];
  requirements: string[];
};

type OpportunityProps = {
  opportunityData: OpportunityInfo;
  className?: string;
};

const OpportunityCard: React.FC<OpportunityProps> = ({
  opportunityData,
  className,
}) => {
  const data = opportunityData;
  const checkedName = data.provider.name ?? "Provider Name";
  const splitName = checkedName.split(" ");
  const initials = `${splitName[0].charAt(0)}`;
  const checkedLink = data.link ?? "#";
  const formattedDates = {
    posted: formatDate(data.posted),
    deadline:
      data.deadline === "12-31-9999"
        ? "No Deadline"
        : formatDate(data.deadline),
  };

  return (
    <Card className={`flex h-full flex-col ${className}`}>
      <CardHeader className="grow-0">
        <CardTitle className="h-16 overflow-hidden align-text-bottom text-2xl font-bold">
          {data.title}
        </CardTitle>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              alt={data.provider.name}
              src={data.provider.image ?? "/images/placeholder.png"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="gap-2 self-start">
            <p className="font-medium leading-4">{data.provider.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {`Posted ${formattedDates.posted}`}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grow space-y-4">
        <div className="prose prose-sm dark:prose-invert">
          {data.description}
        </div>
        {
          // add requirements section if there are any and add the requirements as an unordered list
          data.requirements.length > 0 ? (
            <div>
              <h2>Requirements</h2>
              <ul className="list-outside list-disc pl-5">
                {data.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          ) : null
        }
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {`Deadline: ${formattedDates.deadline}`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex grow-0">
        {
          // add a horizontal scroll of all the tags on the card
          data.tags.length > 0 ? (
            <div className="scrollbar-hide overflow-x-scroll overscroll-x-contain">
              <div className="flex flex-nowrap gap-2">
                {data.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 text-nowrap rounded-full bg-gray-200 px-4 py-1 dark:bg-gray-800"
                  >
                    {tag}
                  </div>
                ))}
                <div className="w-6 flex-shrink-0" />
              </div>
              <div className="bg-red absolute left-0 top-0 w-24"></div>
            </div>
          ) : null
          // create a gradient behind the link but in front of the tags
        }
        <Link
          className="ml-auto inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href={checkedLink}
        >
          <Link2Icon className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
export type { AvailabilityInfo, OpportunityInfo, ProviderInfo };

function formatDate(dateString: string): string {
  const [month, day, year] = dateString.split("-").map(Number);
  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return "Invalid Date";
  }
  const date = new Date(year, month - 1, day);

  return isNaN(date.getTime())
    ? "Date Unavailable"
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}
