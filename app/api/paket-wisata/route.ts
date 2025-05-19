// app/api/paket-wisata/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET() {
  const data = await prisma.paket_wisata.findMany()
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const created = await prisma.paket_wisata.create({
      data: {
        nama_paket: body.nama_paket,
        deskripsi: body.deskripsi,
        fasilitas: body.fasilitas,
        harga_per_pack: body.harga_per_pack,
        foto1: body.foto1,
        foto2: body.foto2,
        foto3: body.foto3,
        foto4: body.foto4,
        foto5: body.foto5,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 400 })
  }
}
