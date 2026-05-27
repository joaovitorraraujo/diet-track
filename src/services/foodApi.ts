import type { Alimento } from '@/types/alimento';


const USDA_API_KEY = process.env.EXPO_PUBLIC_USDA_API_KEY?.trim() || 'DEMO_KEY';
const USDA_BASE_URL = (process.env.EXPO_PUBLIC_USDA_BASE_URL?.trim()) || 'https://api.nal.usda.gov/fdc/v1';

const TRANSLATION_API_URL = (process.env.EXPO_PUBLIC_TRANSLATION_API_URL?.trim()) || 'https://api.mymemory.translated.net/get';

async function translateToEnglish(text: string): Promise<string> {
  try {
    const response = await fetch(
      `${TRANSLATION_API_URL}?q=${encodeURIComponent(text)}&langpair=pt|en`
    );
    const data = await response.json();
    if (data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return text; 
  } catch (error) {
    console.warn('Erro ao traduzir:', error);
    return text;
  }
}


async function translateToPortuguese(text: string): Promise<string> {
  try {
    const response = await fetch(
      `${TRANSLATION_API_URL}?q=${encodeURIComponent(text)}&langpair=en|pt`
    );
    const data = await response.json();
    if (data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch (error) {
    console.warn('Erro ao traduzir:', error);
    return text;
  }
}


export async function searchFoodsAPI(query: string): Promise<Alimento[]> {
  if (!query.trim()) return [];

  try {
    
    const englishQuery = await translateToEnglish(query);

    const response = await fetch(
      `${USDA_BASE_URL}/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(
        englishQuery
      )}&pageSize=15`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar alimentos na API.');
    }

    const data = await response.json();

    if (!data.foods || data.foods.length === 0) {
      return [];
    }

    const uniqueFoodsMap = new Map();
    for (const food of data.foods) {
      const descLower = food.description.toLowerCase();
      if (!uniqueFoodsMap.has(descLower)) {
        uniqueFoodsMap.set(descLower, food);
      }
    }
    const uniqueFoods = Array.from(uniqueFoodsMap.values());

    const topResults = uniqueFoods.slice(0, 8);

    const resultAlimentos = await Promise.all(
      topResults.map(async (food) => {
        const proteinNutrient = food.foodNutrients?.find(
          (n: any) => n.nutrientId === 1003 || n.nutrientName?.toLowerCase().includes('protein')
        );

        if (!proteinNutrient) return null;

        const categoriaEN = food.foodCategory || 'Outros';

        const [nomePT, categoriaPT] = await Promise.all([
          translateToPortuguese(food.description.toLowerCase()),
          translateToPortuguese(categoriaEN)
        ]);

        return {
          id: String(food.fdcId),
          nome: capitalize(nomePT),
          proteinaPor100g: Math.round(proteinNutrient.value || 0),
          categoria: capitalize(categoriaPT),
        };
      })
    );
    return resultAlimentos.filter((a): a is Alimento => a !== null);
  } catch (error) {
    console.error('Erro em searchFoodsAPI:', error);
    throw error;
  }
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
