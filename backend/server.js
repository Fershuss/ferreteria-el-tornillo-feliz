import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { fileURLToPath } from "url";
import { dirname } from "path";

// === Configuración base ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/.env` });

// === Inicialización de Express y Stripe ===
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
  })
);
app.use(express.json());

// === Endpoint principal ===
app.get("/", (req, res) => {
  res.send("Servidor de Ferretería El Tornillo Feliz funcionando correctamente ⚙️");
});

// === Endpoint de pago ===
app.post("/api/checkout", async (req, res) => {
  try {
    const items = req.body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Carrito vacío o inválido" });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "gtq",
        product_data: { name: item.nombre },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://127.0.0.1:5501/success.html",
      cancel_url: "http://127.0.0.1:5501/cancel.html",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error en /api/checkout:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});

// === Iniciar servidor ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend activo en puerto ${PORT}`);
  console.log(`🔑 Stripe key cargada: ${process.env.STRIPE_SECRET_KEY ? "Sí" : "No"}`);
});
