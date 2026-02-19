import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(0 80% 5%), hsl(0 60% 8%), hsl(0 80% 5%))',
      }}
    >
      {/* Curtain left */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1/2 z-20"
        style={{
          background: 'linear-gradient(90deg, hsl(0 70% 8%), hsl(0 60% 12%))',
          boxShadow: '10px 0 40px hsl(0 0% 0% / 0.5)',
        }}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute right-0 top-0 h-full w-8"
          style={{
            background: 'repeating-linear-gradient(180deg, hsl(0 60% 10%) 0px, hsl(0 50% 14%) 20px, hsl(0 60% 10%) 40px)',
          }}
        />
      </motion.div>

      {/* Curtain right */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2 z-20"
        style={{
          background: 'linear-gradient(-90deg, hsl(0 70% 8%), hsl(0 60% 12%))',
          boxShadow: '-10px 0 40px hsl(0 0% 0% / 0.5)',
        }}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="absolute left-0 top-0 h-full w-8"
          style={{
            background: 'repeating-linear-gradient(180deg, hsl(0 60% 10%) 0px, hsl(0 50% 14%) 20px, hsl(0 60% 10%) 40px)',
          }}
        />
      </motion.div>

      {/* Center content */}
      <div className="relative z-30 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-7xl mb-6 animate-float">🍷</div>
        </motion.div>

        <motion.h1
          className="font-display text-primary text-4xl md:text-6xl font-bold mb-4 text-shadow-gold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Quiz cho Baobei Kim Chi
        </motion.h1>

        <motion.div
          className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />

        <motion.p
          className="font-body text-foreground/80 text-xl md:text-2xl mb-2 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          25 lá bài huyền bí — Một hành trình của trái tim
        </motion.p>

        <motion.p
          className="font-body text-muted-foreground text-base mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          Lật từng lá bài, khám phá câu chuyện tình yêu của chúng ta
        </motion.p>

        <motion.button
          className="relative px-10 py-4 rounded-full font-display text-lg tracking-wider uppercase overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, hsl(0 70% 15%), hsl(0 80% 10%))',
            border: '2px solid hsl(43 76% 53% / 0.5)',
            color: 'hsl(43 76% 53%)',
            boxShadow: '0 0 30px hsl(43 76% 53% / 0.2)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 50px hsl(43, 76%, 53%, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
        >
          <span className="relative z-10">✨ Bắt Đầu Hành Trình ✨</span>
          <div className="absolute inset-0 shimmer" />
        </motion.button>

        <motion.div
          className="mt-8 text-primary/30 text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          ❧ Mystic Wine & Tarot ❧
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
