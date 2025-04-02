import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '', // 请确保使用了正确的API Key
  baseURL: 'https://api.bianxie.ai', // 你之前选择的BASE_URL
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;
    if (!query) {
      return NextResponse.json({ result: '请提供查询内容。' }, { status: 400 });
    }

    // 请求OpenAI API生成聊天响应
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // 这里是您使用的模型
      messages: [
        {
          role: 'system',
          content: '你是一个B2B智能助手，帮助用户理解业务需求，并推荐相关的企业、展会或园区。',
        },
        { role: 'user', content: query },
      ],
      temperature: 0.5,
    });

    const result = completion.choices[0]?.message?.content || '未找到相关内容。';
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('[OpenAI Error]', error);
    return NextResponse.json(
      { result: '服务器错误，请稍后再试。', error: error?.message || '未知错误' },
      { status: 500 }
    );
  }
}

