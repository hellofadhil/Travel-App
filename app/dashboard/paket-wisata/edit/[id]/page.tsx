"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import DashboardLayout from "@/components/layout-dashboard"

function EditPaketWisata() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }

  const [formData, setFormData] = useState({
    nama_paket: "",
    deskripsi: "",
    fasilitas: "",
    harga_per_pack: "",
    foto1: "",
    foto2: "",
    foto3: "",
    foto4: "",
    foto5: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/paket-wisata/${id}`)
      if (res.ok) {
        const data = await res.json()
        setFormData({
          nama_paket: data.nama_paket || "",
          deskripsi: data.deskripsi || "",
          fasilitas: data.fasilitas || "",
          harga_per_pack: data.harga_per_pack?.toString() || "",
          foto1: data.foto1 || "",
          foto2: data.foto2 || "",
          foto3: data.foto3 || "",
          foto4: data.foto4 || "",
          foto5: data.foto5 || "",
        })
      }
    }

    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(`/api/paket-wisata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        harga_per_pack: parseInt(formData.harga_per_pack),
      }),
    })

    if (res.ok) {
      router.push("/dashboard/paket-wisata")
    } else {
      alert("Gagal mengubah paket.")
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Edit Paket Wisata</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Nama Paket</Label>
          <Input name="nama_paket" value={formData.nama_paket} onChange={handleChange} required />
        </div>
        <div>
          <Label>Deskripsi</Label>
          <Textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} required />
        </div>
        <div>
          <Label>Fasilitas</Label>
          <Textarea name="fasilitas" value={formData.fasilitas} onChange={handleChange} required />
        </div>
        <div>
          <Label>Harga per Pack</Label>
          <Input type="number" name="harga_per_pack" value={formData.harga_per_pack} onChange={handleChange} required />
        </div>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n}>
            <Label htmlFor={`foto${n}`}>URL Foto {n}</Label>
            <Input
              type="url"
              name={`foto${n}`}
              value={(formData as any)[`foto${n}`]}
              onChange={handleChange}
              placeholder={`https://example.com/foto${n}.jpg`}
            />
          </div>
        ))}
        <Button type="submit" className="mt-2">Simpan Perubahan</Button>
      </form>
    </>
  )
}

export default function Page() {
  return (
    <DashboardLayout breadcrumbTitle="Edit Paket" breadcrumbParent="Paket Wisata" breadcrumbLink="/dashboard/paket-wisata">
      <EditPaketWisata />
    </DashboardLayout>
  )
}