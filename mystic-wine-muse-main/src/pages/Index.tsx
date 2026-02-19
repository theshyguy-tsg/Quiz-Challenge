import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GoldenParticles from '@/components/quiz/GoldenParticles';
import WelcomeScreen from '@/components/quiz/WelcomeScreen';
import MysticCard3D from '@/components/quiz/MysticCard3D';
import QuizOptions from '@/components/quiz/QuizOptions';
import MeaningReveal from '@/components/quiz/MeaningReveal';
import WineProgress from '@/components/quiz/WineProgress';
import SmokeTransition from '@/components/quiz/SmokTransition';
import GrandFinale from '@/components/quiz/GrandFinale';
import ChallengeSelection from '@/components/quiz/ChallengeSelection';
import BackgroundMusic from '@/components/quiz/BackgroundMusic';
import QuizGallery from '@/components/quiz/QuizGallery';
import { cards, GameCard, QuizCard, QuizOption } from '@/data/quizData';

type Phase = 'welcome' | 'playing_quiz' | 'quiz_gallery' | 'selecting_challenge' | 'playing_challenge' | 'finale';

const Index = () => {
  const [phase, setPhase] = useState<Phase>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ dùng cho Quiz
  const [currentChallengeCard, setCurrentChallengeCard] = useState<GameCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [answers, setAnswers] = useState<{ cardId: number; optionIndex: number }[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  // Lọc riêng các thẻ Quiz
  const quizCards = cards.filter(c => c.type === 'quiz');
  const challengeCards = cards.filter(c => c.type === 'challenge');
  
  const currentCard = phase === 'playing_quiz' ? quizCards[currentIndex] : currentChallengeCard;
  const isLastQuizCard = currentIndex === quizCards.length - 1;

  const handleStart = useCallback(() => {
    setPhase('playing_quiz');
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleSelectOption = useCallback((index: number) => {
    setSelectedOption(index);
    if (currentCard) {
      setAnswers((prev) => [...prev, { cardId: currentCard.id, optionIndex: index }]);
    }
    setShowMeaning(true);
  }, [currentCard]);

  const handleChallengeDone = useCallback(() => {
    if (currentChallengeCard) {
      setCompletedChallenges(prev => [...prev, currentChallengeCard.id]);
    }
    setShowSmoke(true);
    setTimeout(() => {
      setPhase('selecting_challenge');
      setShowSmoke(false);
      setIsFlipped(false);
      setSelectedOption(null);
      setShowMeaning(false);
    }, 1200);
  }, [currentChallengeCard]);

  const handleFinishChallenges = useCallback(() => {
    setShowSmoke(true);
    setTimeout(() => {
      setPhase('finale');
      setShowSmoke(false);
    }, 1200);
  }, []);

  const handleNextQuiz = useCallback(() => {
    if (isLastQuizCard) {
      // Check for special card logic
      if (currentCard && currentCard.type === 'quiz') {
        const quizCard = currentCard as QuizCard;
        if (quizCard.isSpecial) {
          if (selectedOption === null || selectedOption === undefined) {
            return;
          }
          const selectedQuizOption: QuizOption = quizCard.options[selectedOption];
          if (!selectedQuizOption.isCorrect) {
            alert("Câu trả lời chưa đúng ý anh rồi, thử lại đi bé! 💖");
            return;
          }
        }
      }

      setShowSmoke(true);
      // Giảm thời gian chờ để đảm bảo UX nhanh hơn và tránh cảm giác bị lag
      setTimeout(() => {
        setPhase('selecting_challenge');
        setShowSmoke(false);
        setIsFlipped(false);
        setSelectedOption(null);
        setShowMeaning(false);
      }, 500); 
      return;
    }

    setShowSmoke(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setSelectedOption(null);
      setShowMeaning(false);
      setShowSmoke(false);
    }, 800);
  }, [isLastQuizCard, currentCard, selectedOption]);

  const handleBackQuiz = useCallback(() => {
    if (currentIndex > 0) {
      setShowSmoke(true);
      setTimeout(() => {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        setIsFlipped(false);
        setShowMeaning(false);
        // Khôi phục câu trả lời đã chọn nếu có
        const prevCardId = quizCards[prevIndex].id;
        // Tìm câu trả lời cuối cùng cho cardId này
        const prevAnswer = [...answers].reverse().find(a => a.cardId === prevCardId);
        setSelectedOption(prevAnswer ? prevAnswer.optionIndex : null);
        setShowSmoke(false);
      }, 500);
    }
  }, [currentIndex, quizCards, answers]);

  const handleSelectChallenge = useCallback((card: GameCard) => {
    setCurrentChallengeCard(card);
    setShowSmoke(true);
    setTimeout(() => {
      setPhase('playing_challenge');
      setShowSmoke(false);
    }, 800);
  }, []);

  const getMeaning = () => {
    if (selectedOption === null || !currentCard) return '';
    const option = currentCard.options[selectedOption];
    return 'meaning' in option ? option.meaning : option.content;
  };

  const resetGame = useCallback(() => {
    setPhase('welcome');
    setCurrentIndex(0);
    setCurrentChallengeCard(null);
    setIsFlipped(false);
    setSelectedOption(null);
    setShowMeaning(false);
    setAnswers([]);
    setCompletedChallenges([]);
    setShowSmoke(false);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(0 80% 4%), hsl(0 60% 7%), hsl(0 80% 4%))',
      }}
    >
      <GoldenParticles />
      <BackgroundMusic />
      <div
        className="fixed inset-0 pointer-events-none z-0 animate-flicker"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, hsl(35 90% 55% / 0.04) 0%, transparent 60%)',
        }}
      />
      <SmokeTransition show={showSmoke} />

      {/* Welcome */}
      <AnimatePresence>
        {phase === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      </AnimatePresence>

      {/* Quiz Phase */}
      <AnimatePresence mode="wait">
        {phase === 'playing_quiz' && currentCard && (
          <motion.div
            className="relative z-20 min-h-screen flex flex-col items-center justify-center py-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-4 right-4 z-30">
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setPhase('quiz_gallery')}
                className="px-4 py-2 rounded-full font-display text-xs tracking-wider uppercase bg-black/40 border border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60 transition-colors"
                title="Sảnh Quiz"
              >
                Sảnh Quiz
              </motion.button>
            </div>
            <div className="mb-6">
              <WineProgress current={currentIndex + 1} total={quizCards.length} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <MysticCard3D
                  card={currentCard}
                  isFlipped={isFlipped}
                  onFlip={handleFlip}
                  cardNumber={currentIndex + 1}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {isFlipped && !showMeaning && (
                <motion.div
                  className="mt-6 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <QuizOptions
                    card={currentCard}
                    selectedOption={selectedOption}
                    onSelect={handleSelectOption}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Button */}
            <div className="absolute bottom-4 left-4 z-30">
              {currentIndex > 0 && !showMeaning && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={handleBackQuiz}
                  className="w-10 h-10 rounded-full border border-primary/30 bg-black/40 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/60 transition-colors"
                  title="Quay lại câu trước"
                >
                  ←
                </motion.button>
              )}
            </div>

            <div className="absolute bottom-4 right-4 z-30">
              {!showMeaning && currentIndex < quizCards.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={handleNextQuiz}
                  className="w-10 h-10 rounded-full border border-primary/30 bg-black/40 flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/60 transition-colors"
                  title="Sang câu tiếp theo"
                >
                  →
                </motion.button>
              )}
            </div>

            <AnimatePresence>
              {showMeaning && (
                <MeaningReveal
                  meaning={getMeaning()}
                  isChallenge={false}
                  onNext={handleNextQuiz}
                  isLastCard={isLastQuizCard}
                />
              )}
            </AnimatePresence>

            {!isFlipped && (
              <motion.p
                className="mt-6 font-body text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✦ Chạm để lật bài ✦
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge Selection Phase */}
      <AnimatePresence>
        {phase === 'selecting_challenge' && (
          <motion.div
            className="relative z-20 min-h-screen flex flex-col items-center justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChallengeSelection 
              cards={challengeCards} 
              completedChallenges={completedChallenges}
              onSelect={handleSelectChallenge} 
              onFinish={handleFinishChallenges} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Gallery Phase */}
      <AnimatePresence>
        {phase === 'quiz_gallery' && (
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizGallery cards={quizCards as QuizCard[]} answers={answers} onClose={() => setPhase('playing_quiz')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playing Challenge Phase */}
      <AnimatePresence mode="wait">
        {phase === 'playing_challenge' && currentCard && (
          <motion.div
            className="relative z-20 min-h-screen flex flex-col items-center justify-center py-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <MysticCard3D
                card={currentCard}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                cardNumber={currentCard.id}
              />
            </motion.div>

            <AnimatePresence>
              {isFlipped && !showMeaning && (
                <motion.div
                  className="mt-6 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <QuizOptions
                    card={currentCard}
                    selectedOption={selectedOption}
                    onSelect={handleSelectOption}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showMeaning && (
                <MeaningReveal
                  meaning={getMeaning()}
                  isChallenge={true}
                  onNext={() => {}} // Không dùng nút Next
                  onDone={handleChallengeDone} // Dùng nút Done để kết thúc
                  isLastCard={true} // Để hiện thị style kết thúc nếu cần
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grand Finale */}
      <AnimatePresence>
        {phase === 'finale' && (
          <motion.div
            className="relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <GrandFinale cards={cards} answers={answers} onRestart={resetGame} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
