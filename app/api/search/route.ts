import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 使用新的 BASE_URL
const BASE_URL = 'https://api.bianxie.ai/v1';  // 你可以根据需求选择不同的 URL
const API_KEY = process.env.OPENAI_API_KEY || '';  // 从环境变量中获取 API Key

// 初始化 OpenAI 客户端，使用新的 BASE_URL
const openai = new OpenAI({
  apiKey: API_KEY, // 使用你的 API Key
  baseURL: BASE_URL, // 使用新的 BASE_URL
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;

    if (!query) {
      return NextResponse.json({ result: '请提供查询内容。' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 根据你的权限选择模型
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
