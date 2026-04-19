export const config = { runtime: "edge" };

const SYSTEM_PROMPT = `Você é um assistente clínico especializado em implantodontia, integrado ao Sartori Guide.
Responda dúvidas sobre implantes dentários, componentes protéticos, torques, conexões e protocolos clínicos.
Seja direto, técnico e conciso. Use terminologia odontológica em português.
Não substitua a avaliação clínica do profissional — reforce sempre que o protocolo oficial do fabricante deve ser consultado.
Limite respostas a no máximo 3 parágrafos curtos.`;

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key não configurada" }), {
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

  const { message, image, mediaType } = body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Mensagem inválida" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const content = [];
  if (image && typeof image === "string") {
    content.push({
      type: "image",
      source: {
        type: "base64",
        media_type: mediaType || "image/jpeg",
        data: image,
      },
    });
  }
  content.push({ type: "text", text: message.trim() });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(JSON.stringify({ error: "Erro na API", detail: err }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? "";

  return new Response(JSON.stringify({ reply: text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
