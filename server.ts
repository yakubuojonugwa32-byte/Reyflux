import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { PRODUCTS, Product } from './src/data/products.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Server-side Gemini AI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// 1. CURSOR-BASED PAGINATION API FOR INFINITE SCROLL DISCOVERY FEED
app.get('/api/products/infinite', (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 6, 20);
    const cursor = (req.query.cursor as string) || '';
    const category = (req.query.category as string) || 'all';
    const search = ((req.query.search as string) || '').toLowerCase().trim();

    let filtered = PRODUCTS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });

    let startIndex = 0;
    if (cursor) {
      const foundIdx = filtered.findIndex((p) => p.id === cursor);
      if (foundIdx !== -1) {
        startIndex = foundIdx + 1;
      }
    }

    const paginatedItems = filtered.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < filtered.length;
    const nextCursor = hasMore && paginatedItems.length > 0 ? paginatedItems[paginatedItems.length - 1].id : null;

    res.json({
      items: paginatedItems,
      nextCursor,
      hasMore,
      totalCount: filtered.length
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Pagination error' });
  }
});

// 2. REAL-TIME AI RECOMMENDATION ENGINE ENDPOINT
app.post('/api/recommendations', async (req, res) => {
  try {
    const { viewedProductIds = [], categoryAffinities = {}, recentSearch = '' } = req.body;

    const catalogSummary = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      volumeOrWeight: p.volumeOrWeight
    }));

    const prompt = `Analyze this user session data for Reyflux Enterprises Limited:
- Recently Viewed Product IDs: ${JSON.stringify(viewedProductIds)}
- Category Affinities (click counts): ${JSON.stringify(categoryAffinities)}
- Recent Search Query: "${recentSearch}"

Product Catalog:
${JSON.stringify(catalogSummary)}

Pick EXACTLY 4 product IDs that best suit this user's browsing preferences.
For each product, provide a short 3-6 word personalized recommendation reason (e.g. "Pairs with your Palm Oil view", "Popular in Garri category", "Best value for cooking").

Return valid JSON in this structure:
{
  "recommendations": [
    { "id": "product_id_1", "reason": "Short reason" },
    { "id": "product_id_2", "reason": "Short reason" },
    { "id": "product_id_3", "reason": "Short reason" },
    { "id": "product_id_4", "reason": "Short reason" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let resultJson = { recommendations: [] };
    try {
      resultJson = JSON.parse(response.text || '{}');
    } catch (e) {
      console.warn('Failed to parse AI recommendation JSON, using fallback logic', e);
    }

    let recommendedIds: Array<{ id: string; reason: string }> = resultJson.recommendations || [];

    // Fallback if AI returned fewer than 4 or invalid IDs
    if (!recommendedIds || recommendedIds.length < 4) {
      const topPopular = PRODUCTS.filter((p) => !viewedProductIds.includes(p.id)).slice(0, 4);
      recommendedIds = topPopular.map((p) => ({
        id: p.id,
        reason: p.isPopular ? 'Top Seller in Suleja' : 'Recommended for You'
      }));
    }

    const recommendedProducts = recommendedIds.map((rec) => {
      const fullProd = PRODUCTS.find((p) => p.id === rec.id) || PRODUCTS[0];
      return {
        ...fullProd,
        aiReason: rec.reason || 'Personalized Pick'
      };
    });

    res.json({ recommendations: recommendedProducts });
  } catch (err: any) {
    console.error('AI Recommendations Error:', err);
    // Fallback response
    const fallback = PRODUCTS.slice(0, 4).map((p) => ({
      ...p,
      aiReason: 'Top Recommended for Kitchens'
    }));
    res.json({ recommendations: fallback });
  }
});

// 3. AI CHAT ENDPOINT FOR REYFLUX LIVE ASSISTANT
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemInstruction = `You are "Reyflux AI Assistant", the official live advisor for REYFLUX ENTERPRISES LIMITED.
Location: Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja, Niger State.
Primary WhatsApp / Phone: 09064153934, 07068581710.

Main Products Sold:
1. PURE ORGANIC PALM OIL (100% Natural, No Preservatives, No Added Colours)
   - Sizes: 4 Litres (₦14,500), 10 Litres (₦34,000), 25 Litres (₦82,000), 50 Litres Drum (₦160,000). Direct mill processed.
2. CRISPY GARRI
   - Fresh Yellow Garri (5kg ₦7,500, 10kg ₦14,500, 25kg ₦34,000, 50kg ₦66,000).
   - Extra Sour White Ijebu Garri (25kg ₦38,000).
3. HIGH QUALITY CASSAVA FLOUR (HQCF)
   - Odorless, white gluten-free flour (10kg ₦12,500, 50kg ₦57,000) for swallow and gluten-free baking.
4. POS FINANCIAL AGENCY
   - Instant cash withdrawal, bank transfers, electricity bill token payments (AEDC), cable TV.
5. DOORSTEP DELIVERY
   - Delivery to any location in Suleja, Minna, Abuja FCT, and nationwide.

Guidelines:
- Maintain a warm, friendly, helpful Nigerian business tone.
- Answer questions about prices, storage tips, recipe ideas, bulk orders, and delivery fees.
- Always include helpful call-to-actions, encouraging the user to click the WhatsApp button or call 09064153934 / 07068581710 to confirm their order.
- Keep responses readable, succinct (1-3 paragraphs), and enthusiastic!`;

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    res.json({ reply: response.text || 'I am here to assist with Garri, Palm Oil, Cassava Flour, and POS services!' });
  } catch (err: any) {
    console.error('Server AI Chat Error:', err);
    res.status(500).json({
      error: 'Sorry, I am having trouble connecting to Reyflux AI. Please call 09064153934 directly!'
    });
  }
});

// Start Express + Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Reyflux applet server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
