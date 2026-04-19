export const config = { runtime: "edge" };

const VALID_TYPES = ["Bug", "Sugestão", "Dado incorreto"];
const MAX_MESSAGE = 2000;
const MAX_SCREEN = 50;

// Rate limiting: max 5 requests per IP per hour
const rateLimitMap = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const entry = rateLimitMap.get(ip) ?? { count: 0, windowStart: now };
  if (now - entry.windowStart > windowMs) {
    entry.count = 0;
    entry.windowStart = now;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count <= 5;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em 1 hora." }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.FEEDBACK_EMAIL;
  if (!apiKey || !toEmail) {
    return new Response(JSON.stringify({ error: "Variáveis de ambiente não configuradas" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Body inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { type, message, screen, timestamp } = body;

  if (!VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: "Tipo inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Mensagem ausente" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (message.trim().length > MAX_MESSAGE) {
    return new Response(JSON.stringify({ error: `Mensagem excede ${MAX_MESSAGE} caracteres` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const safeScreen = typeof screen === "string" ? screen.slice(0, MAX_SCREEN) : "—";
  const date = timestamp ? new Date(timestamp).toLocaleString("pt-BR") : new Date().toLocaleString("pt-BR");

  const text = [
    `Tipo: ${type}`,
    `Tela: ${safeScreen}`,
    `Data: ${date}`,
    ``,
    `Mensagem:`,
    message.trim(),
  ].join("\n");

  const t0 = Date.now();
  let status = 200;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        from: "Sartori Guide <noreply@sartoriguide.com.br>",
        to: [toEmail],
        subject: `[Feedback] ${escapeHtml(type)} — Sartori Guide`,
        text,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      status = 502;
      console.log(JSON.stringify({ type, screen: safeScreen, status, latency: Date.now() - t0, resendError: err }));
      return new Response(JSON.stringify({ error: "Erro ao enviar email" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    status = 502;
    console.log(JSON.stringify({ type, screen: safeScreen, status, latency: Date.now() - t0, fetchError: String(err) }));
    return new Response(JSON.stringify({ error: "Falha na conexão com o serviço de email" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log(JSON.stringify({ type, screen: safeScreen, status, latency: Date.now() - t0 }));
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
