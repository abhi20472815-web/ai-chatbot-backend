const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const modelsToTry = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
  'models/gemini-pro',
  'models/gemini-1.5-pro',
  'models/gemini-1.5-flash'
];

async function testModel(modelName) {
  try {
    console.log(`\nTrying: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hello!');
    const response = result.response;
    const text = response.text();
    console.log(`✅ SUCCESS with ${modelName}`);
    console.log(`Response: ${text}`);
    return modelName;
  } catch (error) {
    console.log(`❌ Failed: ${error.message.substring(0, 80)}`);
    return null;
  }
}

async function findWorkingModel() {
  console.log('Testing all models...\n');
  
  for (const modelName of modelsToTry) {
    const working = await testModel(modelName);
    if (working) {
      console.log(`\n\n🎉 USE THIS MODEL: ${working}`);
      return;
    }
  }
  
  console.log('\n❌ No working models found. Your API key might have restrictions.');
}

findWorkingModel();