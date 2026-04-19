export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
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
  if (!type || !message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Campos obrigatórios ausentes" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const date = timestamp ? new Date(timestamp).toLocaleString("pt-BR") : new Date().toLocaleString("pt-BR");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Sartori Guide <noreply@sartoriguide.com.br>",
      to: [toEmail],
      subject: `[Feedback] ${type} — Sartori Guide`,
      html: `
        <h2>Novo feedback recebido</h2>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Tela:</strong> ${screen ?? "—"}</p>
        <p><strong>Data:</strong> ${date}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message.trim().replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(JSON.stringify({ error: "Erro ao enviar email", detail: err }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
