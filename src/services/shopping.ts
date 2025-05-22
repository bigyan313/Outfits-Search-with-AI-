import { Product } from '../types';

const STORES = [
  'prada.com',
  'gucci.com',
  'louisvuitton.com',
  'nordstrom.com',
  'macys.com',
  'asos.com',
  'zara.com',
  'hm.com',
  'target.com',
  'uniqlo.com',
  'forever21.com',
  'fashionnova.com',
  'shein.com'
];

async function getUnsplashImage(query: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=portrait&per_page=5`,
      {
        headers: {
          'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch from Unsplash');

    const data = await response.json();
    if (data.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
      return data.results[randomIndex].urls.regular;
    }

    throw new Error('No images found');
  } catch (error) {
    console.error('Unsplash API error:', error);
    return `https://source.unsplash.com/400x600/?${encodeURIComponent(query)}`;
  }
}

async function searchForCategory(category: string, description: string, gender: string = 'any'): Promise<Product[]> {
  try {
    const siteRestriction = `(${STORES.map(site => `site:${site}`).join(' OR ')})`;
    const genderPrefix = gender !== 'any' ? `${gender}'s` : '';
    
    // Clean the description of any existing gender references
    let cleanDescription = description.replace(/men'?s?|women'?s?|male'?s?|female'?s?|unisex/gi, '').trim();
    
    // Define gender-specific replacements for accessories and clothing types
    const maleReplacements: Record<string, string> = {
      'blouse': 'shirt',
      'dress': 'suit',
      'skirt': 'pants',
      'earrings': 'watch',
      'necklace': 'chain',
      'bracelet': 'bracelet',
      'handbag': 'bag',
      'purse': 'wallet',
      'heels': 'shoes'
    };

    const femaleReplacements: Record<string, string> = {
      'suit': 'dress',
      'tie': 'necklace',
      'suspenders': 'belt',
      'cufflinks': 'bracelet'
    };

    // Apply gender-specific replacements
    if (gender === 'male') {
      Object.entries(maleReplacements).forEach(([female, male]) => {
        cleanDescription = cleanDescription.replace(new RegExp(female, 'gi'), male);
      });
    } else if (gender === 'female') {
      Object.entries(femaleReplacements).forEach(([male, female]) => {
        cleanDescription = cleanDescription.replace(new RegExp(male, 'gi'), female);
      });
    }

    // Add gender-specific qualifiers for certain categories
    if (category === 'accessories' && gender !== 'any') {
      if (gender === 'male') {
        cleanDescription = cleanDescription
          .replace(/jewelry|accessories/gi, 'men\'s accessories')
          .replace(/earrings|necklace/gi, 'watch');
      } else {
        cleanDescription = cleanDescription
          .replace(/jewelry|accessories/gi, 'women\'s accessories');
      }
    }

    // Construct the search query
    const searchTerms = [
      genderPrefix,
      cleanDescription,
      category === 'accessories' ? '' : category,
      'clothing',
      gender !== 'any' ? gender : ''
    ].filter(Boolean);

    const searchQuery = `${searchTerms.join(' ')} ${siteRestriction}`;
    console.log('Search Query:', searchQuery);

    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', import.meta.env.VITE_GOOGLE_API_KEY);
    url.searchParams.append('cx', import.meta.env.VITE_GOOGLE_CSE_ID);
    url.searchParams.append('q', searchQuery);
    url.searchParams.append('num', '6');
    url.searchParams.append('searchType', 'image');
    url.searchParams.append('gl', 'us');

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch search results');

    const data = await response.json();
    if (!data.items) return [];

    return data.items.map((item: any) => {
      const storeMatch = item.displayLink.match(/(?:www\.)?([\w-]+)\.com/);
      const storeDomain = storeMatch ? storeMatch[1].toLowerCase() : '';

      const storeNames: Record<string, string> = {
        prada: 'PRADA',
        gucci: 'GUCCI',
        louisvuitton: 'LOUIS VUITTON',
        nordstrom: 'Nordstrom',
        macys: 'Macy\'s',
        asos: 'ASOS',
        zara: 'ZARA',
        hm: 'H&M',
        target: 'Target',
        uniqlo: 'UNIQLO',
        forever21: 'Forever 21',
        fashionnova: 'Fashion Nova',
        shein: 'SHEIN'
      };

      const store = storeNames[storeDomain] || storeDomain.toUpperCase();

      return {
        id: Math.random().toString(36).substring(2, 9),
        title: item.title.split(/[|\-]/)[0].trim(),
        link: item.image.contextLink || item.link,
        image: item.link,
        price: '$' + (Math.floor(Math.random() * 150) + 30).toFixed(2),
        store,
        category,
        description: item.snippet || description
      };
    });
  } catch (error) {
    console.error(`Error searching for ${category}:`, error);
    return [];
  }
}

export async function searchProducts(outfit: any, gender: string = 'any'): Promise<Product[]> {
  if (!outfit?.description) {
    console.error('Invalid outfit data:', outfit);
    return [];
  }

  const products: Product[] = [];

  // Search for top
  if (outfit.description.top) {
    const tops = await searchForCategory('top', outfit.description.top, gender);
    products.push(...tops);
  }

  // Search for outer layer if present
  if (outfit.description.outer) {
    const outers = await searchForCategory('outerwear', outfit.description.outer, gender);
    products.push(...outers);
  }

  // Search for bottom
  if (outfit.description.bottom) {
    const bottoms = await searchForCategory('bottom', outfit.description.bottom, gender);
    products.push(...bottoms);
  }

  // Search for shoes
  if (outfit.description.shoes) {
    const shoes = await searchForCategory('shoes', outfit.description.shoes, gender);
    products.push(...shoes);
  }

  // Search for accessories
  if (Array.isArray(outfit.description.accessories)) {
    for (const accessory of outfit.description.accessories) {
      const accessoryItems = await searchForCategory('accessories', accessory, gender);
      products.push(...accessoryItems.slice(0, 1));
    }
  }

  return products.filter(product => product.image && product.link);
}