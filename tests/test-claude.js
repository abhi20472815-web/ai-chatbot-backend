const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function testClaude() {
  try {
    console.log('Testing Claude API...\n');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: 'Say hello and introduce yourself!' }
      ]
    });

    console.log('✅ SUCCESS! Claude API is working!\n');
    console.log('Response:', message.content[0].text);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.status === 401) {
      console.error('\n⚠️ Your API key is invalid. Please check it.');
    }
  }
}

testClaude();