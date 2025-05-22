import React, { useState } from 'react';
import OutfitCard from './OutfitCard';
import AIMetrics from './AIMetrics';
import { Sparkles } from 'lucide-react';
import { generateOutfitSuggestions } from '../services/openai';
import { searchProducts } from '../services/shopping';
import { OutfitItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface OutfitSuggestionsProps {
  outfits: OutfitItem[];
}

const OutfitSuggestions: React.FC<OutfitSuggestionsProps> = ({ outfits }) => {
  const [localOutfits, setLocalOutfits] = useState<OutfitItem[]>(outfits);
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleRefresh = async (outfitId: string) => {
    const outfitToRefresh = localOutfits.find(o => o.id === outfitId);
    if (!outfitToRefresh) return;

    try {
      const newOutfitSuggestions = await generateOutfitSuggestions({
        event: outfitToRefresh.type
      });

      if (newOutfitSuggestions && newOutfitSuggestions.length > 0) {
        const newOutfit = newOutfitSuggestions[0];
        const outfitWithProducts = {
          ...newOutfit,
          id: Math.random().toString(36).substring(2, 9),
          products: await searchProducts(newOutfit)
        };

        setLocalOutfits(prev => 
          prev.map(o => o.id === outfitId ? outfitWithProducts : o)
        );
      }
    } catch (error) {
      console.error('Error refreshing outfit:', error);
    }
  };

  // Calculate metrics
  const stores = new Set(localOutfits.flatMap(outfit => 
    outfit.products?.map(product => product.store) || []
  )).size;
  
  const searchesPerformed = localOutfits.reduce((acc, outfit) => 
    acc + (outfit.products?.length || 0), 0
  );
  
  const timeSaved = localOutfits.length * 5; // 5 minutes per outfit

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-semibold text-black">AI-Curated Outfits</h3>
        </div>
        <AIMetrics 
          stores={stores}
          searchesPerformed={searchesPerformed}
          timeSaved={timeSaved}
        />
      </div>

      <div className="mt-8">
        {/* Chrome-style tabs */}
        <div className="flex border-b border-gray-200 mb-6 relative">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
          {localOutfits.map((outfit, index) => (
            <button
              key={outfit.id}
              onClick={() => setActiveTab(index)}
              className={`relative px-6 py-3 text-sm font-light transition-colors ${
                activeTab === index 
                  ? 'text-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {outfit.type}
              {activeTab === index && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <OutfitCard
              outfit={localOutfits[activeTab]}
              onRefresh={handleRefresh}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OutfitSuggestions;