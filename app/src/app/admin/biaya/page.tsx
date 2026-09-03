"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getPricing,
  createPricing,
  updatePricing,
  deletePricing,
  type Pricing,
} from "@/actions";

export default function AdminBiayaPage() {
  const router = useRouter();
  const [items, setItems] = useState<Pricing[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Pricing | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [ctaText, setCtaText] = useState("Pilih Paket");
  const [sortOrder, setSortOrder] = useState("0");
  const [features, setFeatures] = useState<string[]>([""]);

  useEffect(() => {
    getPricing().then(setItems);
  }, []);

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setPeriod("");
    setIsPopular(false);
    setCtaText("Pilih Paket");
    setSortOrder("0");
    setFeatures([""]);
    setFormError("");
    setEditItem(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (p: Pricing) => {
    setEditItem(p);
    setTitle(p.title);
    setPrice(String(p.price));
    setPeriod(p.period || "");
    setIsPopular(p.is_popular);
    setCtaText(p.cta_text);
    setSortOrder(String(p.sort_order));
    setFeatures(p.features.length > 0 ? p.features : [""]);
    setShowModal(true);
  };

  const addFeature = () => setFeatures([...features, ""]);

  const removeFeature = (idx: number) =>
    setFeatures(features.filter((_, i) => i !== idx));

  const updateFeature = (idx: number, val: string) => {
    const updated = [...features];
    updated[idx] = val;
    setFeatures(updated);
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("id-ID").format(n);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    const validFeatures = features.filter((f) => f.trim());

    const formData = new FormData();
    formData.set("title", title);
    formData.set("price", price);
    formData.set("period", period);
    formData.set("is_popular", String(isPopular));
    formData.set("cta_text", ctaText);
    formData.set("sort_order", sortOrder);
    formData.set("features", JSON.stringify(validFeatures));

    const result = editItem
      ? await updatePricing(editItem.id, formData)
      : await createPricing(formData);

    if (result.error) {
      setFormError(result.error);
      setSubmitting(false);
    } else {
      setShowModal(false);
      resetForm();
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      const updated = await getPricing();
      setItems(updated);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deletePricing(deleteId);
    if (result.success) {
      setItems((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    }
    setDeleting(false);
  };

  return (
    <>
      <header className="bg-surface border-b border-surface-border flex justify-between items-center h-16 px-6 shrink-0 z-10 w-full">
        <h2 className="font-headline-md font-headline-md text-primary font-bold border-b-2 border-primary pb-1">
          Biaya Latihan
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
            Kelola paket biaya latihan yang tampil di website.
          </span>
          <button
            onClick={openAdd}
            className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-sm font-label-md text-label-md uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Paket
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-lg border border-surface-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-border font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-6">Judul</th>
                <th className="py-3 px-6">Harga</th>
                <th className="py-3 px-6">Fitur</th>
                <th className="py-3 px-6 w-24 text-center">Populer</th>
                <th className="py-3 px-6 w-32 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-text-muted font-body-md"
                  >
                    Belum ada paket biaya.
                  </td>
                </tr>
              ) : (
                items.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-surface-bright transition-colors group"
                  >
                    <td className="py-3 px-6 font-headline-md text-headline-md text-on-surface">
                      {p.title}
                    </td>
                    <td className="py-3 px-6 font-body-md text-body-md text-secondary font-bold">
                      Rp {formatPrice(p.price)}
                      {p.period && (
                        <span className="text-on-surface-variant font-normal text-sm">
                          /{p.period}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 font-body-md text-body-md text-on-surface-variant max-w-xs">
                      {p.features.slice(0, 2).join(", ")}
                      {p.features.length > 2 && ` +${p.features.length - 2}`}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {p.is_popular && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary/10 text-secondary border border-secondary/20">
                          Populer
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
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-border flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-surface-border flex justify-between items-center sticky top-0 bg-surface-container-lowest z-10">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {editItem ? "Edit Paket" : "Tambah Paket"}
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
                    Judul Paket
                  </label>
                  <input
                    className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="cth: Pendaftaran / Iuran Bulanan (Reguler)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="350000"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                      Periode (opsional)
                    </label>
                    <input
                      className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      placeholder="bln"
                    />
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
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
                      Teks Tombol
                    </label>
                    <input
                      className="w-full bg-surface border border-surface-border rounded-md px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Tandai sebagai Populer (highlight)
                    </span>
                  </label>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-label-md text-label-md text-on-surface-variant">
                      Fitur
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-primary font-label-sm text-label-sm flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add
                      </span>
                      Tambah Fitur
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {features.map((f, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          className="flex-1 bg-surface border border-surface-border rounded-md px-3 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
                          placeholder="cth: Latihan 2x Seminggu"
                          value={f}
                          onChange={(e) => updateFeature(idx, e.target.value)}
                        />
                        {features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="p-1 text-error hover:bg-error-container rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              close
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
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
                Yakin ingin menghapus paket ini? Tindakan ini tidak dapat
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
            Paket biaya berhasil disimpan!
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
