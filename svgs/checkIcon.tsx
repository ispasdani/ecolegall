export const CheckIcon = ({
  color,
  textColor = "#F2F1FF",
}: {
  color?: string;
  textColor?: string;
}) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 h-8 w-8"
    >
      <g clipPath="url(#clip0_294_975)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.2969 32.25C7.59612 32.25 0.546875 25.1962 0.546875 16.5C0.546875 7.80375 7.59612 0.75 16.2969 0.75C24.9931 0.75 32.0469 7.80375 32.0469 16.5C32.0469 25.1962 24.9931 32.25 16.2969 32.25Z"
          fill="#9BE9FF"
          fillOpacity="0.1"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3007 25.6952C11.2232 25.6952 7.10938 21.5788 7.10938 16.5038C7.10938 11.4289 11.2232 7.3125 16.3007 7.3125C21.3757 7.3125 25.4921 11.4289 25.4921 16.5038C25.4921 21.5788 21.3757 25.6952 16.3007 25.6952Z"
          fill={color || "#2DC8FD"}
        />
        <path
          d="M16.3007 25.6952C11.2232 25.6952 7.10938 21.5788 7.10938 16.5038C7.10938 11.4289 11.2232 7.3125 16.3007 7.3125C21.3757 7.3125 25.4921 11.4289 25.4921 16.5038C25.4921 21.5788 21.3757 25.6952 16.3007 25.6952Z"
          stroke={color || "#2DC8FD"}
          strokeWidth="1.96875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.3832 14.4619L15.2768 19.5684L12.2148 16.5037"
          stroke={textColor}
          strokeWidth="1.96875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_294_975">
          <rect
            width="32"
            height="33"
            fill="white"
            transform="translate(0.296875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
