function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const formType = body?.formType || 'inquiry';

    if (!body?.email) {
      return Response.json({ error: 'Email is required.' }, { status: 400 });
    }

    if (formType === 'inquiry' && (!body?.name || !body?.message)) {
      return Response.json({ error: 'Missing required inquiry fields.' }, { status: 400 });
    }

    if (!env.RESEND_API_KEY) {
      return Response.json({ error: 'Missing RESEND_API_KEY environment variable.' }, { status: 500 });
    }

    const subject = formType === 'newsletter'
      ? `Spintex Suites Signup${body.name ? ` from ${escapeHtml(body.name)}` : ''}`
      : `Spintex Suites Inquiry from ${escapeHtml(body.name)}`;

    const html = formType === 'newsletter'
      ? `
        <h2>New Spintex Suites Offer Signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.name || 'Not provided')}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Source:</strong> Website popup signup</p>
      `
      : `
        <h2>New Spintex Suites Special Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(body.phone || 'N/A')}</p>
        <p><strong>Preferred Platform:</strong> ${escapeHtml(body.platform || 'N/A')}</p>
        <p><strong>Arrival Date:</strong> ${escapeHtml(body.arrivalDate || 'N/A')}</p>
        <p><strong>Length of Stay:</strong> ${escapeHtml(body.stayLength || 'N/A')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(body.message || '').replace(/\n/g, '<br/>')}</p>
      `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || 'Spintex Suites <onboarding@resend.dev>',
        to: ['spintexsuites@gmail.com'],
        reply_to: body.email,
        subject,
        html
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return Response.json({ error: resendData?.message || 'Email provider error.' }, { status: 500 });
    }

    return Response.json({ ok: true, resend: resendData }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message || 'Unexpected error.' }, { status: 500 });
  }
}
