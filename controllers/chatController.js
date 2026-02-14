const { HfInference } = require('@huggingface/inference');
const Chat = require('../models/Chat');

// Initialize Hugging Face
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// @desc    Send message and get AI response
// @route   POST /api/chat/message
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Generate session ID if not provided
    const chatSessionId = sessionId || generateSessionId();

    // Find or create chat session
    let chat = await Chat.findOne({ sessionId: chatSessionId, userId });

    if (!chat) {
      chat = new Chat({
        userId,
        sessionId: chatSessionId,
        messages: []
      });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    // Build conversation history for chat completion
    const conversationHistory = chat.messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Get AI response using chat completion
    const response = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.2-3B-Instruct',
      messages: conversationHistory,
      max_tokens: 500,
      temperature: 0.7
    });

    const aiResponse = response.choices[0].message.content;

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });

    // Generate title if it's the first message
    if (chat.messages.length === 2) {
      chat.generateTitle();
    }

    await chat.save();

    res.status(200).json({
      success: true,
      data: {
        sessionId: chatSessionId,
        message: {
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing message',
      error: error.message
    });
  }
};

// @desc    Get all chat sessions for user
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ userId })
      .select('sessionId title createdAt updatedAt')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: chats.length,
      data: chats
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat history',
      error: error.message
    });
  }
};

// @desc    Get specific chat session
// @route   GET /api/chat/session/:sessionId
// @access  Private
const getChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findOne({ sessionId, userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    console.error('Get chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching chat session',
      error: error.message
    });
  }
};

// @desc    Delete chat session
// @route   DELETE /api/chat/session/:sessionId
// @access  Private
const deleteChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findOneAndDelete({ sessionId, userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    console.error('Delete chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting chat session',
      error: error.message
    });
  }
};

// @desc    Create new chat session
// @route   POST /api/chat/new
// @access  Private
const createNewChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessionId = generateSessionId();

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        message: 'New chat session created'
      }
    });
  } catch (error) {
    console.error('Create new chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating new chat',
      error: error.message
    });
  }
};

// Helper function to generate session ID
const generateSessionId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

module.exports = {
  sendMessage,
  getChatHistory,
  getChatSession,
  deleteChatSession,
  createNewChat
};