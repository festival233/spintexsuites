
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const {
      name = "",
      email = "",
      phone = "",
      room = "",
      checkin = "",
      checkout = "",
      platform = "",
      bed = "",
      message = ""
    } = body || {};

    const apiKey = context.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ ok: false, error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>New Spintex Suites Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Room Interest:</strong> ${room}</p>
        <p><strong>Check-in:</strong> ${checkin}</p>
        <p><strong>Check-out:</strong> ${checkout}</p>
        <p><strong>Preferred Platform:</strong> ${platform}</p>
        <p><strong>Bed Preference:</strong> ${bed}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      </div>
    `;

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Spintex Suites <onboarding@resend.dev>",
        to: ["spintexsuites@gmail.com"],
        reply_to: email || "spintexsuites@gmail.com",
        subject: `Spintex Suites Inquiry${name ? " · " + name : ""}`,
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
