"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getCoaches,
  createCoach,
  updateCoach,
  deleteCoach,
  type Coach,
} from "@/actions";

export default function AdminPelatihPage() {
  const router = useRouter();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Coach | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Pelatih");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCoaches().then(setCoaches);
  }, []);

  const resetForm = () => {
    setName("");
    setRole("Pelatih");
    setDescription("");
    setSortOrder("0");
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormError("");
    setEditItem(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (p: Coach) => {
    setEditItem(p);
    setName(p.name);
    setRole(p.role);
    setDescription(p.description);
    setSortOrder(String(p.sort_order));
    setImagePreview(p.image_url);
    setImageFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("role", role);
    formData.set("description", description);
    formData.set("sort_order", sortOrder);
    if (imageFile) {
      formData.set("image", imageFile);
    }

    const result = editItem
      ? await updateCoach(editItem.id, formData)
      : await createCoach(formData);

    if (result.error) {
      setFormError(result.error);
      setSubmitting(false);
    } else {
      setShowModal(false);
      resetForm();
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      const updated = await getCoaches();
      setCoaches(updated);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteCoach(deleteId);
    if (result.success) {
      setCoaches((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    }
    setDeleting(false);
  };

  return (
    <>
      <header className="bg-surface border-b border-surface-border flex justify-between items-center h-16 px-6 shrink-0 z-10 w-full">
        <h2 className="font-headline-md font-headline-md text-primary font-bold border-b-2 border-primary pb-1">
          Pelatih
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-text-muted hover:bg-surface-container-low transition-colors duration-100 hover:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-background p-container-padding">
        <div className="flex justify-between items-center mb-6">
          <span className="font-body-md text-body-md text-text-muted">
            Kelola data pelatih di klub ini.
          </span>
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-sm font-label-md text-label-md uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Pelatih
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-lg border border-surface-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-border font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-6 w-20 text-center">Foto</th>
                <th className="py-3 px-6">Nama</th>
                <th className="py-3 px-6">Posisi / Role</th>
                <th className="py-3 px-6 w-20 text-center">Urutan</th>
                <th className="py-3 px-6 w-32 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {coaches.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-text-muted font-body-md"
                  >
                    Belum ada pelatih.
                  </td>
                </tr>
              ) : (
                coaches.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-surface-bright transition-colors group"
                  >
                    <td className="py-3 px-6 text-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mx-auto bg-surface relative">
                        <img src={p.image_url} alt={p.name} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className="py-3 px-6 font-headline-md text-headline-md text-on-surface">
                      {p.name}
                    </td>
                    <td className="py-3 px-6 font-body-md text-body-md text-on-surface-variant">
                      {p.role}
                    </td>
                    <td className="py-3 px-6 text-center font-body-md text-on-surface-variant">
                      {p.sort_order}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 text-secondary hover:text-primary transition-colors rounded hover:bg-surface-container-low"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-1.5 text-secondary hover:text-error transition-colors rounded hover:bg-error-container"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-on-background/40 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-border flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-surface-border flex justify-between items-center shrink-0">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {editItem ? "Edit Pelatih" : "Tambah Pelatih"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-outline hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
              <div className="p-6 flex flex-col gap-5">
                {formError && (
                  <div className="p-3 bg-error-container border border-error/20 rounded text-error text-sm font-body-md">
                    {formError}
                  </div>
                )}
                
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Foto Pelatih
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-surface-border rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-low transition-colors hover:border-primary relative overflow-hidden"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[32px] text-primary">add_a_photo</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Klik untuk upload foto</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Nama Pelatih
                  </label>
                  <input
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Posisi / Role (Misal: Head Coach)
                  </label>
                  <input
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Deskripsi / Bio Singkat
                  </label>
                  <textarea
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow resize-none"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Urutan
                  </label>
                  <input
                    type="number"
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-6 pt-2 flex justify-end gap-3 bg-surface-container-low shrink-0 rounded-b-xl border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
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
                Yakin ingin menghapus pelatih ini? Tindakan ini tidak dapat dibatalkan.
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

      <div
        className={`fixed bottom-6 right-6 bg-surface-container-lowest border border-success/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg p-4 flex items-center gap-3 transition-all duration-300 z-50 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
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
            Data pelatih berhasil disimpan!
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
