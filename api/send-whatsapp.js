export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  const results = {};

  // ✅ إرسال واتساب عبر UltraMsg
  try {
    const waRes = await fetch('https://api.ultramsg.com/instance162945/messages/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: '09uj8nqnmpvvubq1',
        to: '9647751235150',
        body: message
      })
    });
    results.whatsapp = await waRes.json();
  } catch (e) {
    results.whatsapp = { error: e.message };
  }

  // ✅ إرسال تيليغرام
  try {
    const TG_TOKEN = '8390349160:AAGlePL2KGPU4nmtR7XackUOsyQY50XqAC0';
    const TG_CHAT_ID = '8038053852';
    const tgRes = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    results.telegram = await tgRes.json();
  } catch (e) {
    results.telegram = { error: e.message };
  }

  return res.status(200).json({ success: true, results });
}
