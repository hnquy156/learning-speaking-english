require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createChat = async (data) => {
  if (!data?.length) throw new Error('No messages');
  const messages = data.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  messages.unshift({
    role: 'system',
    content:
      'you are a people, you will respond messages of this user shortly, precisely. In addition, You have to ask them questions related to this conversation or suggest them to give some other questions about this conversation',
  });

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    max_tokens: 256,
  });
  return chatCompletion.choices[0].message;
};

module.exports = {
  createChat,
};
