"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface border-b-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,36,81,1)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <Link
          href="/"
          className="font-headline-xl text-headline-xl italic text-primary uppercase tracking-tighter"
        >
          PB TANGKIS JAYA
        </Link>
        <nav className="hidden md:flex gap-8 items-center">
          <a
            className="text-on-surface font-label-md text-label-md uppercase hover:text-secondary transition-colors duration-200"
            href="#training"
          >
            Training
          </a>
          <a
            className="text-on-surface font-label-md text-label-md uppercase hover:text-secondary transition-colors duration-200"
            href="#coaches"
          >
            Coaches
          </a>
          <a
            className="text-on-surface font-label-md text-label-md uppercase hover:text-secondary transition-colors duration-200"
            href="#schedules"
          >
            Schedules
          </a>
          <a
            className="text-secondary font-bold border-b-4 border-secondary pb-1 font-label-md text-label-md uppercase hover:text-secondary transition-colors duration-200"
            href="#registration"
          >
            Registration
          </a>
        </nav>
        <a
          className="hidden md:inline-flex bg-primary text-on-primary font-label-md px-6 py-3 rounded-full uppercase hover:bg-primary-container active:translate-x-1 active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
          href="#registration"
        >
          Join Now
        </a>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu
          </span>
        </button>
      </div>
    </header>
  );
}
