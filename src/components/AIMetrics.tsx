import React from 'react';
import { Clock, Search, Store, Sparkles } from 'lucide-react';

interface AIMetricsProps {
  stores: number;
  searchesPerformed: number;
  timeSaved: number;
}

const AIMetrics: React.FC<AIMetricsProps> = ({ stores, searchesPerformed, timeSaved }) => {
  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1">
        <Clock className="w-3 h-3 text-gray-500" />
        <span className="text-xs font-medium text-gray-700">{timeSaved}m</span>
      </div>

      <div className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1">
        <Store className="w-3 h-3 text-gray-500" />
        <span className="text-xs font-medium text-gray-700">{stores}</span>
      </div>

      <div className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1">
        <Search className="w-3 h-3 text-gray-500" />
        <span className="text-xs font-medium text-gray-700">{searchesPerformed}</span>
      </div>

      <div className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1">
        <Sparkles className="w-3 h-3 text-gray-500" />
        <span className="text-xs font-medium text-gray-700">100%</span>
      </div>
    </div>
  );
};

export default AIMetrics;