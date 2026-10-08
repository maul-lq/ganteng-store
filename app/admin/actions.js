"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

export async function loginAdmin(prevStateOrFormData, formData) {
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

export { loginAdmin as login };

export async function logoutAdmin() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export { logoutAdmin as logout, logoutAdmin as keluar };

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

export { gantiPassword as ubahPassword, gantiPassword as updatePassword };
