import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import type { GameCard } from '@/data/quizData';

interface GrandFinaleProps {
  cards: GameCard[];
  answers: { cardId: number; optionIndex: number }[];
  onRestart: () => void;
}

const GrandFinale = ({ cards, answers, onRestart }: GrandFinaleProps) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [rewardSelected, setRewardSelected] = useState<number | null>(null);
  const [voiceDay, setVoiceDay] = useState<string | null>(null);
  const [emergencyPassphrase, setEmergencyPassphrase] = useState<string>('');
  const [moneyConfirmed, setMoneyConfirmed] = useState<boolean>(false);
  const rewardOptions = [
    { label: "🎧 Đặc quyền Voice Message 18+", desc: "Anh ASMR vào voice điều em muốn" },
    { label: "🧼 Khuẩn cấp", desc: "Gọi anh về ngay lập tức với em trong bất kỳ hoàn cảnh nào (áp dụng đến cuối đời)." },
    { label: "📖 Tiền thưởng", desc: "Ting Ting ngay 50k" },
  ];

  const toggleCard = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else if (selectedCards.length < 3) {
      const next = [...selectedCards, cardId];
      setSelectedCards(next);
      if (next.length === 3) {
        setTimeout(() => setShowSummary(true), 800);
      }
    }
  };

  const getAnswer = (cardId: number) => {
    const answer = answers.find((a) => a.cardId === cardId);
    if (!answer) return null;
    const card = cards.find((c) => c.id === cardId);
    if (!card) return null;
    return { card, optionIndex: answer.optionIndex };
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="font-display text-primary text-3xl font-bold text-shadow-gold mb-2">
          The Grand Finale
        </h2>
        <p className="font-body text-foreground/70 text-lg">
          Chọn 3 lá bài ý nghĩa nhất với em ({selectedCards.length}/3)
        </p>
      </motion.div>

      {/* 3D Wine Box indicator */}
      <motion.div
        className="mb-6 flex gap-3 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((slot) => (
          <motion.div
            key={slot}
            className="w-16 h-20 rounded-lg flex items-center justify-center"
            style={{
              background: selectedCards[slot]
                ? 'linear-gradient(135deg, hsl(0 70% 18%), hsl(0 60% 12%))'
                : 'linear-gradient(135deg, hsl(0 30% 10%), hsl(0 20% 8%))',
              border: selectedCards[slot]
                ? '2px solid hsl(43 76% 53% / 0.8)'
                : '2px dashed hsl(43 76% 53% / 0.2)',
              boxShadow: selectedCards[slot]
                ? '0 0 20px hsl(43 76% 53% / 0.3)'
                : 'none',
            }}
            animate={selectedCards[slot] ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {selectedCards[slot] ? (
              <span className="font-display text-primary font-bold text-sm">
                {selectedCards[slot]}
              </span>
            ) : (
              <span className="text-muted-foreground/30 text-2xl">?</span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Swiper Carousel */}
      <div className="w-full max-w-2xl">
        <Swiper
          modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          navigation
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          className="swiper-coverflow pb-8"
        >
          {cards.map((card) => {
            const isSelected = selectedCards.includes(card.id);
            const answer = getAnswer(card.id);

            return (
              <SwiperSlide key={card.id} style={{ width: '260px' }}>
                <motion.div
                  className="rounded-2xl p-5 cursor-pointer h-80 flex flex-col relative overflow-hidden"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, hsl(0 70% 16%), hsl(0 60% 10%))'
                      : 'linear-gradient(135deg, hsl(0 50% 10%), hsl(0 40% 7%))',
                    border: isSelected
                      ? '2px solid hsl(43 76% 53% / 0.8)'
                      : '1.5px solid hsl(43 76% 53% / 0.2)',
                    boxShadow: isSelected
                      ? '0 0 30px hsl(43 76% 53% / 0.3), inset 0 0 20px hsl(43 76% 53% / 0.05)'
                      : '0 10px 30px hsl(0 0% 0% / 0.4)',
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleCard(card.id)}
                >
                  {/* Selected badge */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-3 right-3 wax-seal w-8 h-8 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <span className="text-primary text-xs">✦</span>
                    </motion.div>
                  )}

                  {/* Card number wax seal */}
                  <div className="wax-seal w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <span className="font-display text-primary font-bold">{card.id}</span>
                  </div>

                  <h4 className="font-display text-primary text-sm font-bold mb-2">{card.title}</h4>

                  <div className="w-full h-px bg-primary/20 mb-2" />

                  <p className="font-body text-foreground/70 text-sm leading-relaxed flex-1 overflow-hidden">
                    {card.content}
                  </p>

                  {answer && (
                    <div className="mt-2 pt-2 border-t border-primary/10">
                      <p className="font-body text-primary/60 text-xs italic truncate">
                        Đã chọn: {card.options[answer.optionIndex].label}
                      </p>
                    </div>
                  )}
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-sm"
              onClick={() => setShowSummary(false)}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 w-full max-w-md glass-wine rounded-2xl p-8"
              style={{
                border: '2px solid hsl(43 76% 53% / 0.4)',
                boxShadow: '0 0 60px hsl(43 76% 53% / 0.2), 0 20px 60px hsl(0 0% 0% / 0.5)',
              }}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">💍</div>
                <h3 className="font-display text-primary text-2xl font-bold text-shadow-gold">
                  Anh sẽ khắc ghi 3 điều này cùng em
                </h3>
                <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mt-3" />
              </div>

              <div className="space-y-4">
                {selectedCards.map((cardId, idx) => {
                  const answer = getAnswer(cardId);
                  if (!answer) return null;
                  const card = answer.card;
                  const option = card.options[answer.optionIndex];
                  const meaning = 'meaning' in option ? option.meaning : option.content;

                  return (
                    <motion.div
                      key={cardId}
                      className="rounded-xl p-4"
                      style={{
                        background: 'linear-gradient(135deg, hsl(0 50% 10% / 0.8), hsl(0 40% 8% / 0.8))',
                        border: '1px solid hsl(43 76% 53% / 0.2)',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="wax-seal w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-display text-primary text-xs font-bold">{cardId}</span>
                        </div>
                        <h4 className="font-display text-primary text-sm font-bold">{card.title}</h4>
                      </div>
                      <p className="font-body text-foreground/70 text-sm italic leading-relaxed">
                        {meaning}
                      </p>
                    </motion.div>
                  );
                })}
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
                onClick={() => setShowSummary(false)}
              >
                <span className="relative z-10">Xem lại các lá bài</span>
                <div className="absolute inset-0 shimmer" />
              </motion.button>

              <button
                onClick={onRestart}
                className="mt-4 w-full py-2 text-primary/60 text-xs hover:text-primary transition-colors font-display tracking-widest uppercase"
              >
                Chơi lại từ đầu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="mt-10 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-display text-primary text-xl font-bold">Cảm ơn Baobei đã đi đến cuối hành trình này cùng anh</p>
        <p className="font-body text-foreground/70 text-sm mt-2">Mỗi điều em chọn đều là kho báu anh sẽ giữ gìn</p>
        <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
      </motion.div>

      <motion.div
        className="mt-6 w-full max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="font-body text-foreground/80 text-base mb-4">
          Em có muốn anh tiếp tục làm các thử thách như này không?
        </p>
        <div className="flex items-center justify-center gap-3">
          <motion.button
            className="px-6 py-2 rounded-full font-display text-sm tracking-wider uppercase relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(43 76% 40%), hsl(43 60% 30%))',
              border: '1.5px solid hsl(43 76% 53% / 0.6)',
              color: 'hsl(0 0% 5%)',
              boxShadow: '0 0 20px hsl(43 76% 53% / 0.2)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConsent("yes")}
          >
            Có chứ
          </motion.button>
          <motion.button
            className="px-6 py-2 rounded-full font-display text-sm tracking-wider uppercase relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(0 20% 15%), hsl(0 15% 10%))',
              border: '1.5px solid hsl(43 76% 53% / 0.25)',
              color: 'hsl(43 76% 53%)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setConsent("no")}
          >
            Để sau nha
          </motion.button>
        </div>
        {consent && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {consent === "yes" ? (
              <p className="font-body text-primary/80 text-sm">Anh sẽ chuẩn bị thêm những thử thách ngọt ngào dành riêng cho em 💖</p>
            ) : (
              <p className="font-body text-foreground/70 text-sm">Okie, khi nào em muốn thì nói anh nha. Anh luôn ở đây ✨</p>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="mt-10 w-full max-w-md mx-auto text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="font-display text-primary text-2xl font-bold text-shadow-gold mb-2">
          Phần Thưởng Cho Em
        </h3>
        <p className="font-body text-foreground/70 text-sm mb-4">
          Chọn một “hình phạt” ngọt ngào để áp dụng cho anh
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {rewardOptions.map((opt, idx) => {
            const selected = rewardSelected === idx;
            return (
              <motion.button
                key={idx}
                className="rounded-xl p-4 h-28 flex flex-col justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(0 50% 10%), hsl(0 40% 7%))',
                  border: selected ? '2px solid hsl(43 76% 53% / 0.8)' : '1.5px solid hsl(43 76% 53% / 0.2)',
                  boxShadow: selected
                    ? '0 0 25px hsl(43 76% 53% / 0.35), inset 0 0 20px hsl(43 76% 53% / 0.05)'
                    : '0 10px 30px hsl(0 0% 0% / 0.4)',
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRewardSelected(idx)}
              >
                <p className="font-display text-primary text-sm font-bold">{opt.label}</p>
                <p className="font-body text-foreground/70 text-xs mt-1">{opt.desc}</p>
              </motion.button>
            );
          })}
        </div>
        {rewardSelected !== null && (
          <motion.div
            className="mt-4 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {rewardSelected === 0 && (
              <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, hsl(0 50% 10% / 0.8), hsl(0 40% 8% / 0.8))', border: '1px solid hsl(43 76% 53% / 0.2)' }}>
                <p className="font-body text-foreground/80 text-sm mb-2">Chọn một ngày cố định trong tuần để anh voice cho em</p>
                <div className="flex items-center gap-3">
                  <select
                    className="px-3 py-2 rounded-md bg-black/40 border border-primary/30 text-primary/80"
                    onChange={(e) => setVoiceDay(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Chọn ngày trong tuần</option>
                    <option value="Thứ 2">Thứ 2</option>
                    <option value="Thứ 3">Thứ 3</option>
                    <option value="Thứ 4">Thứ 4</option>
                    <option value="Thứ 5">Thứ 5</option>
                    <option value="Thứ 6">Thứ 6</option>
                    <option value="Thứ 7">Thứ 7</option>
                    <option value="Chủ nhật">Chủ nhật</option>
                  </select>
                  <motion.button
                    className="px-4 py-2 rounded-full font-display text-xs tracking-wider uppercase bg-black/40 border border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setVoiceDay(voiceDay ?? 'Thứ 6')}
                  >
                    Xác nhận
                  </motion.button>
                </div>
                {voiceDay && (
                  <p className="mt-2 font-body text-primary/80 text-xs">Đã đặt lịch voice: cố định mỗi {voiceDay} hàng tuần. Chuẩn bị tai nghe nha 💖</p>
                )}
              </div>
            )}

            {rewardSelected === 1 && (
              <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, hsl(0 50% 10% / 0.8), hsl(0 40% 8% / 0.8))', border: '1px solid hsl(43 76% 53% / 0.2)' }}>
                <p className="font-body text-foreground/80 text-sm mb-2">Thiết lập “mật khẩu khẩn cấp” để gọi anh về ngay lập tức</p>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Ví dụ: BAOBEI SOS"
                    value={emergencyPassphrase}
                    onChange={(e) => setEmergencyPassphrase(e.target.value)}
                    className="px-3 py-2 rounded-md bg-black/40 border border-primary/30 text-primary/80 placeholder:text-muted-foreground/50"
                  />
                  <motion.button
                    className="px-4 py-2 rounded-full font-display text-xs tracking-wider uppercase bg-black/40 border border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setEmergencyPassphrase(emergencyPassphrase || 'BAOBEI SOS')}
                  >
                    Kích hoạt
                  </motion.button>
                </div>
                {emergencyPassphrase && (
                  <p className="mt-2 font-body text-primary/80 text-xs">Đã thiết lập mật khẩu khẩn cấp: {emergencyPassphrase}. Em gọi là anh về ngay ✨</p>
                )}
              </div>
            )}

            {rewardSelected === 2 && (
              <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, hsl(0 50% 10% / 0.8), hsl(0 40% 8% / 0.8))', border: '1px solid hsl(43 76% 53% / 0.2)' }}>
                <p className="font-body text-foreground/80 text-sm mb-2">Xác nhận phần thưởng “Ting Ting ngay 50k”</p>
                <motion.button
                  className="px-4 py-2 rounded-full font-display text-xs tracking-wider uppercase bg-black/40 border border-primary/30 text-primary/80 hover:text-primary hover:border-primary/60"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMoneyConfirmed(true)}
                >
                  Xác nhận Ting Ting
                </motion.button>
                {moneyConfirmed && (
                  <p className="mt-2 font-body text-primary/80 text-xs">Đã xác nhận phần thưởng. Ting Ting 50k đang trên đường đến ví em 💸</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GrandFinale;
