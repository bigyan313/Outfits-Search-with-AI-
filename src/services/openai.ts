import OpenAI from 'openai';
import { OutfitItem } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface TravelInfo {
  type: 'travel' | 'event';
  destination?: string;
  date?: string;
  event?: string;
}

export async function extractTravelInfo(message: string): Promise<TravelInfo> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a travel and fashion expert. Extract travel or event information from user messages."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('Failed to extract travel information');

    // Parse the response and determine if it's travel or event related
    const isTravelRelated = /travel|trip|visiting|going to|headed to|flying to/i.test(message);
    
    if (isTravelRelated) {
      // Extract destination and date
      const destinationMatch = message.match(/(?:to|in|at)\s+([A-Za-z\s]+)(?:\s+on|in|at|this|next)?/i);
      const dateMatch = message.match(/(?:on|this|next)\s+([A-Za-z]+\s+\d{1,2}(?:st|nd|rd|th)?|\d{1,2}(?:st|nd|rd|th)?\s+[A-Za-z]+)/i);

      return {
        type: 'travel',
        destination: destinationMatch ? destinationMatch[1].trim() : undefined,
        date: dateMatch ? dateMatch[1] : undefined
      };
    } else {
      // Assume it's an event
      const eventMatch = message.match(/(?:for|to)\s+(?:a|an|the)?\s+([A-Za-z\s]+)(?:\s+on|in|at)?/i);
      
      return {
        type: 'event',
        event: eventMatch ? eventMatch[1].trim() : 'special occasion'
      };
    }
  } catch (error) {
    console.error('Error extracting travel info:', error);
    throw new Error('Failed to process your request. Please try again.');
  }
}

interface OutfitGenerationParams {
  weather?: any;
  event?: string;
  gender?: string;
}

export async function generateOutfitSuggestions(params: OutfitGenerationParams): Promise<OutfitItem[]> {
  try {
    const genderContext = params.gender && params.gender !== 'any' 
      ? `for ${params.gender}'s fashion` 
      : '';

    let prompt = '';
    
    if (params.weather) {
      prompt = `Generate 3 outfit suggestions ${genderContext} for ${params.weather.location} with a temperature of ${params.weather.temperature}°F and ${params.weather.description} conditions. For each outfit, provide:
      1. Type (e.g., Casual Day Out, Evening Dinner)
      2. Description including:
         - Top (specific to ${params.gender || 'any'} fashion)
         - Outer layer if needed (specific to ${params.gender || 'any'} fashion)
         - Bottom (specific to ${params.gender || 'any'} fashion)
         - Shoes (specific to ${params.gender || 'any'} fashion)
         - 2-3 accessories (specific to ${params.gender || 'any'} fashion)
      Make suggestions weather-appropriate and stylish. Ensure all items are gender-appropriate.`;
    } else if (params.event) {
      prompt = `Generate 3 outfit suggestions ${genderContext} for a ${params.event}. For each outfit, provide:
      1. Type (e.g., Formal Attire, Semi-Formal)
      2. Description including:
         - Top (specific to ${params.gender || 'any'} fashion)
         - Outer layer if needed (specific to ${params.gender || 'any'} fashion)
         - Bottom (specific to ${params.gender || 'any'} fashion)
         - Shoes (specific to ${params.gender || 'any'} fashion)
         - 2-3 accessories (specific to ${params.gender || 'any'} fashion)
      Make suggestions event-appropriate and stylish. Ensure all items are gender-appropriate.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a fashion stylist expert specializing in ${params.gender === 'any' ? 'all fashion' : `${params.gender}'s fashion`}. Provide detailed outfit suggestions that are appropriate for the specified gender and occasion.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('Failed to generate outfit suggestions');

    // Parse the response into structured outfit suggestions
    const outfits = response.split(/Outfit \d+:|Suggestion \d+:/g)
      .filter(Boolean)
      .map(outfitText => {
        const typeMatch = outfitText.match(/Type:\s*([^\n]+)/);
        const topMatch = outfitText.match(/Top:\s*([^\n]+)/);
        const outerMatch = outfitText.match(/Outer:\s*([^\n]+)/);
        const bottomMatch = outfitText.match(/Bottom:\s*([^\n]+)/);
        const shoesMatch = outfitText.match(/Shoes:\s*([^\n]+)/);
        const accessoriesMatch = outfitText.match(/Accessories:\s*([^\n]+)/);

        const accessories = accessoriesMatch 
          ? accessoriesMatch[1].split(',').map(acc => acc.trim())
          : [];

        return {
          id: Math.random().toString(36).substring(2, 9),
          type: typeMatch ? typeMatch[1].trim() : 'Casual Outfit',
          description: {
            top: topMatch ? topMatch[1].trim() : 'Stylish top',
            outer: outerMatch ? outerMatch[1].trim() : undefined,
            bottom: bottomMatch ? bottomMatch[1].trim() : 'Comfortable bottoms',
            shoes: shoesMatch ? shoesMatch[1].trim() : 'Versatile shoes',
            accessories: accessories.length > 0 ? accessories : ['Classic accessories']
          },
          searchQuery: `${params.gender !== 'any' ? `${params.gender}'s` : ''} ${typeMatch ? typeMatch[1].trim() : 'casual'} outfit`
        };
      });

    return outfits;
  } catch (error) {
    console.error('Error generating outfit suggestions:', error);
    throw new Error('Failed to generate outfit suggestions. Please try again.');
  }
}