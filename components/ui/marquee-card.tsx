import { cn } from "@/lib/utils";
import Image from "next/image";

export const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-96 cursor-pointer overflow-hidden rounded-xl border p-4 h-40",
        "border-gray-950/[.1] bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-muted">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-primary">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-muted">{body}</blockquote>
    </figure>
  );
};