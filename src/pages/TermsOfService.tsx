import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header showAuthModal={false} onCloseAuthModal={() => {}} />
      <main className="container mx-auto px-4 py-16 max-w-4xl mt-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using ADHIKARI AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              ADHIKARI AI is an AI-powered fashion assistant that provides personalized outfit recommendations based on weather conditions, events, and user preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content and functionality on ADHIKARI AI, including but not limited to text, graphics, logos, and software, is the property of ADHIKARI AI and is protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              ADHIKARI AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;