import { motion } from 'framer-motion';

interface MeaningRevealProps {
  meaning: string;
  isChallenge?: boolean;
  onNext: () => void;
  onDone?: () => void;
  isLastCard?: boolean;
}

const MeaningReveal = ({ meaning, isChallenge, onNext, onDone, isLastCard }: MeaningRevealProps) => {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Meaning box */}
      <div
        className="glass-wine rounded-xl p-5 mb-6"
        style={{
          boxShadow: '0 10px 40px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(43 76% 53% / 0.1)',
        }}
      >
        <p className="font-body text-foreground/90 text-base leading-relaxed italic">
          {meaning}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        {isChallenge && onDone && (
          <motion.button
            className="px-8 py-3 rounded-full font-display text-sm tracking-wider uppercase relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(0 70% 20%), hsl(0 60% 15%))',
              border: '1.5px solid hsl(43 76% 53% / 0.4)',
              color: 'hsl(43 76% 53%)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px hsl(43, 76%, 53%, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onDone}
          >
            <span className="relative z-10">✓ Done</span>
            <div className="absolute inset-0 shimmer" />
          </motion.button>
        )}

        <motion.button
          className="px-8 py-3 rounded-full font-display text-sm tracking-wider uppercase relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(43 76% 40%), hsl(43 60% 30%))',
            border: '1.5px solid hsl(43 76% 53% / 0.6)',
            color: 'hsl(0 0% 5%)',
            boxShadow: '0 0 20px hsl(43 76% 53% / 0.2)',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 40px hsl(43, 76%, 53%, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
        >
          <span className="relative z-10">
            {isLastCard ? '🏆 Kết Thúc' : 'Lá Tiếp Theo →'}
          </span>
          <div className="absolute inset-0 shimmer" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MeaningReveal;
