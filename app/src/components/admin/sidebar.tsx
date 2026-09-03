"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/actions";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    href: "/admin/program",
    label: "Program Latihan",
    icon: "sports_tennis",
  },
  {
    href: "/admin/lokasi",
    label: "Lokasi & Jadwal",
    icon: "location_on",
  },
  {
    href: "/admin/turnamen",
    label: "Turnamen & Event",
    icon: "event",
  },
  {
    href: "/admin/galeri",
    label: "Galeri Juara",
    icon: "military_tech",
  },
  {
    href: "/admin/biaya",
    label: "Biaya Latihan",
    icon: "payments",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-primary flex flex-col z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">
              sports_tennis
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-primary-fixed truncate">
              ShuttleAdmin
            </span>
            <span className="font-label-md text-label-md text-primary-fixed-dim/70 truncate">
              Badminton Club CMS
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-container text-on-primary-fixed border-l-4 border-primary-fixed-dim"
                  : "text-primary-fixed-dim opacity-80 hover:bg-primary-container hover:opacity-100"
              }`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? "text-primary-fixed" : ""}`}
              >
                {item.icon}
              </span>
              <span
                className={`font-body-md text-body-md ${isActive ? "font-medium text-primary-fixed" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-primary-fixed-dim opacity-80 rounded-lg hover:bg-primary-container hover:opacity-100 transition-colors w-full"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body-md text-body-md">Logout</span>
        </button>
      </div>
    </aside>
  );
}
