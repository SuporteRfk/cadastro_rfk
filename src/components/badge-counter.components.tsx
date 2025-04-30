import {motion, AnimatePresence } from "framer-motion";

interface BadgeCounterProps{
  count:number;
  color: string;
  marginPosition?: string;
  size?: string;

}

export const BadgeCounter = ({count, color,marginPosition="right-[-8px]", size="w-5 h-5"}:BadgeCounterProps) => {
    if (count === 0) return null
    return (
        <AnimatePresence>
        {count > 0 && (
          <motion.div
            layout
            key={count}
            initial={{ scale: 0.5, opacity: 0, y: -10 }} 
            animate={{ scale: 1, opacity: 1, y: 0 , transition: {delay: 0.5} }} 
            exit={{ scale: 0.5, opacity: 0, y: -10 }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${color} absolute ${marginPosition} ${size} pt-[1px] flex items-center justify-center rounded-full text-white font-semibold text-xs`}
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>
    )
}