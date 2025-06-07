import { transition, variants } from "@/lib/data";
import BannerIcon from "@/svgs/bannerIcon";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <Link href="/blog/Artificial-Intelligence">
      <motion.div
        className="md:w-[459px] w-72 md:h-10 h-9 rounded-xl bg-emerald-500/50 flex items-center justify-center md:gap-3 gap-1"
        transition={transition}
        variants={variants}
      >
        <BannerIcon className="size-5 md:size-6" />
        <p className="md:text-base text-[10px] font-semibold">
          New! AI-Powered legal tech software and advisor.
        </p>
      </motion.div>
    </Link>
  );
};

export default Banner;
