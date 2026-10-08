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

