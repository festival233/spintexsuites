
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { email = "", name = "", source = "" } = body || {};
    const apiKey = context.env.RESEND_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>New VIP Signup</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p>This guest wants updates and the 10% special offer.</p>
      </div>
    `;

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Spintex Suites VIP <onboarding@resend.dev>",
        to: ["spintexsuites@gmail.com"],
        reply_to: email || "spintexsuites@gmail.com",
        subject: "Spintex Suites VIP signup",
        html
      })
    });

    const data = await resend.json();
    return new Response(JSON.stringify({ ok: resend.ok, data }), {
      status: resend.ok ? 200 : 500,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}
