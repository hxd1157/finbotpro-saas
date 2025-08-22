import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { title, prompt } = await req.json()
    const mock = `# ${title}\n\nPrompt: ${prompt}\n\nThis is a placeholder. Wire up OPENAI_API_KEY to generate real memos.`
    return NextResponse.json({ output: mock })
  } catch (e:any) {
    return NextResponse.json({ error: e?.message || 'error' }, { status: 400 })
  }
}
