import { motion, AnimatePresence } from 'framer-motion';
import type { GameCard, QuizCard, ChallengeCard } from '@/data/quizData';

interface QuizOptionsProps {
  card: GameCard;
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

const QuizOptions = ({ card, selectedOption, onSelect }: QuizOptionsProps) => {
  const isQuiz = card.type === 'quiz';
  const isSpecial = 'isSpecial' in card && card.isSpecial;
  const options = card.options;

  // Cập nhật key tiếng Việt và icon cute
  const levelEmojis: Record<string, string> = {
    'Dịu Dàng': '🐰',
    'Thú Vị': '🦊',
    'Nóng Bỏng': '🐱',
  };

  return (
    <div className="space-y-3 w-full max-w-sm mx-auto">
      {options.map((option, index) => {
        const isSelected = selectedOption === index;
        
        // Handle label display
        let label = '';
        if (isQuiz) {
           label = (option as { label: string }).label;
        } else {
           const challengeLabel = (option as { label: string }).label;
           const emoji = levelEmojis[challengeLabel] || '✨';
           label = `${emoji} ${challengeLabel}`;
        }

        return (
          <motion.button
            key={index}
            className="w-full text-left px-5 py-4 rounded-xl font-body text-base transition-all relative overflow-hidden"
            style={{
              background: isSelected
                ? (isSpecial 
                    ? 'linear-gradient(135deg, hsl(280 80% 30%), hsl(260 70% 20%))' 
                    : 'linear-gradient(135deg, hsl(0 70% 18%), hsl(0 60% 14%))')
                : (isSpecial
                    ? 'linear-gradient(135deg, hsl(260 50% 15%), hsl(280 40% 10%))'
                    : 'linear-gradient(135deg, hsl(0 50% 10%), hsl(0 40% 8%))'),
              border: isSelected
                ? (isSpecial 
                    ? '2px solid hsl(280 80% 70%)' 
                    : '2px solid hsl(43 76% 53% / 0.8)')
                : (isSpecial
                    ? '1px solid hsl(280 60% 50% / 0.3)'
                    : '1px solid hsl(43 76% 53% / 0.15)'),
              color: isSelected 
                ? (isSpecial ? 'hsl(280 90% 85%)' : 'hsl(43 76% 53%)')
                : (isSpecial ? 'hsl(280 70% 75%)' : 'hsl(43 50% 80%)'),
              boxShadow: isSelected
                ? (isSpecial 
                    ? '0 0 30px hsl(280 80% 60% / 0.4), inset 0 0 20px hsl(280 80% 60% / 0.1)'
                    : '0 0 25px hsl(43 76% 53% / 0.2), inset 0 0 20px hsl(43 76% 53% / 0.05)')
                : 'none',
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{
              scale: selectedOption === null ? 1.02 : 1,
              borderColor: isSpecial ? 'hsl(280, 80%, 70%, 0.6)' : 'hsl(43, 76%, 53%, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectedOption === null && onSelect(index)}
            disabled={selectedOption !== null}
          >
            {/* Shimmer on hover */}
            {selectedOption === null && (
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            )}

            <span className="relative z-10">{label}</span>

            {isSelected && (
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {isSpecial ? '💖' : '✦'}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuizOptions;
