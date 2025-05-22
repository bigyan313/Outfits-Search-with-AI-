import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, LogOut, Sparkles, Heart } from 'lucide-react';
import { supabase } from '../services/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Link } from 'react-router-dom';
import WeatherCard from './WeatherCard';
import GenderPreference from './GenderPreference';

interface HeaderProps {
  showAuthModal: boolean;
  onCloseAuthModal: () => void;
  weather?: any;
  onGenderSelect: (gender: string) => void;
}

const Header: React.FC<HeaderProps> = ({ showAuthModal, onCloseAuthModal, weather, onGenderSelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [savedOutfitsCount, setSavedOutfitsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchSavedOutfitsCount(user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSavedOutfitsCount(session.user.id);
        onCloseAuthModal();
      }
    });

    return () => subscription.unsubscribe();
  }, [onCloseAuthModal]);

  const fetchSavedOutfitsCount = async (userId: string) => {
    const { count } = await supabase
      .from('saved_outfits')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    setSavedOutfitsCount(count || 0);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-4xl font-medium tracking-tight text-black">A</span>
              <span className="text-[9px] font-light tracking-[0.2em] text-black">DHIKAR</span>
              <span className="text-4xl font-medium tracking-tight text-black">I  bolt console</span>
            </Link>
            {weather && <WeatherCard weather={weather} />}
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <GenderPreference onSelect={onGenderSelect} />
                <Link 
                  to="/saved-outfits" 
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <Heart className="h-4 w-4" />
                  <span>Saved ({savedOutfitsCount})</span>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-light">{user.email}</span>
                <button onClick={handleSignOut} className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={() => onCloseAuthModal()} className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 bg-gray-100 py-1 px-3 rounded-full text-sm shadow">
              <Sparkles className="h-4 w-4 text-black" />
              <span className="font-light text-gray-700">GPT 4.0</span>
            </div>
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {user && (
              <>
                <GenderPreference onSelect={onGenderSelect} />
                <Link 
                  to="/saved-outfits"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2 px-4 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" />
                  <span>Saved ({savedOutfitsCount})</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-md w-full mx-4 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-medium tracking-tight text-black">A</span>
                <span className="text-[8px] font-light tracking-[0.2em] text-black mt-2">DHIKAR</span>
                <span className="text-3xl font-medium tracking-tight text-black">I</span>
              </div>
              <button onClick={onCloseAuthModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: 'black',
                    color: 'white',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    height: 'auto',
                    fontWeight: '400',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    '&:hover': {
                      background: '#1a1a1a',
                    },
                  },
                  container: {
                    background: 'transparent',
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                },
              }}
              providers={['google']}
              view="sign_in"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;