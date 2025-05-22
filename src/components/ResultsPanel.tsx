import React from 'react';
import { TravelPlan } from '../types';
import OutfitSuggestions from './OutfitSuggestions';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import { motion } from 'framer-motion';

interface ResultsPanelProps {
  travelPlan: TravelPlan | null;
  isLoading: boolean;
  onChatOpen: () => void;
  hasInteracted: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ travelPlan, isLoading, onChatOpen, hasInteracted }) => {
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-6rem)]">
        <LoadingState />
      </div>
    );
  }

  if (!travelPlan || !travelPlan.outfits?.length) {
    return (
      <div className="min-h-[calc(100vh-6rem)]">
        <EmptyState onChatOpen={onChatOpen} hasInteracted={hasInteracted} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {travelPlan.warning && (
        <p className="text-amber-600 text-sm bg-amber-50 px-3 py-2 rounded-lg">
          {travelPlan.warning}
        </p>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <OutfitSuggestions outfits={travelPlan.outfits} />
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;