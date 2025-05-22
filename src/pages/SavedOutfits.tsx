import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OutfitCard from '../components/OutfitCard';
import { OutfitItem } from '../types';
import { Trash2 } from 'lucide-react';

const SavedOutfits: React.FC = () => {
  const [savedOutfits, setSavedOutfits] = useState<OutfitItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedOutfits();
  }, []);

  const fetchSavedOutfits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('saved_outfits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSavedOutfits(data.map(item => item.outfit_data));
    } catch (error) {
      console.error('Error fetching saved outfits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (outfitId: string) => {
    try {
      const { error } = await supabase
        .from('saved_outfits')
        .delete()
        .eq('id', outfitId);

      if (error) throw error;

      setSavedOutfits(prev => prev.filter(outfit => outfit.id !== outfitId));
    } catch (error) {
      console.error('Error deleting outfit:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showAuthModal={false} onCloseAuthModal={() => {}} />
      <main className="container mx-auto px-4 py-16 max-w-7xl mt-16">
        <h1 className="text-4xl font-bold mb-8">Saved Outfits</h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : savedOutfits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No saved outfits yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedOutfits.map((outfit) => (
              <div key={outfit.id} className="relative group">
                <OutfitCard
                  outfit={outfit}
                  onRefresh={async () => {}}
                />
                <button
                  onClick={() => handleDelete(outfit.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedOutfits;