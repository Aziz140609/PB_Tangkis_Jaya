"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── Auth ───────────────────────────────────────────────

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

// ─── Tournaments ────────────────────────────────────────

export type Tournament = {
  id: string;
  title: string;
  event_date: string;
  poster_url: string;
  terms: string;
  status: string;
  created_at: string;
};

export async function getTournaments(): Promise<Tournament[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .order("status", { ascending: true })
      .order("event_date", { ascending: false });

    return data ?? [];
  } catch {
    return [];
  }
}

export async function getTournamentCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("tournaments")
      .select("*", { count: "exact", head: true })
      .eq("status", "aktif");
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function createTournament(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const event_date = formData.get("event_date") as string;
  const terms = formData.get("terms") as string;
  const status = (formData.get("status") as string) || "aktif";
  const posterFile = formData.get("poster") as File | null;

  let poster_url = formData.get("existing_poster_url") as string | null;

  if (posterFile && posterFile.size > 0) {
    const fileName = `${Date.now()}-${posterFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("tournament-posters")
      .upload(fileName, posterFile);

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from("tournament-posters")
      .getPublicUrl(fileName);

    poster_url = urlData.publicUrl;
  }

  if (!poster_url) {
    return { error: "Poster wajib diupload" };
  }

  const { error } = await supabase.from("tournaments").insert({
    title,
    event_date,
    poster_url,
    terms,
    status,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/turnamen");
  return { success: true };
}

export async function updateTournament(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const event_date = formData.get("event_date") as string;
  const terms = formData.get("terms") as string;
  const status = (formData.get("status") as string) || "aktif";
  const posterFile = formData.get("poster") as File | null;

  let poster_url = formData.get("existing_poster_url") as string | null;

  if (posterFile && posterFile.size > 0) {
    const fileName = `${Date.now()}-${posterFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("tournament-posters")
      .upload(fileName, posterFile);

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from("tournament-posters")
      .getPublicUrl(fileName);

    poster_url = urlData.publicUrl;
  }

  if (!poster_url) {
    return { error: "Poster wajib diupload" };
  }

  const { error } = await supabase
    .from("tournaments")
    .update({ title, event_date, poster_url, terms, status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/turnamen");
  return { success: true };
}

export async function deleteTournament(id: string) {
  const supabase = await createClient();

  // Get poster URL to remove from storage
  const { data: tournament } = await supabase
    .from("tournaments")
    .select("poster_url")
    .eq("id", id)
    .single();

  if (tournament?.poster_url) {
    // Extract file path from URL
    const urlParts = tournament.poster_url.split("/tournament-posters/");
    if (urlParts[1]) {
      await supabase.storage.from("tournament-posters").remove([urlParts[1]]);
    }
  }

  const { error } = await supabase.from("tournaments").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/turnamen");
  return { success: true };
}

// ─── Gallery Photos ─────────────────────────────────────

export type GalleryPhoto = {
  id: string;
  image_url: string;
  caption: string;
  event_date: string | null;
  created_at: string;
};

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false });

    return data ?? [];
  } catch {
    return [];
  }
}

export async function getGalleryCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("gallery_photos")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function createGalleryPhoto(formData: FormData) {
  const supabase = await createClient();

  const caption = formData.get("caption") as string;
  const event_date = (formData.get("event_date") as string) || null;
  const imageFile = formData.get("image") as File | null;

  if (!imageFile || imageFile.size === 0) {
    return { error: "Gambar wajib diupload" };
  }

  const fileName = `${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("gallery-photos")
    .upload(fileName, imageFile);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data: urlData } = supabase.storage
    .from("gallery-photos")
    .getPublicUrl(fileName);

  const { error } = await supabase.from("gallery_photos").insert({
    image_url: urlData.publicUrl,
    caption,
    event_date,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/galeri");
  return { success: true };
}

export async function deleteGalleryPhoto(id: string) {
  const supabase = await createClient();

  // Get image URL to remove from storage
  const { data: photo } = await supabase
    .from("gallery_photos")
    .select("image_url")
    .eq("id", id)
    .single();

  if (photo?.image_url) {
    const urlParts = photo.image_url.split("/gallery-photos/");
    if (urlParts[1]) {
      await supabase.storage.from("gallery-photos").remove([urlParts[1]]);
    }
  }

  const { error } = await supabase
    .from("gallery_photos")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/galeri");
  return { success: true };
}
