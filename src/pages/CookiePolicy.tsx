import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header showAuthModal={false} onCloseAuthModal={() => {}} />
      <main className="container mx-auto px-4 py-16 max-w-4xl mt-16">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Authentication and security</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance</li>
              <li>Personalized recommendations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience and some features may not function as intended.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our Cookie Policy, please contact us at:
              <a href="mailto:bigyan.adhikari313@gmail.com" className="text-blue-600 ml-2">
                bigyan.adhikari313@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;