import React, { useState, useEffect } from 'react';
import { OutfitItem } from '../types';
import { ShoppingBag, ChevronDown, ChevronUp, CheckCircle2, RefreshCw, Heart } from 'lucide-react';
import ProductCard from './ProductCard';
import { supabase } from '../services/supabase';

interface OutfitCardProps {
  outfit: OutfitItem;
  onRefresh: (outfitId: string) => Promise<void>;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onRefresh }) => {
  const [expanded, setExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const hasProducts = outfit.products && outfit.products.length > 0;

  useEffect(() => {
    if (outfit?.id) {
      checkIfOutfitSaved();
    }
  }, [outfit?.id]);

  const checkIfOutfitSaved = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !outfit?.id) return;

      const { data, error } = await supabase
        .from('saved_outfits')
        .select('id')
        .eq('user_id', user.id)
        .eq('outfit_data->>id', outfit.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking saved status:', error);
        return;
      }

      setIsSaved(!!data);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing || !outfit?.id) return;
    setShowPreviewPopup(true);
    setTimeout(() => setShowPreviewPopup(false), 2000);
    setIsRefreshing(true);
    try {
      await onRefresh(outfit.id);
    } catch (error) {
      console.error('Failed to refresh outfit:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveOutfit = async () => {
    try {
      setIsSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSavedMessage('Please sign in to save outfits');
        setShowPreviewPopup(true);
        setTimeout(() => {
          setShowPreviewPopup(false);
          setSavedMessage('');
        }, 2000);
        return;
      }

      if (!outfit?.id) {
        setSavedMessage('Invalid outfit data');
        setShowPreviewPopup(true);
        setTimeout(() => {
          setShowPreviewPopup(false);
          setSavedMessage('');
        }, 2000);
        return;
      }

      if (isSaved) {
        const { error } = await supabase
          .from('saved_outfits')
          .delete()
          .eq('outfit_data->>id', outfit.id)
          .eq('user_id', user.id);

        if (error) throw error;
        setIsSaved(false);
        setSavedMessage('Removed from collection');
      } else {
        const { error } = await supabase
          .from('saved_outfits')
          .insert({
            user_id: user.id,
            outfit_data: outfit
          });

        if (error) throw error;
        setIsSaved(true);
        setSavedMessage('Added to collection');
      }

      setShowPreviewPopup(true);
      setTimeout(() => {
        setShowPreviewPopup(false);
        setSavedMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error saving outfit:', error);
      setSavedMessage('Failed to update collection');
      setShowPreviewPopup(true);
      setTimeout(() => {
        setShowPreviewPopup(false);
        setSavedMessage('');
      }, 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border-t border-gray-100 first:border-t-0">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6 relative">
          <div>
            <h4 className="text-lg tracking-wide uppercase mb-4">{outfit.type}</h4>
            <div className="space-y-3 text-sm tracking-wide">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="font-light">{outfit.description.top}</span>
              </div>

              {outfit.description.outer && (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="font-light">{outfit.description.outer}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="font-light">{outfit.description.bottom}</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="font-light">{outfit.description.shoes}</span>
              </div>

              {outfit.description.accessories.map((accessory, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="font-light">{accessory}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 transition-all ${
                isRefreshing
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-black'
              }`}
              disabled={isRefreshing}
              aria-label="Refresh outfit suggestions"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleSaveOutfit}
              className={`p-2 transition-all ${
                isSaving
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-black'
              }`}
              disabled={isSaving}
            >
              <Heart 
                className={`h-4 w-4 ${isSaving ? 'animate-pulse' : ''} ${
                  isSaved ? 'fill-black text-black' : ''
                }`} 
              />
            </button>
          </div>

          {showPreviewPopup && savedMessage && (
            <div className="absolute top-10 right-0 bg-black text-white text-xs tracking-wider px-3 py-1.5 uppercase">
              {savedMessage}
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-sm tracking-wide hover:text-gray-600 transition-colors uppercase"
          >
            <span className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shop Selection
            </span>
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {expanded && (
            <div className="mt-6">
              {!hasProducts ? (
                <div className="text-center py-8">
                  <p className="text-sm tracking-wide text-gray-500 uppercase">No items available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {outfit.products?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;