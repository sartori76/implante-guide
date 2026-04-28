export const config = { runtime: "edge" };

import { generateDBSummary } from "../src/db.js";
import { generateRXDBSummary } from "../src/rxdb.js";
import { DETECTIVE_RX_PROMPT } from "../src/prompts/detectiveRxPrompt.js";

const dbSummary = generateDBSummary();

const SYSTEM_PROMPT_CLINICAL = `Você é um assistente clínico especializado em implantodontia, integrado ao Implante Guide.
Responda SEMPRE em português, em texto corrido sem markdown (sem ##, **, -- ou similares).
Use APENAS os dados abaixo sobre conexões e componentes. Nunca invente componentes ou conexões não listados aqui.
Quando atualizar o banco de dados do app, sua resposta será automaticamente atualizada.

REGRAS CRÍTICAS DE CONEXÃO:
- BLX e BLC usam EXCLUSIVAMENTE TorcFit — NUNCA CrossFit
- TLX e TLC usam EXCLUSIVAMENTE TorcFit — NUNCA CrossFit
- BL e BLT usam EXCLUSIVAMENTE CrossFit RC — NUNCA TorcFit
- SC usa EXCLUSIVAMENTE Small CrossFit SC
- Nunca misture sistemas de conexão entre linhas diferentes

BASE DE DADOS ATUAL DO APP:
${dbSummary}

Sempre recomendar confirmação com catálogo oficial do fabricante antes de qualquer procedimento clínico.`;

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

  const { message, image, mediaType, mode } = body;
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
      max_tokens: mode === "detective_rx" ? 1024 : 512,
      system: mode === "detective_rx"
        ? DETECTIVE_RX_PROMPT + "\n\n" + generateRXDBSummary()
        : SYSTEM_PROMPT_CLINICAL,
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
