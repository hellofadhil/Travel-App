// app/tour-packages/page.tsx
import Link from "next/link";
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/main-layout";
import prisma from "@/lib/prisma"; // langsung import prisma

interface TourPackage {
  id: string;
  nama_paket: string;
  deskripsi: string;
  fasilitas: string;
  harga_per_pack: number;
  foto1: string;
}

export default async function TourPackages() {
  // langsung query ke database via prisma
  const packages: TourPackage[] = await prisma.paket_wisata.findMany();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainLayout>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Explore Our Premium Tour Packages
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover unforgettable journeys with our expertly curated travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className="group h-full flex flex-col shadow-md hover:shadow-xl transition-all duration-300 border border-border rounded-xl overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <img
                    src={pkg.foto1}
                    alt={pkg.nama_paket}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary shadow">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(pkg.harga_per_pack)}
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <CardTitle className="text-xl font-semibold text-primary">{pkg.nama_paket}</CardTitle>
                  <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {pkg.deskripsi}
                  </CardDescription>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-foreground mb-1">Facilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.fasilitas.split(',').map((facility, i) => (
                        <span
                          key={i}
                          className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full"
                        >
                          {facility.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Button asChild className="w-full">
                      <Link href={`/tour-packages/${pkg.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
