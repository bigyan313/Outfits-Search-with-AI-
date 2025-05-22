import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Bot, Code2, Cloud, Database, Sparkles, Palette } from 'lucide-react';

const AboutUs: React.FC = () => {
  const techStack = [
    {
      icon: Bot,
      name: "OpenAI GPT-4",
      description: "Advanced AI model for natural language processing and outfit recommendations"
    },
    {
      icon: Code2,
      name: "React + TypeScript (V6)",
      description: "Modern frontend framework for building responsive user interfaces"
    },
    {
      icon: Cloud,
      name: "Supabase",
      description: "Backend infrastructure for authentication and data storage"
    },
    {
      icon: Database,
      name: "PostgreSQL",
      description: "Robust database for storing user preferences and chat history"
    },
    {
      icon: Sparkles,
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for beautiful, responsive designs"
    },
    {
      icon: Palette,
      name: "Framer Motion",
      description: "Production-ready animation library for React"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header showAuthModal={false} onCloseAuthModal={() => {}} />
      <main className="container mx-auto px-4 py-16 max-w-4xl mt-16">
        <h1 className="text-4xl font-bold mb-8">About ADHIKARI AI</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            ADHIKARI AI is an innovative AI-powered fashion assistant that revolutionizes the way people approach personal styling. By combining advanced artificial intelligence with real-time weather data and fashion expertise, we provide personalized outfit recommendations that are both practical and stylish.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="p-6 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <tech.icon className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-medium">{tech.name}</h3>
                </div>
                <p className="text-gray-600">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Business Model</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Our platform operates on a freemium model, offering both free and premium services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Basic outfit recommendations based on weather and occasions (Free)</li>
              <li>Advanced personalization and style preferences (Premium)</li>
              <li>Affiliate partnerships with fashion retailers</li>
              <li>API access for fashion retailers and stylists</li>
            </ul>
          </div>
        </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">AI-Generated Project</h2>
            <p className="text-gray-600 mb-4">
              This project was generated using artificial intelligence, showcasing the potential of AI in creating sophisticated web applications. The AI assistance helped in:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Generating initial project structure and components</li>
              <li>Creating responsive and modern UI designs</li>
              <li>Implementing best practices in code organization</li>
              <li>Ensuring security and performance optimizations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions or feedback? Reach out to us at{' '}
              <a href="mailto:bigyan.adhikari313@gmail.com" className="text-blue-600">
                bigyan.adhikari313@gmail.com
              </a>
            </p>
          </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;