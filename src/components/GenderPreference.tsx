import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface GenderPreferenceProps {
  onSelect: (gender: string) => void;
}

const GenderPreference: React.FC<GenderPreferenceProps> = ({ onSelect }) => {
  const [selectedGender, setSelectedGender] = useState<string>('any');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPreference();
  }, []);

  const fetchUserPreference = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_preferences')
        .select('gender_preference')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching preference:', error);
        return;
      }

      if (data) {
        setSelectedGender(data.gender_preference);
        onSelect(data.gender_preference);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenderSelect = async (gender: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setSelectedGender(gender);
      onSelect(gender);

      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          gender_preference: gender
        })
        .select()
        .single();

      if (error) throw error;
    } catch (error) {
      console.error('Error saving preference:', error);
    }
  };

  if (loading) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => handleGenderSelect('male')}
        className={`px-3 py-1 rounded-full transition-colors ${
          selectedGender === 'male'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Male
      </button>
      <button
        onClick={() => handleGenderSelect('female')}
        className={`px-3 py-1 rounded-full transition-colors ${
          selectedGender === 'female'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Female
      </button>
      <button
        onClick={() => handleGenderSelect('any')}
        className={`px-3 py-1 rounded-full transition-colors ${
          selectedGender === 'any'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Any
      </button>
    </div>
  );
};

export default GenderPreference;