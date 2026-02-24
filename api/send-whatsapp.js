export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const response = await fetch('https://api.ultramsg.com/instance162945/messages/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: '09uj8nqnmpvvubq1',
        to: '9647751235150',
        body: message
      })
    });
    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}
