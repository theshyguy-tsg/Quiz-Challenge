import { motion } from 'framer-motion';

interface WineProgressProps {
  current: number;
  total: number;
}

const WineProgress = ({ current, total }: WineProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="flex items-center gap-4 w-full max-w-xs mx-auto">
      {/* Wine glass */}
      <div className="relative w-10 h-16 flex-shrink-0">
        {/* Glass stem */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-5 bg-primary/40 rounded-full" />
        {/* Glass base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary/40 rounded-full" />
        {/* Glass bowl */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-10 rounded-b-full overflow-hidden"
          style={{
            border: '1.5px solid hsl(43 76% 53% / 0.4)',
            borderTop: 'none',
          }}
        >
          <motion.div
            className="absolute bottom-0 w-full rounded-b-full"
            style={{
              background: 'linear-gradient(180deg, hsl(0 70% 25%), hsl(0 80% 15%))',
            }}
            animate={{ height: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-display text-primary text-sm">
          Lá {current} / {total}
        </p>
        {/* Mini bar */}
        <div className="w-full h-1 bg-muted rounded-full mt-1 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(0 70% 25%), hsl(43 76% 53%))' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

export default WineProgress;
