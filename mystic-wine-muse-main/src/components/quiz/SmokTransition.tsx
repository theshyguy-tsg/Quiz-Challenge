import { motion, AnimatePresence } from 'framer-motion';

interface SmokeTransitionProps {
  show: boolean;
}

const SmokeTransition = ({ show }: SmokeTransitionProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Smoke layers */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at ${20 + i * 15}% ${30 + i * 10}%, hsl(0 40% 8% / 0.8) 0%, transparent 70%)`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 2],
                y: [0, -50 * (i + 1)],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Center flash */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, hsl(43 76% 53% / 0.15) 0%, transparent 50%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmokeTransition;
