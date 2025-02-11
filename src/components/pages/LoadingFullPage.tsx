import { motion } from "framer-motion";
import LetterBox from "../ui/LetterBox";
import PoweredBy from "../ui/PwdByStrk";
import readingOwl from "../../assets/reading-owl.png";
import coin from "../../assets/svg/coin.svg";
import { forwardRef } from "react";

// Create a forwardRef version of LetterBox
const MotionLetterBox = forwardRef(
  ({ letter, className }: { letter: string; className: string }, ref: any) => (
    <div ref={ref}>
      <LetterBox letter={letter} className={className} />
    </div>
  )
);
MotionLetterBox.displayName = "MotionLetterBox";

// Create the motion component
const AnimatedLetterBox = motion(MotionLetterBox);

export default function LoadingFullPage() {
  return (
    <div className="absolute inset-0 flex flex-col px-5 items-center text-white z-[200] pt-[66px] bg-gradient-svg bg-cover bg-no-repeat bg-center">
      <img src={readingOwl} alt="reading-owl" />

      <div className="flex justify-center gap-x-[15px] mt-[-29px] mb-6">
        {"TWEETLE".split("").map((letter, i) => (
          <AnimatedLetterBox
            letter={letter}
            key={i}
            className="!w-[35px] !h-[35px] !text-[24px] !leading-[30px]"
            initial={{
              x: "-100%",
              rotate: -720,
              opacity: 0,
            }}
            animate={{
              x: 0,
              rotate: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: i * 0.1, // Stagger effect
            }}
          />
        ))}
      </div>

      <motion.h4
        className="font-semibold text-lg leading-5 text-[#F5F5F6B2]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.8, // Start after letters finish
          ease: "easeOut",
        }}
      >
        Solve. Score. Win Rewards
      </motion.h4>

      <motion.div
        className="flex items-center mt-6 mb-12"
        initial={{ y: -20 }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 1,
          delay: 1.8, // Start after text slides in
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }}
      >
        <img src={coin} className="animate-rotateX h-6 w-6" alt="" />
      </motion.div>

      <div className="first-letter:text-center">
        <PoweredBy />
      </div>
    </div>
  );
}
