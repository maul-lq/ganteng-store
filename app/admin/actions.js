"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSessionClient } from "@/lib/supabase/session";

export async function login(prevStateOrFormData, formData) {
  const data = formData instanceof FormData ? formData : prevStateOrFormData;
  const email = String(data?.get?.("email") || "").trim();
  const password = String(data?.get?.("password") || "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email atau password salah."
          : error.message || "Gagal masuk. Periksa kembali email dan password.",
    };
  }

  redirect("/admin");
}

export async function loginAdmin(prevStateOrFormData, formData) {
  return login(prevStateOrFormData, formData);
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function logoutAdmin() {
  return logout();
}

export async function gantiPassword(prevStateOrFormData, formData) {
  const data = formData instanceof FormData ? formData : prevStateOrFormData;
  const passwordBaru = String(data?.get?.("password_baru") || "");
  const konfirmasiPassword = String(data?.get?.("konfirmasi_password") || "");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama dengan password baru." };
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Anda belum masuk atau sesi telah berakhir." };
  }

  const { error } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (error) {
    return {
      error: error.message || "Gagal mengganti password.",
    };
  }

  return { success: "Password berhasil diganti." };
}

export async function tambahProduk(prevStateOrFormData, formData) {
  const data = formData instanceof FormData ? formData : prevStateOrFormData;
  const nama = String(data?.get?.("nama") || "").trim();
  const hargaStr = data?.get?.("harga");
  const kategori = String(data?.get?.("kategori") || "").trim();
  const fotoUrl = String(data?.get?.("foto_url") || "").trim();
  const deskripsi = String(data?.get?.("deskripsi") || "").trim();

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  const harga = parseInt(hargaStr, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga produk harus berupa angka valid dan tidak boleh negatif." };
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Anda belum masuk atau sesi telah berakhir." };
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori: kategori || null,
    foto_url: fotoUrl || null,
    deskripsi: deskripsi || null,
  });

  if (error) {
    return { error: error.message || "Gagal menambah produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(prevStateOrFormData, formData) {
  const data = formData instanceof FormData ? formData : prevStateOrFormData;
  const id = data?.get?.("id");
  const nama = String(data?.get?.("nama") || "").trim();
  const hargaStr = data?.get?.("harga");
  const kategori = String(data?.get?.("kategori") || "").trim();
  const fotoUrl = String(data?.get?.("foto_url") || "").trim();
  const deskripsi = String(data?.get?.("deskripsi") || "").trim();

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }

  const harga = parseInt(hargaStr, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga produk harus berupa angka valid dan tidak boleh negatif." };
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Anda belum masuk atau sesi telah berakhir." };
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori: kategori || null,
      foto_url: fotoUrl || null,
      deskripsi: deskripsi || null,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message || "Gagal mengubah produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const id = formData instanceof FormData ? formData.get("id") : formData;

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Anda belum masuk atau sesi telah berakhir." };
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    return { error: error.message || "Gagal menghapus produk." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
