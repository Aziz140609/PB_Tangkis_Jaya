"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createTournament,
  updateTournament,
  getTournaments,
} from "@/actions";

export default function TambahTurnamenPage() {
  return (
    <Suspense>
      <TambahTurnamenForm />
    </Suspense>
  );
}

function TambahTurnamenForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [terms, setTerms] = useState("");
  const [status, setStatus] = useState("aktif");
  const [existingPosterUrl, setExistingPosterUrl] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editId) {
      getTournaments().then((tournaments) => {
        const t = tournaments.find((t) => t.id === editId);
        if (t) {
          setTitle(t.title);
          setEventDate(t.event_date);
          setTerms(t.terms);
          setStatus(t.status);
          setExistingPosterUrl(t.poster_url);
          setPosterPreview(t.poster_url);
        }
      });
    }
  }, [editId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPosterPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.set("title", title);
    formData.set("event_date", eventDate);
    formData.set("terms", terms);
    formData.set("status", status);
    formData.set("existing_poster_url", existingPosterUrl);
    if (posterFile) formData.set("poster", posterFile);

    const result = editId
      ? await updateTournament(editId, formData)
      : await createTournament(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/turnamen");
    }
  };

  return (
    <>
      {/* Top Nav */}
      <header className="flex justify-between items-center h-16 px-6 bg-surface border-b border-surface-border z-10 sticky top-0 w-full shrink-0">
        <span className="text-headline-md font-headline-md text-on-surface font-bold">
          {editId ? "Edit Turnamen" : "Tambah Turnamen"}
        </span>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full text-text-muted hover:bg-surface-container-low transition-colors duration-100 active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-surface p-container-padding">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-headline-xl text-headline-xl text-text-main mb-2">
              {editId ? "Edit Turnamen" : "Tambah Turnamen"}
            </h2>
            <p className="text-text-muted font-body-md text-body-md">
              {editId
                ? "Perbarui data turnamen yang sudah ada."
                : "Buat entri turnamen baru untuk jadwal klub PB Tangkis Jaya."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-error-container border border-error/20 rounded text-error text-sm font-body-md">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-surface-container-lowest border border-surface-border rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left: Input Fields */}
              <div className="lg:col-span-7 p-8 border-b lg:border-b-0 lg:border-r border-surface-border flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Judul Turnamen
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-text-main placeholder:text-outline-variant"
                    placeholder="Contoh: PB Tangkis Jaya Open 2024"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Tanggal Pelaksanaan
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-text-main appearance-none"
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                      calendar_month
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-text-main"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="aktif">Aktif</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Ketentuan & Peraturan
                  </label>
                  <textarea
                    className="w-full h-full min-h-[160px] px-4 py-3 rounded-lg border border-surface-border bg-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md text-text-main resize-y placeholder:text-outline-variant"
                    placeholder="Masukkan syarat pendaftaran, sistem pertandingan, dll..."
                    required
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                  />
                </div>
              </div>

              {/* Right: Poster Upload */}
              <div className="lg:col-span-5 p-8 bg-surface-container-low flex flex-col items-center justify-center">
                <div className="w-full max-w-[280px]">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-3 block text-center">
                    Upload Poster
                  </label>
                  <div
                    className="relative group cursor-pointer aspect-[3/4] w-full rounded-xl border-2 border-dashed border-outline-variant hover:border-primary transition-colors bg-surface-container-lowest overflow-hidden flex flex-col items-center justify-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {posterPreview ? (
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-primary-container text-primary-fixed flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                          <span className="material-symbols-outlined">
                            cloud_upload
                          </span>
                        </div>
                        <p className="font-headline-md text-headline-md text-primary drop-shadow-sm text-center">
                          Upload Poster
                        </p>
                        <p className="font-label-md text-label-md text-on-surface-variant mt-1 text-center">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-5 border-t border-surface-border bg-surface-container-lowest flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg border border-outline text-text-main font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-on-primary-fixed transition-colors shadow-sm disabled:opacity-50"
              >
                {loading
                  ? "Menyimpan..."
                  : editId
                    ? "Simpan Perubahan"
                    : "Simpan Turnamen"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
