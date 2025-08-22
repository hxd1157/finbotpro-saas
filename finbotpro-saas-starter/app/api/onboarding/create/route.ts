import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orgName, projectName } = await req.json()
  if (!orgName || !projectName) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email, name: session.user.name ?? '' }
  })

  const org = await prisma.organization.create({ data: { name: orgName } })
  await prisma.membership.create({ data: { userId: user.id, organizationId: org.id, role: 'owner' } })

  await prisma.project.create({
    data: { organizationId: org.id, ownerId: user.id, name: projectName }
  })

  return NextResponse.json({ ok: true })
}
