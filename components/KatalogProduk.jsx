"use client";

import { useState, useMemo } from "react";
import KartuProduk from "@/components/KartuProduk";

export default function KatalogProduk({ daftarProduk = [] }) {
  const [query, setQuery] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const kategoriList = useMemo(() => {
    const setKat = new Set();
    daftarProduk.forEach((p) => {
      if (p.kategori) setKat.add(p.kategori);
    });
    return ["Semua", ...Array.from(setKat)];
  }, [daftarProduk]);

  const produkTersaring = useMemo(() => {
    const q = query.trim().toLowerCase();
    return daftarProduk.filter((produk) => {
      const cocokKategori =
        kategoriAktif === "Semua" || produk.kategori === kategoriAktif;
      const cocokCari =
        !q ||
        produk.nama?.toLowerCase().includes(q) ||
        produk.deskripsi?.toLowerCase().includes(q);
      return cocokKategori && cocokCari;
    });
  }, [daftarProduk, query, kategoriAktif]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full rounded-xl border border-garis bg-latar px-4 py-2.5 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
        </div>

        {kategoriList.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {kategoriList.map((kat) => (
              <button
                key={kat}
                type="button"
                onClick={() => setKategoriAktif(kat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  kategoriAktif === kat
                    ? "bg-utama text-white"
                    : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                }`}
              >
                {kat}
              </button>
            ))}
          </div>
        )}
      </div>

      {produkTersaring.length === 0 ? (
        <div className="py-12 text-center text-teks-lembut">
          <p className="font-semibold">Tidak ada produk yang cocok</p>
          <p className="mt-1 text-sm">Coba kata kunci atau kategori lain</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {produkTersaring.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}

