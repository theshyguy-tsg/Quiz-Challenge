import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GameCard } from '@/data/quizData';

interface MysticCard3DProps {
  card: GameCard;
  isFlipped: boolean;
  onFlip: () => void;
  cardNumber: number;
}

const MysticCard3D = ({ card, isFlipped, onFlip, cardNumber }: MysticCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  
  const isSpecial = 'isSpecial' in card && card.isSpecial;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -20);
    setRotateY((x - 0.5) * 20);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto" style={{ height: '460px' }}>
      <motion.div
        ref={cardRef}
        className="relative w-full h-full cursor-pointer preserve-3d"
        animate={{
          rotateY: isFlipped ? 180 : rotateY,
          rotateX: isFlipped ? 0 : rotateX,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={!isFlipped ? onFlip : undefined}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className="absolute inset-0 rounded-2xl backface-hidden overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: isSpecial 
              ? 'linear-gradient(135deg, hsl(260 60% 15%), hsl(280 70% 10%))'
              : 'linear-gradient(135deg, hsl(0 70% 12%), hsl(0 80% 8%))',
            border: isSpecial 
              ? '2px solid hsl(280 80% 70% / 0.6)'
              : '2px solid hsl(43 76% 53% / 0.4)',
            boxShadow: isSpecial 
              ? '0 20px 60px hsl(260 50% 10% / 0.8), 0 0 40px hsl(280 80% 60% / 0.3)'
              : '0 20px 60px hsl(0 0% 0% / 0.6), 0 0 30px hsl(43 76% 53% / 0.1)',
          }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">{isSpecial ? '💍' : '🍷'}</div>
              <div className={`w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent ${isSpecial ? 'via-purple-400' : 'via-primary'} to-transparent mb-3`} />
              <p className={`font-display ${isSpecial ? 'text-purple-300' : 'text-primary'} text-sm tracking-[0.3em] uppercase`}>
                {isSpecial ? 'Forever' : 'Quiz cho thư ký Kim'}
              </p>
              <div className={`w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent ${isSpecial ? 'via-purple-400' : 'via-primary'} to-transparent mt-3`} />
              <div className="mt-6 text-3xl">{isSpecial ? '✨♾️✨' : '🌿✨🌿'}</div>
            </div>
          </div>
          
          {/* Starfield for Special Card */}
          {isSpecial && (
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          )}

          {/* Glare effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${isSpecial ? 'hsla(280, 76%, 60%, 0.2)' : 'hsla(43, 76%, 53%, 0.15)'} 0%, transparent 60%)`,
            }}
          />

          {/* Wax seal with card number */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div 
              className="wax-seal w-12 h-12 rounded-full flex items-center justify-center"
              style={isSpecial ? { 
                background: 'linear-gradient(135deg, hsl(280 70% 50%), hsl(260 60% 40%))',
                boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.5)'
              } : undefined}
            >
              <span className={`font-display ${isSpecial ? 'text-white' : 'text-primary'} font-bold text-lg`}>{cardNumber}</span>
            </div>
          </div>

          {/* Corner ornaments */}
          <div className={`absolute top-4 left-4 ${isSpecial ? 'text-purple-400/50' : 'text-primary/30'} text-xl`}>❧</div>
          <div className={`absolute top-4 right-4 ${isSpecial ? 'text-purple-400/50' : 'text-primary/30'} text-xl rotate-180`}>❧</div>
          <div className={`absolute bottom-20 left-4 ${isSpecial ? 'text-purple-400/50' : 'text-primary/30'} text-xl rotate-180`}>❧</div>
          <div className={`absolute bottom-20 right-4 ${isSpecial ? 'text-purple-400/50' : 'text-primary/30'} text-xl`}>❧</div>
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 rounded-2xl backface-hidden overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: isSpecial 
              ? 'linear-gradient(180deg, hsl(260 60% 12%), hsl(280 70% 8%))'
              : 'linear-gradient(180deg, hsl(0 70% 10%), hsl(0 60% 6%))',
            border: isSpecial 
              ? '2px solid hsl(280 80% 70% / 0.5)'
              : '2px solid hsl(43 76% 53% / 0.3)',
            boxShadow: isSpecial 
              ? '0 20px 60px hsl(260 50% 10% / 0.8), 0 0 30px hsl(280 80% 60% / 0.2)'
              : '0 20px 60px hsl(0 0% 0% / 0.6), 0 0 20px hsl(43 76% 53% / 0.1)',
          }}
        >
          {/* Galaxy background for special */}
          {isSpecial && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 h-full flex flex-col relative z-10">
            {/* Card type badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs uppercase tracking-[0.2em] ${isSpecial ? 'text-purple-300' : 'text-primary/60'} font-body`}>
                {card.type === 'quiz' ? (isSpecial ? '✨ Special Question' : '🔮 Quiz') : '🔥 Challenge'}
              </span>
              <div className={`wax-seal w-8 h-8 rounded-full flex items-center justify-center ${isSpecial ? 'bg-purple-900 border-purple-400' : ''}`}>
                <span className={`font-display ${isSpecial ? 'text-purple-200' : 'text-primary'} text-xs font-bold`}>{cardNumber}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-display ${isSpecial ? 'text-purple-100' : 'text-primary'} text-xl font-bold mb-3 ${isSpecial ? 'text-shadow-purple' : 'text-shadow-gold'}`}>
              {card.title}
            </h3>

            {/* Divider */}
            <div className={`w-full h-0.5 bg-gradient-to-r from-transparent ${isSpecial ? 'via-purple-400/60' : 'via-primary/40'} to-transparent mb-4`} />

            {/* Content */}
            <p className={`font-body ${isSpecial ? 'text-purple-50 font-medium' : 'text-foreground'} text-lg leading-relaxed flex-1`}>
              {card.content}
            </p>

            {/* Decorative bottom */}
            <div className={`text-center ${isSpecial ? 'text-purple-400/40' : 'text-primary/20'} text-sm mt-2`}>
              ✦ ✦ ✦
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MysticCard3D;
