import { cn } from "@/lib/utils";

const AskALegalQuestionIcon = ({
  className,
  fill,
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 -960 960 960"
      width="48px"
      fill={fill ? fill : "#25A18E"}
      className={cn("", className)}
    >
      <path d="M480-81q-140-35-230-162.5T160-523v-238l320-120 320 120v238q0 152-90 279.5T480-81Zm0-62q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Zm0 195q15 0 26-11t11-26q0-15-11-26t-26-11q-15 0-26 11t-11 26q0 15 11 26t26 11Zm-25-124h50q0-15 1.5-25t5.5-18q4-8 11-16t18-19q24-22 36-45t12-46q0-41-30.5-69T483-675q-38 0-69 21t-42 55l45 18q8-21 25.5-33.5T483-627q23 0 39.5 15t16.5 36q0 15-8.5 29.5T503-515q-17 15-25 25.5T465-468q-5 12-7.5 26.5T455-409Z" />
    </svg>
  );
};

export default AskALegalQuestionIcon;
