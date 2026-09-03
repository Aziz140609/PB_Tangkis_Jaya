import Link from "next/link";
import { getTournamentCount, getGalleryCount, getProgramCount, getLocationCount, getPricingCount } from "@/actions";

export default async function AdminDashboardPage() {
  const [tournamentCount, galleryCount, programCount, locationCount, pricingCount] = await Promise.all([
    getTournamentCount(),
    getGalleryCount(),
    getProgramCount(),
    getLocationCount(),
    getPricingCount(),
  ]);

  return (
    <>
      {/* Top Nav */}
      <header className="bg-surface border-b border-surface-border flex justify-between items-center h-16 px-6 shrink-0 z-10 w-full">
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-text-muted hover:bg-surface-container-low transition-colors duration-100 hover:scale-95 flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-surface p-container-padding">
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="font-headline-xl text-headline-xl text-text-main">
            Selamat Datang, Admin!
          </h2>
          <p className="font-body-md text-body-md text-text-muted mt-1">
            Berikut adalah ringkasan aktivitas PB Tangkis Jaya hari ini.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Turnamen Aktif */}
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">
                  emoji_events
                </span>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-on-surface-variant">
                Aktif
              </span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-1">
                Total Turnamen Aktif
              </p>
              <p className="font-headline-xl text-[36px] font-bold text-text-main leading-none">
                {tournamentCount}
              </p>
            </div>
          </div>

          {/* Foto Galeri */}
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-tertiary-fixed/40 flex items-center justify-center text-tertiary-container">
                <span className="material-symbols-outlined text-[28px]">
                  photo_library
                </span>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-1">
                Total Foto Galeri
              </p>
              <p className="font-headline-xl text-[36px] font-bold text-text-main leading-none">
                {galleryCount}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-success">
                <span className="material-symbols-outlined text-[28px]">
                  sports_tennis
                </span>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-1">
                Total Program Latihan
              </p>
              <p className="font-headline-xl text-[36px] font-bold text-text-main leading-none">
                {programCount}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">
                  location_on
                </span>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-1">
                Total Lokasi
              </p>
              <p className="font-headline-xl text-[36px] font-bold text-text-main leading-none">
                {locationCount}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  payments
                </span>
              </div>
            </div>
            <div>
              <p className="font-label-md text-label-md text-text-muted uppercase tracking-wider mb-1">
                Total Paket Biaya
              </p>
              <p className="font-headline-xl text-[36px] font-bold text-text-main leading-none">
                {pricingCount}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-border rounded-xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-border bg-surface-bright">
              <h3 className="font-headline-md text-headline-md text-text-main">
                Aksi Cepat
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <Link
                href="/admin/tambah-turnamen"
                className="w-full flex items-center justify-between px-4 py-3 bg-primary text-on-primary rounded-lg hover:bg-on-primary-fixed-variant transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    add_circle
                  </span>
                  <span className="font-body-md text-body-md font-medium">
                    Buat Turnamen Baru
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/admin/galeri"
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-container text-text-main rounded-lg hover:bg-surface-container-highest border border-transparent transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    upload_file
                  </span>
                  <span className="font-body-md text-body-md font-medium">
                    Unggah Foto Galeri
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/admin/program"
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-container text-text-main rounded-lg hover:bg-surface-container-highest border border-transparent transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    sports_tennis
                  </span>
                  <span className="font-body-md text-body-md font-medium">
                    Kelola Program Latihan
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/admin/lokasi"
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-container text-text-main rounded-lg hover:bg-surface-container-highest border border-transparent transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    location_on
                  </span>
                  <span className="font-body-md text-body-md font-medium">
                    Kelola Lokasi & Jadwal
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  chevron_right
                </span>
              </Link>
              <Link
                href="/admin/biaya"
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-container text-text-main rounded-lg hover:bg-surface-container-highest border border-transparent transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    payments
                  </span>
                  <span className="font-body-md text-body-md font-medium">
                    Kelola Biaya Latihan
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="bg-surface-container-lowest border border-surface-border rounded-xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-border bg-surface-bright">
              <h3 className="font-headline-md text-headline-md text-text-main">
                Informasi
              </h3>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  info
                </span>
                <p className="font-body-md text-body-md text-text-main text-sm">
                  Kelola turnamen, galeri, dan data klub dari panel ini.
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-tertiary-container text-[20px]">
                  help
                </span>
                <p className="font-body-md text-body-md text-text-main text-sm">
                  Hubungi developer untuk bantuan teknis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
