import express from 'express';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Types
interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

interface ProductWithPrice extends Product {
  price: number;
  popularity: number; // Score out of 5
}

// Load products from JSON file
const getProductsFromFile = (): Product[] => {
  try {
    const filePath = path.join(__dirname, '../../products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
};

// Get current gold price per gram in USD
const getGoldPrice = async (): Promise<number> => {
  try {
    console.log('Fetching real-time gold price from MetalpriceAPI...');
    
    // Using MetalpriceAPI - professional precious metals pricing API
    // API documentation: https://metalpriceapi.com/documentation
    const API_KEY = '06f02324953617e9b1b3a5c40e04e101';
    const response = await axios.get(`https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU`, {
      timeout: 8000,
      headers: {
        'User-Agent': 'EngagementRings-PriceCalculator/1.0'
      }
    });
    
    if (response.data && response.data.success && response.data.rates && response.data.rates.USDXAU) {
      // MetalpriceAPI returns USDXAU which is the price of 1 ounce of gold in USD
      const goldPricePerOunce = response.data.rates.USDXAU;
      const goldPricePerGram = goldPricePerOunce / 31.1035; // 1 troy ounce = 31.1035 grams
      
      console.log(`Current gold price: $${goldPricePerOunce.toFixed(2)}/oz = $${goldPricePerGram.toFixed(2)}/gram (via MetalpriceAPI)`);
      return Math.round(goldPricePerGram * 100) / 100; // Round to 2 decimal places
    } else {
      throw new Error('Invalid API response format from MetalpriceAPI');
    }
  } catch (error) {
    console.error('Error fetching gold price from MetalpriceAPI:', error instanceof Error ? error.message : String(error));
    throw new Error('Unable to fetch current gold price. Please try again later.');
  }
};

// Calculate product price based on formula: (popularityScore + 1) * weight * goldPrice
const calculatePrice = (popularityScore: number, weight: number, goldPrice: number): number => {
  return (popularityScore + 1) * weight * goldPrice;
};

// Convert popularity score to 5-point scale
const convertPopularityScore = (score: number): number => {
  return Math.round((score * 5) * 10) / 10; // Round to 1 decimal place
};

// GET /api/products - Get all products with calculated prices
router.get('/', async (req, res) => {
  try {
    const products = getProductsFromFile();
    const goldPrice = await getGoldPrice();
    
    const productsWithPrices: ProductWithPrice[] = products.map(product => ({
      ...product,
      price: Math.round(calculatePrice(product.popularityScore, product.weight, goldPrice) * 100) / 100,
      popularity: convertPopularityScore(product.popularityScore)
    }));

    res.json({
      products: productsWithPrices,
      goldPrice: Math.round(goldPrice * 100) / 100,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/filtered - Get filtered products (bonus feature)
router.get('/filtered', async (req, res) => {
  try {
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;
    
    const products = getProductsFromFile();
    const goldPrice = await getGoldPrice();
    
    let productsWithPrices: ProductWithPrice[] = products.map(product => ({
      ...product,
      price: Math.round(calculatePrice(product.popularityScore, product.weight, goldPrice) * 100) / 100,
      popularity: convertPopularityScore(product.popularityScore)
    }));

    // Apply filters
    if (minPrice) {
      productsWithPrices = productsWithPrices.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      productsWithPrices = productsWithPrices.filter(p => p.price <= Number(maxPrice));
    }
    if (minPopularity) {
      productsWithPrices = productsWithPrices.filter(p => p.popularity >= Number(minPopularity));
    }
    if (maxPopularity) {
      productsWithPrices = productsWithPrices.filter(p => p.popularity <= Number(maxPopularity));
    }

    res.json({
      products: productsWithPrices,
      goldPrice: Math.round(goldPrice * 100) / 100,
      filters: { minPrice, maxPrice, minPopularity, maxPopularity },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in GET /products/filtered:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as productRoutes }; 