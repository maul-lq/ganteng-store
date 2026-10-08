"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  if (!produk) return null;

  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("Reguler");

  // Varian berdasarkan kategori produk
  const getPilihanVarian = () => {
    const kat = (produk.kategori || "").toLowerCase();
    if (kat.includes("minum")) {
      return ["Reguler", "Dingin / Es", "Hangat", "Kurang Manis"];
    }
    if (kat.includes("camilan") || kat.includes("bumbu") || kat.includes("makan")) {
      return ["Reguler", "Original", "Pedas Sedang", "Ekstra Pedas"];
    }
    return ["Reguler", "Kemasan Kado"];
  };

  const daftarVarian = getPilihanVarian();
  const totalHarga = formatRupiah(produk.harga * jumlah);

  const pesan = `Halo, saya ingin memesan ${jumlah}x ${produk.nama} (Varian: ${varian}) dengan total harga ${totalHarga}.`;
  const linkWhatsApp = `https://wa.me/${toko.nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  return (
    <div className="flex flex-col gap-4 border-t border-garis pt-4">
      {/* Pilihan Jumlah */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-teks">Jumlah</label>
        <div className="flex items-center rounded-lg border border-garis bg-latar">
          <button
            type="button"
            onClick={() => setJumlah((prev) => Math.max(1, prev - 1))}
            className="flex h-9 w-9 items-center justify-center text-base font-bold text-teks-lembut hover:text-utama"
            aria-label="Kurangi jumlah"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold text-teks">
            {jumlah}
          </span>
          <button
            type="button"
            onClick={() => setJumlah((prev) => prev + 1)}
            className="flex h-9 w-9 items-center justify-center text-base font-bold text-teks-lembut hover:text-utama"
            aria-label="Tambah jumlah"
          >
            +
          </button>
        </div>
      </div>

      {/* Pilihan Varian */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-teks">Pilihan Varian</label>
        <div className="flex flex-wrap gap-2">
          {daftarVarian.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVarian(v)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                varian === v
                  ? "bg-utama text-white"
                  : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Total dan Tombol Pesan */}
      <div className="mt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-teks-lembut">Total perkiraan:</span>
          <span className="text-base font-extrabold text-harga">{totalHarga}</span>
        </div>

        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
        >
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}
