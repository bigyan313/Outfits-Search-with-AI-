import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPanel from './components/ChatPanel';
import ResultsPanel from './components/ResultsPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import { TravelPlan } from './types';
import { extractTravelInfo, generateOutfitSuggestions } from './services/openai';
import { getWeatherForecast } from './services/weather';
import { searchProducts } from './services/shopping';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './services/supabase';
import GenderModal from './components/GenderModal';

// Import pages
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import AboutUs from './pages/AboutUs';
import SavedOutfits from './pages/SavedOutfits';

function App() {
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState('any');

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { hash, pathname } = window.location;
      if (pathname === '/auth/callback' || hash.includes('access_token')) {
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error('Auth redirect error:', error);
        if (data?.session) {
          setIsAuthenticated(true);
          setIsChatOpen(true); // Open chat panel on successful login
          window.history.replaceState({}, document.title, '/');
        }
      }
    };

    handleAuthRedirect();

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        checkUserPreferences(user.id);
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthed = !!session?.user;
      setIsAuthenticated(isAuthed);
      
      if (isAuthed) {
        setShowAuthModal(false);
        setIsChatOpen(true); // Open chat panel on login
        checkUserPreferences(session.user.id);
      } else {
        setIsChatOpen(false); // Close chat panel on logout
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserPreferences = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('gender_preference')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching preferences:', error);
      return;
    }

    if (!data) {
      setShowGenderModal(true);
    } else {
      setSelectedGender(data.gender_preference);
    }
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const chatPanel = document.getElementById('chat-panel');
      const chatButton = document.getElementById('chat-button');
      
      if (isChatOpen && chatPanel && chatButton && 
          !chatPanel.contains(event.target as Node) && 
          !chatButton.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  // Close chat when loading starts
  useEffect(() => {
    if (isLoading) {
      setIsChatOpen(false);
    }
  }, [isLoading]);

  const handleChatSubmit = async (message: string) => {
    if (!hasInteracted) setHasInteracted(true);
    setIsLoading(true);
    
    try {
      const info = await extractTravelInfo(message);
      
      if (info.type === 'travel') {
        const weatherData = await getWeatherForecast(info.destination!, info.date!);
        const warning = weatherData.warning;
        
        const outfitSuggestions = await generateOutfitSuggestions({ 
          weather: weatherData,
          gender: selectedGender 
        });
        
        const outfitsWithProducts = await Promise.all(
          outfitSuggestions.map(async (outfit: any) => ({
            ...outfit,
            products: await searchProducts(outfit, selectedGender)
          }))
        );
        
        setTravelPlan({
          id: Math.random().toString(36).substring(2, 9),
          destination: info.destination!,
          date: weatherData.date,
          weather: weatherData,
          outfits: outfitsWithProducts,
          status: warning ? 'warning' : 'success',
          warning,
          type: 'travel'
        });
      } else {
        const outfitSuggestions = await generateOutfitSuggestions({ 
          event: info.event,
          gender: selectedGender 
        });
        
        const outfitsWithProducts = await Promise.all(
          outfitSuggestions.map(async (outfit: any) => ({
            ...outfit,
            products: await searchProducts(outfit, selectedGender)
          }))
        );
        
        setTravelPlan({
          id: Math.random().toString(36).substring(2, 9),
          event: info.event!,
          outfits: outfitsWithProducts,
          status: 'success',
          type: 'event'
        });
      }
    } catch (error: any) {
      console.error('Error processing request:', error);
      setTravelPlan({
        id: Math.random().toString(36).substring(2, 9),
        status: 'error',
        error: error.message || 'Failed to process your request. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleAuthRequest = () => {
    setShowAuthModal(true);
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    setShowGenderModal(false);
  };

  const MainContent = () => (
    <div className="min-h-screen bg-white">
      <Header 
        showAuthModal={showAuthModal} 
        onCloseAuthModal={() => setShowAuthModal(false)} 
        weather={travelPlan?.weather}
        onGenderSelect={handleGenderSelect}
      />
      <main className="container mx-auto px-4 py-6 max-w-[1920px] min-h-[calc(100vh-4rem)] mt-16">
        <div className="w-full h-full">
          <ResultsPanel 
            travelPlan={travelPlan} 
            isLoading={isLoading} 
            onChatOpen={toggleChat}
            hasInteracted={hasInteracted}
          />
        </div>

        {hasInteracted && (
          <button
            id="chat-button"
            onClick={toggleChat}
            className="fixed bottom-0 left-0 w-full z-50 py-4 bg-white shadow-md border-t border-gray-200 flex items-center justify-center gap-2 text-gray-700 font-medium text-base transition hover:bg-gray-50"
          >
            {isChatOpen ? (
              <>
                <X className="h-5 w-5" />
                Close Chat
              </>
            ) : (
              <>
                <MessageCircle className="h-5 w-5" />
                Open Chat
              </>
            )}
          </button>
        )}

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              id="chat-panel"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-40 w-full max-w-md"
            >
              <ChatPanel 
                onSubmit={handleChatSubmit} 
                isLoading={isLoading}
                travelPlan={travelPlan}
                onRequestAuth={handleAuthRequest}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <GenderModal
          isOpen={showGenderModal}
          onClose={() => setShowGenderModal(false)}
          onSelect={handleGenderSelect}
        />
      </main>
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/saved-outfits" element={<SavedOutfits />} />
      </Routes>
    </Router>
  );
}

export default App;