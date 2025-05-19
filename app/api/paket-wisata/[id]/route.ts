// app/api/paket-wisata/[id]/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(_: Request, { params }: { params: { id: string } }) {
  const data = await prisma.paket_wisata.findUnique({
    where: { id: params.id },
  })
  return data
    ? NextResponse.json(data)
    : NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  try {
    const updated = await prisma.paket_wisata.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.paket_wisata.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Deleted' })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 400 })
  }
}
