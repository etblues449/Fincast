export const runtime = "nodejs";

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not set on the server." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { system, prompt } = body ?? {};
  if (typeof prompt !== "string" || !prompt.trim()) {
    return Response.json({ error: "`prompt` is required." }, { status: 400 });
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: system ?? "",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return Response.json(
      { error: `Anthropic API error (${upstream.status})`, detail },
      { status: 502 }
    );
  }

  const data = await upstream.json();
  const text = data.content?.find((b) => b.type === "text")?.text ?? "";
  return Response.json({ text });
}
