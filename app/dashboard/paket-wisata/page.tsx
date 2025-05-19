"use client"

import * as React from "react"
import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppSidebar } from "@/components/app-sidebar"
import DataTable from "@/components/data-table"

type PaketWisata = {
  id: string
  nama_paket: string
  deskripsi: string
  fasilitas: string
  harga_per_pack: number
  foto1?: string
  foto2?: string
  foto3?: string
  foto4?: string
  foto5?: string
  created_at: string
  updated_at: string
}

export default function Page() {
  const [data, setData] = useState<PaketWisata[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/paket-wisata")
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error("Gagal memuat data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo<ColumnDef<PaketWisata>[]>(() => [
    {
      accessorKey: "nama_paket",
      header: "Nama Paket",
    },
    {
      accessorKey: "harga_per_pack",
      header: "Harga",
      cell: ({ row }) => {
        const harga = row.getValue("harga_per_pack") as number
        return <div>Rp {harga.toLocaleString("id-ID")}</div>
      },
    },
    {
      accessorKey: "fasilitas",
      header: "Fasilitas",
    },
    {
      accessorKey: "created_at",
      header: "Dibuat",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{date.toLocaleDateString("id-ID")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const paket = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(paket.id)}
              >
                Salin ID Paket
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/dashboard/paket-wisata/edit/${paket.id}`)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Paket Wisata</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Daftar Paket Wisata</h1>
            <Button onClick={() => router.push("/dashboard/paket-wisata/create")}>
              Tambah Paket
            </Button>
          </div>
          <div className="flex-1 rounded-xl bg-muted/50 p-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <DataTable
                columns={columns}
                data={data}
                searchKey="nama_paket"
                showColumnVisibility={true}
                showRowSelection={true}
                showPagination={true}
                defaultPageSize={5}
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
