import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { message, senderNote } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['raj.nikhil.tech@gmail.com'],
      subject: `💬 New message from your portfolio — messages.app`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0a0a0c; color: #e2e2e2; padding: 32px; border-radius: 10px; max-width: 560px;">
          <div style="border-bottom: 1px solid rgba(230,169,62,0.3); padding-bottom: 16px; margin-bottom: 24px;">
            <p style="color: #e6a93e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px;">
              nikhil@portfolio ~ messages.app
            </p>
            <h1 style="font-size: 18px; font-weight: 600; color: #fff; margin: 0;">
              New contact message
            </h1>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
            <p style="font-size: 11px; color: #e6a93e; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em;">$ message</p>
            <p style="font-size: 15px; color: #f0f0f0; line-height: 1.65; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
          </div>

          ${senderNote ? `
          <div style="background: rgba(230,169,62,0.05); border: 1px solid rgba(230,169,62,0.15); border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; color: #e6a93e; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.08em;">$ note</p>
            <p style="font-size: 13px; color: #bbb; margin: 0;">${senderNote}</p>
          </div>
          ` : ''}

          <p style="font-size: 11px; color: #555; margin: 0;">
            Sent via your portfolio's messages.app · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
