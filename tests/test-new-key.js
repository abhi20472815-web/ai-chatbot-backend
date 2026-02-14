const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testNewKey() {
  console.log('Testing new API key...\n');
  
  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-1.5-flash-latest',
    'gemini-pro'
  ];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello!');
      const text = result.response.text();
      console.log(`✅ SUCCESS! Model: ${modelName}`);
      console.log(`Response: ${text}\n`);
      console.log(`\n🎉 USE THIS MODEL IN YOUR CODE: ${modelName}`);
      return;
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message.substring(0, 60)}...\n`);
    }
  }
  
  console.log('❌ No models worked. Check your API key.');
}

testNewKey();