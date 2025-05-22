import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 md:px-6 bg-black text-white">
      <div className="container mx-auto max-w-[1920px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-4xl font-light tracking-tighter">A</span>
              <span className="text-[9px] font-light tracking-[0.4em] mt-3">DHIKAR</span>
              <span className="text-4xl font-light tracking-tighter">I</span>
            </div>
            <p className="text-gray-400 mb-6 font-light tracking-wide">
              AI-powered fashion assistant that suggests outfits based on weather forecasts and personal style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-light text-white mb-4 tracking-widest uppercase text-sm">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Men's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Women's Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Sale</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-light text-white mb-4 tracking-widest uppercase text-sm">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Store Locations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Our Technology</a></li>
              <li><a href="mailto:bigyan.adhikari313@gmail.com" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-light text-white mb-4 tracking-widest uppercase text-sm">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Track Your Order</a></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 mb-4 md:mb-0 font-light tracking-wide">
            © {new Date().getFullYear()} ADHIKARI™. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Privacy Policy</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors font-light tracking-wide">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;