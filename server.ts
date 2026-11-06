import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS, Product } from './src/data/products';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// ---------------------------------------------------------------------------
// Supabase Server-Side Initialization
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// In-memory fallback orders store for zero-friction preview & fallback
const inMemoryOrders: Record<string, any> = {};

// Helper to determine delivery fee based on destination
const calculateDeliveryFee = (destination: string): number => {
  if (destination.includes('Suleja Central')) return 1000;
  if (destination.includes('Suleja Outskirts') || destination.includes('Maje')) return 1500;
  if (destination.includes('Abuja')) return 2500;
  if (destination.includes('Minna')) return 3000;
  return 3500; // Interstate Waybill
};

// ---------------------------------------------------------------------------
// Gemini AI Server-Side Initialization
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// 1. PRODUCTS API (Canonical Store Catalog & Supabase Sync)
// ---------------------------------------------------------------------------
app.get('/api/products', async (_req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        return res.json({ products: data, source: 'supabase' });
      }
    }
    return res.json({ products: PRODUCTS, source: 'local_catalog' });
  } catch (err: any) {
    return res.json({ products: PRODUCTS, source: 'local_catalog' });
  }
});

// Cursor-based pagination API
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

// ---------------------------------------------------------------------------
// 2. SECURE PAYSTACK CHECKOUT & PRICE VALIDATION
// ---------------------------------------------------------------------------

// A. Initialize Paystack Transaction
app.post('/api/paystack/initialize', async (req, res) => {
  try {
    const { items, customerEmail, customerName, customerPhone, deliveryLocation } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart items are required for checkout' });
    }
    if (!customerEmail || !customerName) {
      return res.status(400).json({ error: 'Customer name and email are required' });
    }

    // SERVER-SIDE PRICE VALIDATION: NEVER TRUST FRONTEND PRICES!
    let validatedSubtotal = 0;
    const validatedItems: Array<{ id: string; name: string; price: number; quantity: number; volumeOrWeight: string }> = [];

    for (const item of items) {
      const prod = PRODUCTS.find((p) => p.id === item.productId);
      if (!prod) {
        return res.status(400).json({ error: `Invalid product ID in cart: ${item.productId}` });
      }
      const qty = Math.max(1, Number(item.quantity) || 1);
      const lineTotal = prod.price * qty;
      validatedSubtotal += lineTotal;
      validatedItems.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: qty,
        volumeOrWeight: prod.volumeOrWeight
      });
    }

    const deliveryFee = calculateDeliveryFee(deliveryLocation || 'Suleja Central');
    const totalAmount = validatedSubtotal + deliveryFee;
    const amountInKobo = Math.round(totalAmount * 100);

    const reference = `REYFLUX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const orderRecord = {
      reference,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || 'N/A',
      delivery_location: deliveryLocation || 'Suleja Central',
      subtotal: validatedSubtotal,
      delivery_fee: deliveryFee,
      total_amount: totalAmount,
      payment_status: 'pending',
      items: validatedItems,
      created_at: new Date().toISOString()
    };

    // Save order record to Supabase if configured
    if (supabase) {
      try {
        await supabase.from('orders').insert([orderRecord]);
      } catch (dbErr) {
        console.error('Supabase orders insert notice:', dbErr);
      }
    }
    // Always keep in memory fallback
    inMemoryOrders[reference] = orderRecord;

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;

    // Real Paystack API call if secret key is configured
    if (paystackSecret && paystackSecret.startsWith('sk_')) {
      const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: customerEmail,
          amount: amountInKobo,
          reference: reference,
          callback_url: `${appUrl}/api/paystack/callback`,
          metadata: {
            customerName,
            customerPhone,
            deliveryLocation,
            itemsCount: validatedItems.length,
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: customerName },
              { display_name: "Delivery Destination", variable_name: "delivery_location", value: deliveryLocation }
            ]
          }
        })
      });

      const paystackData = await paystackRes.json();
      if (paystackData.status && paystackData.data) {
        return res.json({
          status: true,
          authorization_url: paystackData.data.authorization_url,
          access_code: paystackData.data.access_code,
          reference: reference,
          amount: totalAmount,
          mode: 'live_paystack'
        });
      } else {
        return res.status(400).json({ error: paystackData.message || 'Paystack initialization failed' });
      }
    }

    // Direct mode fallback when PAYSTACK_SECRET_KEY is not set (so preview is 100% functional)
    return res.json({
      status: true,
      authorization_url: `/paystack-demo?reference=${reference}`,
      access_code: `demo_access_${reference}`,
      reference: reference,
      amount: totalAmount,
      mode: 'preview_demo'
    });

  } catch (err: any) {
    console.error('Paystack initialize error:', err);
    res.status(500).json({ error: err.message || 'Server error initializing checkout' });
  }
});

// B. Verify Paystack Transaction Server-Side
app.post('/api/paystack/verify', async (req, res) => {
  try {
    const { reference } = req.body;
    if (!reference) {
      return res.status(400).json({ error: 'Transaction reference is required' });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    let paymentVerified = false;
    let channel = 'card';

    if (paystackSecret && paystackSecret.startsWith('sk_')) {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: {
          Authorization: `Bearer ${paystackSecret}`
        }
      });
      const verifyData = await verifyRes.json();
      if (verifyData.status && verifyData.data && verifyData.data.status === 'success') {
        paymentVerified = true;
        channel = verifyData.data.channel || 'card';
      } else {
        return res.status(400).json({ error: 'Payment verification failed at Paystack' });
      }
    } else {
      // In preview mode without real key, verify instantly for testing
      paymentVerified = true;
      channel = 'demo_card_or_transfer';
    }

    if (paymentVerified) {
      const paidAt = new Date().toISOString();

      // Update in Supabase
      if (supabase) {
        try {
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              paystack_reference: reference,
              payment_channel: channel,
              paid_at: paidAt
            })
            .eq('reference', reference);
        } catch (dbErr) {
          console.error('Supabase order update notice:', dbErr);
        }
      }

      // Update in memory fallback
      if (inMemoryOrders[reference]) {
        inMemoryOrders[reference].payment_status = 'paid';
        inMemoryOrders[reference].paystack_reference = reference;
        inMemoryOrders[reference].payment_channel = channel;
        inMemoryOrders[reference].paid_at = paidAt;
      }

      const orderDetails = (supabase ? (await supabase.from('orders').select('*').eq('reference', reference).single()).data : null) || inMemoryOrders[reference];

      return res.json({
        success: true,
        message: 'Payment verified and order confirmed successfully',
        reference,
        order: orderDetails || { reference, payment_status: 'paid', paid_at: paidAt }
      });
    }

    return res.status(400).json({ error: 'Payment was not successful' });

  } catch (err: any) {
    console.error('Paystack verify error:', err);
    res.status(500).json({ error: err.message || 'Server error verifying payment' });
  }
});

// C. Fetch Order Details by Reference
app.get('/api/orders/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    if (supabase) {
      const { data } = await supabase.from('orders').select('*').eq('reference', reference).single();
      if (data) return res.json({ order: data });
    }
    if (inMemoryOrders[reference]) {
      return res.json({ order: inMemoryOrders[reference] });
    }
    return res.status(404).json({ error: 'Order not found' });
  } catch (err: any) {
    res.status(500).json({ error: 'Error fetching order details' });
  }
});

// ---------------------------------------------------------------------------
// 3. AI RECOMMENDATIONS & LIVE CHAT ASSISTANT
// ---------------------------------------------------------------------------

app.all('/api/recommendations', async (req, res) => {
  const reqData = req.method === 'POST' ? req.body || {} : req.query || {};
  const { viewedProductIds = [], categoryAffinities = {}, recentSearch = '' } = reqData;

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

Pick EXACTLY 4 product IDs that best suit this user's browsing preferences.
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
    } catch (e) {}

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

const getLocalChatReply = (lastMsg: string) => {
  let reply = `Welcome to Reyflux Enterprises Limited! 👋\n\n`;
  if (lastMsg.includes('price') || lastMsg.includes('cost') || lastMsg.includes('how much')) {
    reply += `Here are our current direct-from-mill prices:\n- **Pure Organic Palm Oil**: 4L (₦14,500), 10L (₦34,000), 25L (₦82,000)\n- **Crispy Yellow Garri**: 10kg (₦14,500), 25kg (₦34,000), 50kg (₦66,000)\n- **High Quality Cassava Flour**: 10kg (₦12,500)\n- **Plantain Flour**: 5kg (₦8,500)\n- **Amala Yam Flour**: 5kg (₦9,000)\n- **Groundnut**: 2kg Jar (₦4,500), 10kg Raw (₦21,000)\n\nWe support secure Paystack checkout and instant WhatsApp dispatch!`;
  } else if (lastMsg.includes('address') || lastMsg.includes('location') || lastMsg.includes('where')) {
    reply += `📍 **Store Address**: Second Gate by Yaro College Road, Adjacent Alheri Plaza, Suleja, Niger State.\n\nWe offer fast doorstep delivery across Suleja, Minna, Abuja FCT, and nationwide!`;
  } else {
    reply += `I am here to assist you with fresh Yellow & White Garri, Pure Organic Palm Oil, High Quality Cassava Flour, Plantain Flour, Amala Flour, and Groundnut in Suleja.\n\nYou can pay securely online with Paystack or chat with us on WhatsApp at **09064153934**!`;
  }
  return reply;
};

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

    const systemInstruction = `You are "Reyflux AI Assistant", the official live advisor for REYFLUX ENTERPRISES LIMITED in Suleja, Niger State.
Products: Pure Red Palm Oil, Crispy Garri, Cassava Flour, Plantain Flour, Amala Yam Flour, Groundnut.
Payment: We support secure Paystack online card/transfer payments and WhatsApp orders.
Keep responses helpful, Nigerian business polite, and concise!`;

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

// API 404 Catch-All
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.path}` });
});

// Start Express + Vite Server
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
