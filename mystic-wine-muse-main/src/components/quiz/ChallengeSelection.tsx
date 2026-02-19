import { motion } from 'framer-motion';
import { GameCard } from '@/data/quizData';
import { useState } from 'react';

interface ChallengeSelectionProps {
  cards: GameCard[];
  completedChallenges?: number[];
  onSelect: (card: GameCard) => void;
  onFinish?: () => void;
}

const ChallengeSelection = ({ cards, completedChallenges = [], onSelect, onFinish }: ChallengeSelectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Phân loại thẻ bài
  const normalChallenges = cards.filter((c) => c.type === 'challenge' && c.id >= 17 && c.id <= 21);
  const spicyChallenges = cards.filter((c) => c.type === 'challenge' && c.id > 21);
  
  const allCompleted = cards.filter(c => c.type === 'challenge').every(c => completedChallenges.includes(c.id));
  const progress = completedChallenges.length;
  const total = cards.filter(c => c.type === 'challenge').length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderCard = (card: GameCard, isSpicy: boolean) => {
    const isCompleted = completedChallenges.includes(card.id);
    
    return (
      <motion.button
        key={card.id}
        variants={item}
        className="aspect-[3/4] rounded-xl relative overflow-hidden group transition-all duration-300"
        style={{
          background: isSpicy 
            ? 'linear-gradient(135deg, hsl(0 80% 10%), hsl(0 90% 5%))'
            : 'linear-gradient(135deg, hsl(0 40% 15%), hsl(0 30% 10%))',
          border: isCompleted
            ? '2px solid hsl(43 76% 53% / 0.8)'
            : isSpicy
              ? '1px solid hsl(0 70% 40% / 0.4)'
              : '1px solid hsl(43 76% 53% / 0.3)',
          boxShadow: isCompleted
            ? '0 0 25px hsl(43 76% 53% / 0.35)'
            : hoveredCard === card.id
              ? (isSpicy ? '0 0 25px hsl(0 70% 50% / 0.5)' : '0 0 20px hsl(43 76% 53% / 0.4)')
              : '0 4px 10px hsl(0 0% 0% / 0.3)',
          transform: hoveredCard === card.id && !isCompleted ? 'scale(1.05)' : 'scale(1)',
          opacity: isCompleted ? 1 : 1,
          filter: isCompleted ? 'none' : 'none',
          cursor: isCompleted ? 'default' : 'pointer',
        }}
        onMouseEnter={() => !isCompleted && setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => !isCompleted && onSelect(card)}
        disabled={isCompleted}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {isCompleted ? (
            <>
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border-2 border-primary/70">
                <span className="text-3xl">🏅</span>
              </div>
              <span className="mt-3 font-display text-primary/80 text-xs tracking-widest uppercase">
                Đã Hoàn Thành
              </span>
              <div className="absolute inset-0 rounded-xl ring-2 ring-primary/40 pointer-events-none" />
              <div className="absolute top-0 left-0 px-3 py-1 rounded-br-xl bg-gradient-to-r from-yellow-500/80 to-yellow-300/60 text-black/90 text-xs font-bold tracking-wider">
                Vinh Danh
              </div>
            </>
          ) : (
            <>
              <span className="text-3xl mb-2 filter drop-shadow-lg">{isSpicy ? '💋' : '🍭'}</span>
              <div className={`w-8 h-8 rounded-full border ${isSpicy ? 'border-red-500/30' : 'border-primary/30'} flex items-center justify-center mb-2`}>
                <span className={`font-display ${isSpicy ? 'text-red-400' : 'text-primary'} text-xs font-bold`}>{card.id}</span>
              </div>
              <span className={`font-display ${isSpicy ? 'text-red-400/60' : 'text-primary/60'} text-xs tracking-widest uppercase`}>
                {isSpicy ? 'Sexy' : 'Cute'}
              </span>
            </>
          )}
        </div>
        
        {!isCompleted && (
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        )}
        
        {isSpicy && !isCompleted && (
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-900/20 to-transparent pointer-events-none" />
        )}
      </motion.button>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-display text-primary text-3xl font-bold text-shadow-gold mb-3">
          ✨ Thử Thách Tình Yêu ✨
        </h2>
        <p className="font-body text-foreground/80 text-lg mb-2">
          Mỗi lá bài là một bí mật ngọt ngào dành cho Baobei 💖
        </p>
        <p className="font-body text-muted-foreground text-sm">
          Đã hoàn thành: {progress}/{total}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
        {/* Normal Challenges Column */}
        <div>
          <h3 className="font-display text-xl text-primary/80 mb-6 text-center flex items-center justify-center gap-2">
            <span>🌸</span> Ngọt Ngào & Dịu Êm
          </h3>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {normalChallenges.map((card) => renderCard(card, false))}
          </motion.div>
        </div>

        {/* Spicy Challenges Column */}
        <div>
          <h3 className="font-display text-xl text-red-400 mb-6 text-center flex items-center justify-center gap-2">
            <span>🔥</span> Nóng Bỏng & Hư Hỏng
          </h3>
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {spicyChallenges.map((card) => renderCard(card, true))}
          </motion.div>
        </div>
      </div>

      {/* Finish Button */}
      {onFinish && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <motion.button
            className={`px-8 py-3 rounded-full font-display text-lg tracking-wider uppercase relative overflow-hidden group ${
              !allCompleted ? 'opacity-50 cursor-not-allowed grayscale' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, hsl(43 76% 53%), hsl(43 60% 45%))',
              color: 'hsl(0 60% 5%)',
              boxShadow: allCompleted ? '0 0 20px hsl(43 76% 53% / 0.4)' : 'none',
            }}
            whileHover={allCompleted ? { scale: 1.05 } : {}}
            whileTap={allCompleted ? { scale: 0.95 } : {}}
            onClick={allCompleted ? onFinish : undefined}
            disabled={!allCompleted}
          >
            <span className="relative z-10 font-bold flex items-center gap-2">
              {allCompleted ? 'Đến Phần Tổng Kết 🏆' : 'Hãy Hoàn Thành Hết Thử Thách 🔒'}
            </span>
            {allCompleted && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
          </motion.button>
          
          {!allCompleted && (
            <p className="text-center text-muted-foreground text-xs mt-3 animate-pulse">
              (Còn {total - progress} thử thách nữa...)
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ChallengeSelection;
