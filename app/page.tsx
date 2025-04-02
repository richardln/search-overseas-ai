import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 设置 BASE_URL 和 API Key
const BASE_URL = 'https://api.bianxie.ai/v1';  // 使用中国香港的服务器
const API_KEY = process.env.OPENAI_API_KEY || '';  // 从环境变量中获取 API Key

// 初始化 OpenAI 客户端，传入新的 BASE_URL
const openai = new OpenAI({
  apiKey: API_KEY,  // 使用你的 API Key
  baseURL: BASE_URL,  // 使用新的 BASE_URL
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query;  // 获取用户的查询内容

    // 如果没有查询内容，返回错误信息
    if (!query) {
      return NextResponse.json({ result: '请提供查询内容。' }, { status: 400 });
    }

    // 使用 OpenAI 的 Chat API 进行查询
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // 使用 gpt-3.5-turbo 模型
      messages: [
        {
          role: 'system',
          content: '你是一个B2B智能助手，帮助用户理解业务需求，并推荐相关的企业、展会或园区。',
        },
        { role: 'user', content: query },  // 用户的查询
      ],
      temperature: 0.5,  // 设置返回结果的随机性
    });

    // 获取模型的响应并返回
    const result = completion.choices[0]?.message?.content || '未找到相关内容。';
    return NextResponse.json({ result });  // 返回结果

  } catch (error: any) {
    console.error('[OpenAI Error]', error);  // 捕捉并打印错误
    return NextResponse.json(
      { result: '服务器错误，请稍后再试。', error: error?.message || '未知错误' },
      { status: 500 }
    );
  }
}
