import { cn } from "@/lib/utils";

const BannerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <g clipPath="url(#clip0_294_887)">
        <path
          d="M10 19.5352C14.99 19.5352 19.0352 15.49 19.0352 10.5C19.0352 5.51002 14.99 1.46484 10 1.46484C5.01002 1.46484 0.964844 5.51002 0.964844 10.5C0.964844 15.49 5.01002 19.5352 10 19.5352Z"
          stroke="#047857"
          strokeWidth="1.57133"
        />
        <path
          d="M9.95335 15.2104C12.5811 15.2104 14.7114 13.0802 14.7114 10.4524C14.7114 7.82458 12.5811 5.69434 9.95335 5.69434C7.32556 5.69434 5.19531 7.82458 5.19531 10.4524C5.19531 13.0802 7.32556 15.2104 9.95335 15.2104Z"
          fill="#047857"
        />
      </g>
      <defs>
        <clipPath id="clip0_294_887">
          <rect width="20" height="21" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BannerIcon;
