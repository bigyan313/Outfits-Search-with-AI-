import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header showAuthModal={false} onCloseAuthModal={() => {}} />
      <main className="container mx-auto px-4 py-16 max-w-4xl mt-16">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Account information (email, password)</li>
              <li>User preferences and style choices</li>
              <li>Location data for weather-based recommendations</li>
              <li>Chat history and interactions with our AI</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide personalized outfit recommendations</li>
              <li>Improve our AI algorithms and service quality</li>
              <li>Communicate with you about our services</li>
              <li>Ensure the security of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;