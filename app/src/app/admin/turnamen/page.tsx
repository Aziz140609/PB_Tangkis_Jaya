"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getTournaments,
  deleteTournament,
  type Tournament,
} from "@/actions";

export default function AdminTurnamenPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getTournaments().then(setTournaments);
  }, []);

  const filtered = tournaments.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const result = await deleteTournament(deleteId);
    if (result.success) {
      setTournaments((prev) => prev.filter((t) => t.id !== deleteId));
      setDeleteId(null);
      router.refresh();
    }
    setDeleting(false);
  };

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Top Nav */}
      <header className="bg-surface border-b border-surface-border flex justify-between items-center h-16 px-6 shrink-0 z-10 w-full">
        <h2 className="font-headline-md font-headline-md text-primary font-bold border-b-2 border-primary pb-1">
          Turnamen & Event
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-text-muted hover:bg-surface-container-low transition-colors duration-100 hover:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-background p-container-padding">
        {/* Actions Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline text-opacity-50 text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-surface-border rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow font-body-md text-body-md"
              placeholder="Cari turnamen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link
            href="/admin/tambah-turnamen"
            className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-sm font-label-md text-label-md uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Turnamen
          </Link>
        </div>

        {/* Table */}
        <div className="bg-surface-container-lowest rounded-lg border border-surface-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-surface-border font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="py-3 px-6 w-24 text-center">Poster</th>
                <th className="py-3 px-6">Judul Turnamen</th>
                <th className="py-3 px-6">Tanggal</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 w-32 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-text-muted font-body-md"
                  >
                    {tournaments.length === 0
                      ? "Belum ada turnamen."
                      : "Tidak ditemukan turnamen."}
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-surface-bright transition-colors group"
                  >
                    <td className="py-3 px-6">
                      <div className="w-12 h-16 bg-surface-variant rounded overflow-hidden mx-auto border border-surface-border shadow-sm">
                        <img
                          src={t.poster_url}
                          alt={t.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-6 font-headline-md text-headline-md text-on-surface">
                      {t.title}
                    </td>
                    <td className="py-3 px-6 font-body-md text-body-md text-on-surface-variant">
                      {formatDate(t.event_date)}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                          t.status === "aktif"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-surface-dim text-on-surface-variant border border-outline-variant"
                        }`}
                      >
                        {t.status === "aktif" ? "Aktif" : "Selesai"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/tambah-turnamen?edit=${t.id}`}
                          className="p-1.5 text-secondary hover:text-primary transition-colors rounded hover:bg-surface-container-low"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </Link>
                        <button
                          onClick={() => setDeleteId(t.id)}
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
                Yakin ingin menghapus turnamen ini? Tindakan ini tidak dapat
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
    </>
  );
}
