"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import DashboardLayout from "@/components/layout-dashboard"

 function CreatePaketWisata() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nama_paket: "",
    deskripsi: "",
    fasilitas: "",
    harga_per_pack: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/paket-wisata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        harga_per_pack: parseInt(formData.harga_per_pack),
      }),
    })

    if (res.ok) {
      router.push("/paket-wisata")
    } else {
      alert("Gagal membuat paket.")
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Tambah Paket Wisata</h1>
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
        <Button type="submit" className="mt-2">Simpan</Button>
      </form>
    </>
  )
}

export default function Page() {
    return (
        <DashboardLayout breadcrumbTitle="Create Paket" breadcrumbParent="Paket Wisata" breadcrumbLink="/dashboard/paket-wisata">
            <CreatePaketWisata />
        </DashboardLayout>
    )
}