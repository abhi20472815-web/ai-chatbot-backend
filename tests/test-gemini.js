const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    // Try this model name
  const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });
    const result = await model.generateContent('Say hello!');
    const response = result.response;
    const text = response.text();
    console.log('✅ SUCCESS! AI Response:', text);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testGemini();