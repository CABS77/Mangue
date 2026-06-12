import { NextRequest, NextResponse } from 'next/server';

const BOT = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT = process.env.TELEGRAM_CHAT_ID!;

async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT, text, parse_mode: 'HTML' }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error('Telegram error:', res.status, body);
    throw new Error(`Telegram ${res.status}: ${body}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      fullName, email, phone, customerType, company,
      address, postalCode, city, orders, totalBoxes,
      totalWeight, estimatedPrice, notes,
    } = data;

    // Build Telegram message
    const orderLines = (orders as string).split('\n').map((l: string) => `  • ${l}`).join('\n');
    const tgMsg = [
      `🥭 <b>NOUVELLE COMMANDE</b>`,
      ``,
      `👤 <b>${fullName}</b>${company ? ` — ${company}` : ''}`,
      `📱 ${phone}`,
      `📧 ${email}`,
      `🏷️ ${customerType === 'professionnel' ? 'Professionnel' : 'Particulier'}`,
      ``,
      `📦 <b>Produits :</b>`,
      orderLines,
      ``,
      `⚖️ ${totalBoxes} boîte(s) — ${totalWeight}`,
      `💰 Estimation : <b>${estimatedPrice}</b>`,
      ``,
      `🚚 <b>Livraison :</b>`,
      `  ${address}`,
      `  ${postalCode} ${city}`,
      notes && notes !== '—' ? `\n📝 Notes : ${notes}` : '',
      ``,
      `<i>Rappeler pour confirmer l'acompte 50%</i>`,
    ].filter(l => l !== undefined).join('\n');

    await sendTelegram(tgMsg);

    // Confirmation email to customer via Gmail SMTP
    // Using fetch to a simple email endpoint or just skip if no SMTP configured
    // For now Telegram is the primary notification

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Commande API error:', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
