export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const message = (body?.message || "").trim();

    if (!name || !email || !message) {
      return json({ error: "Name, email, and message are required." }, 400);
    }

    if (!env.RESEND_API_KEY) {
      return json({ error: "Server email configuration is missing." }, 500);
    }

    const toEmail = env.CONTACT_TO_EMAIL || "spintexsuites@gmail.com";
    const fromEmail = env.CONTACT_FROM_EMAIL || "Spintex Suites <onboarding@resend.dev>";

    const text = [
      "New website inquiry",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <h2>New website inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New Spintex Suites inquiry from ${name}`,
        text,
        html,
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      const messageFromResend = resendData?.message || resendData?.error || "Email provider rejected the request.";
      return json({ error: messageFromResend }, 502);
    }

    return json({ success: true, id: resendData?.id || null }, 200);
  } catch {
    return json({ error: "Invalid request payload." }, 400);
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
