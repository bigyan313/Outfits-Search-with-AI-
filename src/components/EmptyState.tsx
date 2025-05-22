import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmptyStateProps {
  onChatOpen: () => void;
  hasInteracted: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onChatOpen, hasInteracted }) => {
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);

  const handleChatClick = () => {
    setSuggestionsVisible(false);
    onChatOpen();
  };

  return (
    <div className="min-h-[calc(100vh-24rem)] bg-white text-black flex flex-col items-center justify-center px-4 relative py-20 md:py-0">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="mx-4 text-9xl font-light tracking-tight">
              ADHIKARI
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 mt-8"
        >
          <h1 className="text-5xl md:text-[100px] font-light tracking-tight mb-4">
            ADHIKARI AI
          </h1>
          <p className="text-sm tracking-[0.2em] text-gray-500 uppercase">
            Artificial Intelligence Haute Couture
          </p>
        </motion.div>

        <AnimatePresence>
          {suggestionsVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl space-y-8 md:space-y-12 px-2 md:px-4"
            >
              <div className="grid grid-cols-4 md:grid-cols-8 gap-y-4 md:gap-y-6 text-center">
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">HAUTE<br />COUTURE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">PARISIAN<br />STYLE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">RESORT<br />LUXE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">MINIMALIST</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">CLASSIC<br />PIECES</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">AVANT-<br />GARDE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">SUSTAINABLE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">ARTISANAL</motion.button>

                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">RAVE<br />PARTY</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">BABY<br />SHOWER</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">EMINEM<br />STYLE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">ONE<br />PIECE</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">PARIS<br />WEEK</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">MIAMI<br />BEACH</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">TITANIC<br />ERA</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-black transition-colors">TOKYO<br />WINTER</motion.button>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 text-center">LUXURY BRANDS</p>
                  <div className="flex justify-center gap-6 md:gap-12">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">PRADA</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">GUCCI</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">LOUIS VUITTON</motion.span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 text-center">PREMIUM RETAILERS</p>
                  <div className="flex justify-center gap-6 md:gap-12">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">NORDSTROM</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">MACY'S</motion.span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 text-center">FASHION RETAILERS</p>
                  <div className="flex justify-center flex-wrap gap-x-6 md:gap-x-12 gap-y-2">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">ASOS</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">ZARA</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">H&M</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">TARGET</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">UNIQLO</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">FOREVER 21</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">FASHION NOVA</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] tracking-[0.2em]">SHEIN</motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!hasInteracted && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center">
            <motion.button
              onClick={handleChatClick}
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Begin Styling
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;