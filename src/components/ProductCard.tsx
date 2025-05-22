import React from 'react';
import { Product } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a 
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white overflow-hidden"
    >
      <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/300x400?text=${encodeURIComponent(product.store)}`;
          }}
        />
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] tracking-wider uppercase bg-white/90 backdrop-blur-sm px-2 py-1">
            {product.store}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <h5 className="text-sm tracking-wide uppercase line-clamp-2 group-hover:text-gray-600 transition-colors">
            {product.title}
          </h5>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
        </div>
        
        <p className="mt-2 text-sm tracking-wider">{product.price}</p>
      </div>
    </a>
  );
};

export default ProductCard;