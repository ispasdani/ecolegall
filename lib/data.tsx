import { CheckIcon } from "@/svgs/checkIcon";

export const transition = { duration: 0, ease: [0, 0, 0, 0] };

export const variants = {
  hidden: { transform: "translateY(0)", opacity: 1 },
  visible: { transform: "translateY(0)", opacity: 1 },
};

export const graphData: Array<{
  id: number;
  currentHeight?: string;
  previousHeight?: string;
}> = [
  {
    id: 1,
    currentHeight: "50px",
    previousHeight: "38px",
  },
  {
    id: 2,
    currentHeight: "101px",
    previousHeight: "67px",
  },
  {
    id: 3,
    currentHeight: "122px",
    previousHeight: "92px",
  },
  {
    id: 4,
    currentHeight: "85px",
    previousHeight: "44px",
  },
  {
    id: 5,
    currentHeight: "50px",
    previousHeight: "31px",
  },
  {
    id: 6,
    currentHeight: "106px",
    previousHeight: "80px",
  },
];

// World Map data
export const WorldMapDotsData = [
  {
    start: {
      lat: 60.2008,
      lng: -149.4937,
    },
    end: {
      lat: -21.7975,
      lng: -60.8919,
    },
  },
  {
    start: { lat: 60.2008, lng: -149.4937 },
    end: { lat: 75.7975, lng: -42.8919 },
  },
  {
    start: { lat: -21.7975, lng: -60.8919 },
    end: { lat: 4.7223, lng: 16.1393 },
  },
  {
    start: {
      lat: 70.7975,
      lng: -42.8919,
    },
    end: {
      lat: 4.7223,
      lng: 16.1393,
    },
  },
  {
    start: {
      lat: 65.5074,
      lng: 100.1278,
    },
    end: {
      lat: 75.7975,
      lng: -42.8919,
    },
  },
  {
    start: {
      lat: 4.7223,
      lng: 16.1393,
    },
    end: {
      lat: 65.5074,
      lng: 100.1278,
    },
  },
  {
    start: {
      lat: 10.5074,
      lng: 95.1278,
    },
    end: {
      lat: 4.7223,
      lng: 16.1393,
    },
  },
];

export const WorldMapAvatarsData = [
  {
    lat: 60.2008,
    lng: -149.4937,
    url: <CheckIcon color="#25a18e" />,
    size: 20,
  },
  {
    lat: -21.7975,
    lng: -60.8919,
    url: <CheckIcon color="#25a18e" />,
    size: 26,
  },
  {
    lat: 75.7975,
    lng: -42.8919,
    url: <CheckIcon color="#25a18e" />,
    size: 28,
  },
  {
    lat: 4.7223,
    lng: 16.1393,
    url: <CheckIcon color="#25a18e" />,
    size: 30,
  },
  {
    lat: 65.5074,
    lng: 100.1278,
    url: <CheckIcon color="#25a18e" />,
    size: 35,
  },
  {
    lat: 10.5074,
    lng: 95.1278,
    url: <CheckIcon color="#25a18e" />,
    size: 19,
  },
];
