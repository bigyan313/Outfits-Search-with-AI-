import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabase';

interface GenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gender: string) => void;
}

const GenderModal: React.FC<GenderModalProps> = ({ isOpen, onClose, onSelect }) => {
  const handleGenderSelect = async (gender: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          gender_preference: gender
        });

      if (error) throw error;

      onSelect(gender);
      onClose();
    } catch (error) {
      console.error('Error saving gender preference:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-md w-full mx-4 border border-white/20"
          >
            <h2 className="text-2xl font-light mb-6">Welcome to ADHIKARI</h2>
            <p className="text-gray-600 mb-8">
              To provide you with personalized outfit suggestions, please select your preferred clothing style:
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleGenderSelect('male')}
                className="w-full py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
              >
                Men's Fashion
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="w-full py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
              >
                Women's Fashion
              </button>
              <button
                onClick={() => handleGenderSelect('any')}
                className="w-full py-3 px-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Show All Styles
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GenderModal;