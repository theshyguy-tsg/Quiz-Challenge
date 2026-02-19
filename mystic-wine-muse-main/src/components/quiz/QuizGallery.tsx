import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizCard } from '@/data/quizData';

interface QuizGalleryProps {
  cards: QuizCard[];
  answers?: { cardId: number; optionIndex: number }[];
  onClose: () => void;
}

const QuizGallery = ({ cards, answers = [], onClose }: QuizGalleryProps) => {
  const [selected, setSelected] = useState<QuizCard | null>(null);

  const getAnswer = (cardId: number) => {
    const a = answers.find((x) => x.cardId === cardId);
    if (!a) return null;
    return a.optionIndex;
  };

  return (
    <div className="relative z-20 min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <motion.div
        className="w-full max-w-4xl mx-auto mb-6 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-left">
          <h2 className="font-display text-primary text-3xl font-bold text-shadow-gold">
            Sảnh Quiz
          </h2>
          <p className="font-body text-foreground/70 text-sm mt-1">
            Chạm vào lá để xem thông tin chi tiết
          </p>
        </div>
        <motion.button
          className="px-4 py-2 rounded-full font-display text-sm tracking-wider uppercase"
          style={{
            background: 'linear-gradient(135deg, hsl(43 76% 40%), hsl(43 60% 30%))',
            border: '1.5px solid hsl(43 76% 53% / 0.6)',
            color: 'hsl(0 0% 5%)',
            boxShadow: '0 0 20px hsl(43 76% 53% / 0.2)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          Quay lại
        </motion.button>
      </motion.div>

      <motion.div
        className="w-full max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {cards.map((card) => {
          const answeredIndex = getAnswer(card.id);
          const answeredLabel =
            typeof answeredIndex === 'number' ? card.options[answeredIndex]?.label : null;

        return (
          <motion.button
            key={card.id}
            className="rounded-xl p-4 h-48 flex flex-col relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, hsl(0 50% 10%), hsl(0 40% 7%))',
              border: '1.5px solid hsl(43 76% 53% / 0.2)',
              boxShadow: '0 10px 30px hsl(0 0% 0% / 0.4)',
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(card)}
          >
            <div className="wax-seal w-8 h-8 rounded-full flex items-center justify-center mb-2">
              <span className="font-display text-primary text-xs font-bold">{card.id}</span>
            </div>
            <h4 className="font-display text-primary text-sm font-bold line-clamp-1">{card.title}</h4>
            <div className="w-full h-px bg-primary/20 my-2" />
            <p className="font-body text-foreground/70 text-sm leading-relaxed line-clamp-3">
              {card.content}
            </p>
            {answeredLabel && (
              <p className="mt-2 font-body text-primary/60 text-xs italic line-clamp-1">
                Đã chọn: {answeredLabel}
              </p>
            )}
          </motion.button>
        );})}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-md glass-wine rounded-2xl p-6"
              style={{
                border: '2px solid hsl(43 76% 53% / 0.4)',
                boxShadow: '0 0 60px hsl(43 76% 53% / 0.2), 0 20px 60px hsl(0 0% 0% / 0.5)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="wax-seal w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="font-display text-primary text-xs font-bold">{selected.id}</span>
                </div>
                <h3 className="font-display text-primary text-lg font-bold">{selected.title}</h3>
              </div>
              <p className="font-body text-foreground/80 text-sm leading-relaxed mb-4">
                {selected.content}
              </p>

              <div className="space-y-2">
                {selected.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg p-3"
                    style={{
                      background: 'linear-gradient(135deg, hsl(0 50% 10% / 0.8), hsl(0 40% 8% / 0.8))',
                      border: '1px solid hsl(43 76% 53% / 0.2)',
                    }}
                  >
                    <p className="font-body text-foreground/80 text-sm">{opt.label}</p>
                  </div>
                ))}
              </div>

              <motion.button
                className="mt-6 w-full py-3 rounded-full font-display text-sm tracking-wider uppercase relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(43 76% 40%), hsl(43 60% 30%))',
                  border: '1.5px solid hsl(43 76% 53% / 0.6)',
                  color: 'hsl(0 0% 5%)',
                  boxShadow: '0 0 20px hsl(43 76% 53% / 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(null)}
              >
                Đóng
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizGallery;
