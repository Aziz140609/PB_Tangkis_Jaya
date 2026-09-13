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

export async function updateGalleryPhoto(id: string, formData: FormData) {
  const supabase = await createClient();

  const caption = formData.get("caption") as string;
  const event_date = (formData.get("event_date") as string) || null;
  const imageFile = formData.get("image") as File | null;

  let image_url = formData.get("existing_image_url") as string | null;

  if (imageFile && imageFile.size > 0) {
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

    image_url = urlData.publicUrl;
  }

  if (!image_url) {
    return { error: "Gambar wajib diupload" };
  }

  const { error } = await supabase
    .from("gallery_photos")
    .update({ image_url, caption, event_date })
    .eq("id", id);

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

// ─── Programs ───────────────────────────────────────────

export type Program = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
};

export async function getPrograms(): Promise<Program[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getProgramCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("programs")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function createProgram(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("programs").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: (formData.get("icon") as string) || "sports_gymnastics",
    sort_order: Number(formData.get("sort_order") || 0),
    is_featured: formData.get("is_featured") === "true",
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/program");
  return { success: true };
}

export async function updateProgram(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("programs")
    .update({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: (formData.get("icon") as string) || "sports_gymnastics",
      sort_order: Number(formData.get("sort_order") || 0),
      is_featured: formData.get("is_featured") === "true",
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/program");
  return { success: true };
}

export async function deleteProgram(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("programs").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/program");
  return { success: true };
}

// ─── Locations ──────────────────────────────────────────

export type Location = {
  id: string;
  name: string;
  address: string;
  status: string;
  schedules: { day: string; time: string }[];
  sort_order: number;
  created_at: string;
};

export async function getLocations(): Promise<Location[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("locations")
      .select("*")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getLocationCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("locations")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function createLocation(formData: FormData) {
  const supabase = await createClient();

  const schedulesRaw = formData.get("schedules") as string;
  let schedules: { day: string; time: string }[] = [];
  try {
    schedules = JSON.parse(schedulesRaw);
  } catch {}

  const { error } = await supabase.from("locations").insert({
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    status: (formData.get("status") as string) || "AVAILABLE",
    schedules,
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/lokasi");
  return { success: true };
}

export async function updateLocation(id: string, formData: FormData) {
  const supabase = await createClient();

  const schedulesRaw = formData.get("schedules") as string;
  let schedules: { day: string; time: string }[] = [];
  try {
    schedules = JSON.parse(schedulesRaw);
  } catch {}

  const { error } = await supabase
    .from("locations")
    .update({
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      status: (formData.get("status") as string) || "AVAILABLE",
      schedules,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/lokasi");
  return { success: true };
}

export async function deleteLocation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("locations").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/lokasi");
  return { success: true };
}

// ─── Pricing ────────────────────────────────────────────

export type Pricing = {
  id: string;
  title: string;
  price: number;
  period: string | null;
  features: string[];
  is_popular: boolean;
  cta_text: string;
  sort_order: number;
  created_at: string;
};

export async function getPricing(): Promise<Pricing[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pricing")
      .select("*")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getPricingCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("pricing")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function createPricing(formData: FormData) {
  const supabase = await createClient();

  const featuresRaw = formData.get("features") as string;
  let features: string[] = [];
  try {
    features = JSON.parse(featuresRaw);
  } catch {}

  const { error } = await supabase.from("pricing").insert({
    title: formData.get("title") as string,
    price: Number(formData.get("price") || 0),
    period: (formData.get("period") as string) || null,
    features,
    is_popular: formData.get("is_popular") === "true",
    cta_text: (formData.get("cta_text") as string) || "Pilih Paket",
    sort_order: Number(formData.get("sort_order") || 0),
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/biaya");
  return { success: true };
}

export async function updatePricing(id: string, formData: FormData) {
  const supabase = await createClient();

  const featuresRaw = formData.get("features") as string;
  let features: string[] = [];
  try {
    features = JSON.parse(featuresRaw);
  } catch {}

  const { error } = await supabase
    .from("pricing")
    .update({
      title: formData.get("title") as string,
      price: Number(formData.get("price") || 0),
      period: (formData.get("period") as string) || null,
      features,
      is_popular: formData.get("is_popular") === "true",
      cta_text: (formData.get("cta_text") as string) || "Pilih Paket",
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/biaya");
  return { success: true };
}

export async function deletePricing(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("pricing").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/biaya");
  return { success: true };
}
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€” Coaches â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”

export type Coach = {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export async function getCoaches(): Promise<Coach[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("coaches")
      .select("*")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function createCoach(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || "Pelatih";
  const description = formData.get("description") as string;
  const sort_order = parseInt((formData.get("sort_order") as string) || "0");
  const imageFile = formData.get("image") as File | null;

  if (!imageFile || imageFile.size === 0) {
    return { error: "Foto wajib diupload" };
  }

  const fileName = `${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("coach-photos")
    .upload(fileName, imageFile);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data: urlData } = supabase.storage
    .from("coach-photos")
    .getPublicUrl(fileName);

  const { error } = await supabase.from("coaches").insert({
    name,
    role,
    description,
    sort_order,
    image_url: urlData.publicUrl,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/pelatih");
  return { success: true };
}

export async function updateCoach(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || "Pelatih";
  const description = formData.get("description") as string;
  const sort_order = parseInt((formData.get("sort_order") as string) || "0");
  const imageFile = formData.get("image") as File | null;

  let updateData: any = { name, role, description, sort_order };

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("coach-photos")
      .upload(fileName, imageFile);

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: urlData } = supabase.storage
      .from("coach-photos")
      .getPublicUrl(fileName);
      
    updateData.image_url = urlData.publicUrl;
  }

  const { error } = await supabase
    .from("coaches")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/pelatih");
  return { success: true };
}

export async function deleteCoach(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("coaches").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/pelatih");
  return { success: true };
}
