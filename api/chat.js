export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  
  // Vercel 프로젝트 설정(Settings) -> Environment Variables에 GEMINI_API_KEY를 등록하세요.
  const apiKey = process.env.GEMINI_API_KEY; 

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key not configured in Environment Variables' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { 
          parts: [{ text: "당신은 '화이트스타일치과'의 '스마일 디렉터 AI'입니다. 매우 전문적이고 공감 능력이 뛰어나며 지식이 풍부한 조수입니다. 목표는 프리미엄 치과 상담 및 브랜드 정보를 제공하는 것입니다. 모든 답변은 한국어로 정중하게 하세요. 짧고 명확하게 답변하세요." }] 
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
       console.error("Gemini API Error Detail:", data.error);
       return res.status(500).json({ error: data.error.message || 'API Error' });
    }

    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      res.status(200).json({ reply });
    } else {
      res.status(500).json({ error: 'Gemini API returned no content' });
    }
  } catch (error) {
    console.error('Gemini API Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
}
