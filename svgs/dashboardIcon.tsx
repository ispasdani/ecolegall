import { cn } from "@/lib/utils";

const DashboardIcon = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <path
        d="M27.7778 16.6667V0H50V16.6667H27.7778ZM0 27.7778V0H22.2222V27.7778H0ZM27.7778 50V22.2222H50V50H27.7778ZM0 50V33.3333H22.2222V50H0ZM5.55556 22.2222H16.6667V5.55556H5.55556V22.2222ZM33.3333 44.4444H44.4444V27.7778H33.3333V44.4444ZM33.3333 11.1111H44.4444V5.55556H33.3333V11.1111ZM5.55556 44.4444H16.6667V38.8889H5.55556V44.4444Z"
        fill={fill ? fill : "#25A18E"}
      />
    </svg>
  );
};

export default DashboardIcon;
