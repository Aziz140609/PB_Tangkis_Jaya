"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  type Program,
} from "@/actions";

const ICON_OPTIONS = [
  "sports_gymnastics",
  "fitness_center",
  "sports_score",
  "workspace_premium",
  "sports_tennis",
  "directions_run",
  "emoji_events",
  "military_tech",
];

export default function AdminProgramPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Program | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("sports_gymnastics");
  const [sortOrder, setSortOrder] = useState("0");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    getPrograms().then(setPrograms);
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIcon("sports_gymnastics");
    setSortOrder("0");
    setIsFeatured(false);
    setFormError("");
    setEditItem(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (p: Program) => {
    setEditItem(p);
    setTitle(p.title);
    setDescription(p.description);
    setIcon(p.icon);
    setSortOrder(String(p.sort_order));
    setIsFeatured(p.is_featured);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("description", description);
    formData.set("icon", icon);
    formData.set("sort_order", sortOrder);
    formData.set("is_featured", String(isFeatured));

    const result = editItem
      ? await updateProgram(editItem.id, formData)
      : await createProgram(formData);

    if (result.error) {
      setFormError(result.error);
      setSubmitting(false);
    } else {
      setShowModal(false);
      resetForm();
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      const updated = await getPrograms();
      setPrograms(updated);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteProgram(deleteId);
    if (result.success) {
      setPrograms((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    }
    setDeleting(false);
  };

  return (
    <>
      <header className="bg-surface border-b border-surface-border flex justify-between items-center h-16 px-6 shrink-0 z-10 w-full">
        <h2 className="font-headline-md font-headline-md text-primary font-bold border-b-2 border-primary pb-1">
          Program Latihan
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
            Kelola program latihan yang tampil di website.
          </span>
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-sm font-label-md text-label-md uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Program
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-lg border border-surface-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-border font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-6 w-16 text-center">Icon</th>
                <th className="py-3 px-6">Judul</th>
                <th className="py-3 px-6">Deskripsi</th>
                <th className="py-3 px-6 w-20 text-center">Urutan</th>
                <th className="py-3 px-6 w-24 text-center">Unggulan</th>
                <th className="py-3 px-6 w-32 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {programs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-text-muted font-body-md"
                  >
                    Belum ada program latihan.
                  </td>
                </tr>
              ) : (
                programs.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-surface-bright transition-colors group"
                  >
                    <td className="py-3 px-6 text-center">
                      <span className="material-symbols-outlined text-primary">
                        {p.icon}
                      </span>
                    </td>
                    <td className="py-3 px-6 font-headline-md text-headline-md text-on-surface">
                      {p.title}
                    </td>
                    <td className="py-3 px-6 font-body-md text-body-md text-on-surface-variant max-w-xs truncate">
                      {p.description}
                    </td>
                    <td className="py-3 px-6 text-center font-body-md text-on-surface-variant">
                      {p.sort_order}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {p.is_featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary border border-secondary/20">
                          Unggulan
                        </span>
                      )}
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
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-border flex flex-col">
            <div className="p-6 border-b border-surface-border flex justify-between items-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {editItem ? "Edit Program" : "Tambah Program"}
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
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="p-6 flex flex-col gap-5">
                {formError && (
                  <div className="p-3 bg-error-container border border-error/20 rounded text-error text-sm font-body-md">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Judul Program
                  </label>
                  <input
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                    Deskripsi
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
                    Icon
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.map((ic) => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setIcon(ic)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors ${
                          icon === ic
                            ? "border-primary bg-primary-container text-primary"
                            : "border-surface-border text-on-surface-variant hover:border-primary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {ic}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        Unggulan (highlight)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-2 flex justify-end gap-3 bg-surface-container-low rounded-b-xl">
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
                Yakin ingin menghapus program ini? Tindakan ini tidak dapat
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
            Program berhasil disimpan!
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
