"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  getGalleryPhotos,
  createGalleryPhoto,
  deleteGalleryPhoto,
  type GalleryPhoto,
} from "@/actions";

export default function AdminGaleriPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Add form state
  const [caption, setCaption] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getGalleryPhotos().then(setPhotos);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.set("caption", caption);
    formData.set("event_date", eventDate);
    if (imageFile) formData.set("image", imageFile);

    const result = await createGalleryPhoto(formData);

    if (result.error) {
      setFormError(result.error);
      setSubmitting(false);
    } else {
      setShowAddModal(false);
      setCaption("");
      setEventDate("");
      setImageFile(null);
      setImagePreview("");
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      const updated = await getGalleryPhotos();
      setPhotos(updated);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteGalleryPhoto(deleteId);
    if (result.success) {
      setPhotos((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    }
    setDeleting(false);
  };

  const formatDate = (d: string | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Top Nav */}
      <header className="flex justify-between items-center h-16 px-6 bg-surface border-b border-surface-border shrink-0 z-10">
        <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
          Galeri Juara
        </h1>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-container-low hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-container-padding">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Action Bar */}
          <div className="flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-surface-border shadow-sm">
            <span className="font-body-md text-body-md text-text-muted">
              Kelola dokumentasi kemenangan dan prestasi club.
            </span>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-label-md text-label-md shadow-sm active:scale-95 duration-100"
            >
              <span className="material-symbols-outlined text-[18px]">
                add
              </span>
              Tambah Foto
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="gallery-card group relative bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-border shadow-sm hover:shadow-md transition-shadow aspect-square flex flex-col"
              >
                <div className="relative flex-1 overflow-hidden">
                  <img
                    src={photo.image_url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <button
                    onClick={() => setDeleteId(photo.id)}
                    className="delete-btn absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm p-2 rounded-full text-error hover:bg-error hover:text-on-error shadow-sm focus:outline-none"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-headline-md text-headline-md text-white drop-shadow-md truncate">
                      {photo.caption}
                    </h3>
                    <p className="font-label-sm text-label-sm text-white/80 mt-1">
                      {formatDate(photo.event_date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state: Upload placeholder */}
            <button
              onClick={() => setShowAddModal(true)}
              className="group relative bg-surface-container-low rounded-xl overflow-hidden border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary-fixed-dim/20 transition-colors aspect-square flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex flex-col items-center text-text-muted group-hover:text-primary transition-colors p-6 text-center">
                <span className="material-symbols-outlined text-[48px] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  add_photo_alternate
                </span>
                <span className="font-headline-md text-headline-md font-medium">
                  Unggah Foto Baru
                </span>
                <span className="font-label-md text-label-md mt-2 opacity-70">
                  Klik untuk menambah foto
                </span>
              </div>
            </button>
          </div>

          {photos.length === 0 && (
            <p className="text-center text-text-muted font-body-md py-8">
              Belum ada foto di galeri.
            </p>
          )}
        </div>
      </main>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-on-background/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-border flex flex-col">
            <div className="p-6 border-b border-surface-border flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Tambah Foto
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setCaption("");
                  setEventDate("");
                  setImageFile(null);
                  setImagePreview("");
                  setFormError("");
                }}
                className="text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col">
              <div className="p-6 flex flex-col gap-6">
                {formError && (
                  <div className="p-3 bg-error-container border border-error/20 rounded text-error text-sm font-body-md">
                    {formError}
                  </div>
                )}

                {/* Upload */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Upload Foto
                  </label>
                  <div
                    className="border-2 border-dashed border-outline-variant rounded-lg p-8 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-40 rounded object-contain"
                      />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-3 group-hover:bg-primary-fixed transition-colors">
                          <span className="material-symbols-outlined text-text-muted group-hover:text-primary">
                            cloud_upload
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface font-medium text-center">
                          Klik untuk upload atau drag & drop
                        </p>
                        <p className="font-body-md text-body-md text-text-muted text-sm text-center mt-1">
                          PNG, JPG (max. 5MB)
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Judul/Caption
                  </label>
                  <input
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    placeholder="Masukkan judul foto"
                    type="text"
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Tanggal
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow pl-10"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted text-[20px]">
                      calendar_today
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-2 flex justify-end gap-3 bg-surface-container-low rounded-b-xl">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setCaption("");
                    setEventDate("");
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="px-4 py-2 rounded-md font-label-md text-label-md text-on-surface bg-surface-container-highest hover:bg-surface-variant transition-colors border border-surface-border"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md font-label-md text-label-md text-on-primary bg-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-on-background/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-surface-border flex flex-col">
            <div className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-error-container flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-error text-[32px]">
                  delete_forever
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Konfirmasi Hapus
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Yakin ingin menghapus foto ini? Tindakan ini tidak dapat
                dibatalkan.
              </p>
            </div>
            <div className="p-6 pt-2 flex flex-col gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="w-full px-4 py-2.5 rounded-md font-label-md text-label-md text-on-error bg-error hover:bg-on-error-container transition-colors text-center disabled:opacity-50"
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="w-full px-4 py-2.5 rounded-md font-label-md text-label-md text-on-surface bg-surface-container-highest hover:bg-surface-variant transition-colors border border-surface-border text-center"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      <div
        className={`fixed bottom-6 right-6 bg-surface-container-lowest border border-success/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg p-4 flex items-center gap-3 transition-all duration-300 z-50 ${
          showToast
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-success text-[18px]">
            check_circle
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-md text-headline-md text-on-surface">
            Berhasil
          </span>
          <span className="font-body-md text-body-md text-text-muted">
            Foto berhasil disimpan!
          </span>
        </div>
        <button
          onClick={() => setShowToast(false)}
          className="ml-4 text-text-muted hover:text-on-surface focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </>
  );
}
