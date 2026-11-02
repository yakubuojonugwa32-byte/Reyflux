import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { PRODUCTS, Product } from './src/data/products';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Server-side Gemini AI initialization (safe when API key is not present)
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    })
  : null;

// Helper to generate consistent recommendations from catalog
const generateFallbackRecommendations = (
  viewedProductIds: string[] = [],
  categoryAffinities: Record<string, number> = {}
) => {
  const sortedCategories = Object.entries(categoryAffinities)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([cat]) => cat);

  const primaryCat = sortedCategories[0] || 'palm_oil';
  const categoryPicks = PRODUCTS.filter((p) => p.category === primaryCat);
  const nonViewed = PRODUCTS.filter((p) => !viewedProductIds.includes(p.id));

  const combined = Array.from(new Set([...categoryPicks, ...nonViewed, ...PRODUCTS]));
  const selected = combined.slice(0, 4);

  return selected.map((p) => ({
    ...p,
    aiReason:
      p.category === primaryCat
        ? `Top Pick in Organic Foodstuffs`
        : p.isPopular
        ? 'Top Seller in Suleja'
        : 'Recommended for Your Kitchen'
  }));
};

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

// 2. REAL-TIME AI RECOMMENDATION ENGINE ENDPOINT (Accepts both GET and POST)
app.all('/api/recommendations', async (req, res) => {
  const reqData = req.method === 'POST' ? req.body || {} : req.query || {};
  const { viewedProductIds = [], categoryAffinities = {}, recentSearch = '' } = reqData;

  // If no AI key available, immediately return smart algorithmic recommendations
  if (!ai) {
    return res.json({ recommendations: generateFallbackRecommendations(viewedProductIds, categoryAffinities) });
  }

  try {
    const catalogSummary = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      volumeOrWeight: p.volumeOrWeight
    }));

    const prompt = `Analyze session data for Reyflux Enterprises Limited:
- Recently Viewed Product IDs: ${JSON.stringify(viewedProductIds)}
- Category Affinities: ${JSON.stringify(categoryAffinities)}
- Recent Search Query: "${recentSearch}"

Product Catalog:
${JSON.stringify(catalogSummary)}

Pick EXACTLY 4 product IDs that best suit this user's browsing preferences from our 6 main product categories (Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour, Groundnut).
For each product, provide a short 3-6 word personalized recommendation reason (e.g. "Pairs with your Palm Oil view", "Popular in Plantain Flour").

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
      // Parse catch
    }

    let recommendedIds: Array<{ id: string; reason: string }> = resultJson.recommendations || [];

    if (!recommendedIds || recommendedIds.length < 4) {
      return res.json({ recommendations: generateFallbackRecommendations(viewedProductIds, categoryAffinities) });
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
    res.json({ recommendations: generateFallbackRecommendations(viewedProductIds, categoryAffinities) });
  }
});

// Helper for local chat reply
const getLocalChatReply = (lastMsg: string) => {
  let reply = `Welcome to Reyflux Enterprises Limited! 👋\n\n`;
  if (lastMsg.includes('price') || lastMsg.includes('cost') || lastMsg.includes('how much')) {
    reply += `Here are our current direct-from-mill prices:\n- **Pure Organic Palm Oil**: 4L (₦14,500), 10L (₦34,000), 25L (₦82,000)\n- **Crispy Yellow Garri**: 5kg (₦7,500), 10kg (₦14,500), 25kg (₦34,000), 50kg (₦66,000)\n- **High Quality Cassava Flour**: 10kg (₦12,500), 50kg (₦57,000)\n- **Plantain Flour**: 5kg (₦8,500), 25kg (₦39,000)\n- **Amala Yam Flour**: 5kg (₦9,000), 25kg (₦42,000)\n- **Groundnut**: 2kg Jar (₦4,500), 10kg Raw (₦21,000)\n\nAll products are 100% natural with zero preservatives!`;
  } else if (lastMsg.includes('address') || lastMsg.includes('location') || lastMsg.includes('where')) {
    reply += `📍 **Store Address**: Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja, Niger State.\n\nWe offer fast doorstep delivery across Suleja, Minna, Abuja FCT, and nationwide!`;
  } else {
    reply += `I am here to assist you with fresh Yellow & White Garri, Pure Organic Palm Oil, High Quality Cassava Flour, Plantain Flour, Amala Flour, and Groundnut in Suleja.\n\nFor instant order placement or waybill delivery, click the WhatsApp button or call us directly at **09064153934** or **07068581710**!`;
  }
  return reply;
};

// 3. AI CHAT ENDPOINT FOR REYFLUX LIVE ASSISTANT
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();

    if (!ai) {
      return res.json({ reply: getLocalChatReply(lastMsg) });
    }

    const systemInstruction = `You are "Reyflux AI Assistant", the official live advisor for REYFLUX ENTERPRISES LIMITED.
Location: Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja, Niger State.
Primary WhatsApp / Phone: 09064153934, 07068581710.

Main Products Sold (WE ONLY SELL FOODSTUFFS - NO POS):
1. PURE ORGANIC PALM OIL (100% Natural, No Preservatives, No Added Colours)
   - 4 Litres (₦14,500), 10 Litres (₦34,000), 25 Litres (₦82,000), 50 Litres Drum (₦160,000). Direct mill processed.
2. CRISPY GARRI
   - Fresh Yellow Garri (5kg ₦7,500, 10kg ₦14,500, 25kg ₦34,000, 50kg ₦66,000).
   - Extra Sour White Ijebu Garri (25kg ₦38,000).
3. HIGH QUALITY CASSAVA FLOUR (HQCF)
   - Odorless white gluten-free flour (10kg ₦12,500, 50kg ₦57,000) for swallow & gluten-free baking.
4. PLANTAIN FLOUR
   - 100% plantain flour (5kg ₦8,500, 25kg ₦39,000). Low glycemic index, perfect for health-conscious and diabetic diets.
5. AMALA YAM FLOUR
   - Traditional dried yam flour (5kg ₦9,000, 25kg ₦42,000). Smooth and stretchy for Ewedu & Gbegiri soups.
6. GROUNDNUT
   - Crunchy groundnut (2kg ₦4,500) & Raw shelled groundnut seeds (10kg ₦21,000).

DOORSTEP DELIVERY:
- Fast delivery to any location in Suleja, Minna, Abuja FCT, and nationwide.

Guidelines:
- Maintain a warm, friendly, helpful Nigerian business tone.
- Focus strictly on these 6 food products (Palm oil, Garri, Cassava flour, Plantain flour, Amala flour, Groundnut).
- Never mention POS.
- Never describe groundnut as roasted.
- Answer questions about prices, recipe ideas, storage tips, health benefits, and bulk orders.
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

    res.json({ reply: response.text || 'I am here to assist with Palm Oil, Garri, Cassava Flour, Plantain Flour, Amala Flour, and Groundnut orders!' });
  } catch (err: any) {
    const lastMsg = (req.body?.messages?.slice(-1)[0]?.content || '').toLowerCase();
    res.json({ reply: getLocalChatReply(lastMsg) });
  }
});

// 4. API 404 CATCH-ALL (Guarantees JSON response for any API route, prevents Vite HTML fallback)
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.path}` });
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
