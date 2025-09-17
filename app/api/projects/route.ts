import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const projects = await prisma.project.findMany({ take: 20, orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ projects })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { organizationId, ownerId, name } = body
  if (!organizationId || !ownerId || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const project = await prisma.project.create({ data: { organizationId, ownerId, name } })
  return NextResponse.json({ project })
}
