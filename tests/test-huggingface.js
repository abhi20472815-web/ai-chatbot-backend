const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function testHF() {
  try {
    console.log('Testing Hugging Face API...\n');
    
    const response = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.2-3B-Instruct',
      messages: [
        { role: 'user', content: 'Hello! Who are you?' }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    console.log('✅ SUCCESS!\n');
    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  }
}

testHF();