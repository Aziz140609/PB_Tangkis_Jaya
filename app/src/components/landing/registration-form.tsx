"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const locationLabels: Record<string, string> = {
      sritex: "Sritex Sriwedari",
      hapsari: "Hapsari Mojosongo",
      htc: "HTC Solobaru",
      scs: "SCS Pabelan",
      blulukan: "Blulukan Colomadu",
    };

    const levelLabels: Record<string, string> = {
      basic: "Basic",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advance: "Advance",
    };

    const message = `Halo PB Tangkis Jaya! Saya ingin mendaftar.

Nama Orang Tua: ${parentName}
No. WhatsApp: ${phone}
Nama Anak: ${childName}
Usia Anak: ${childAge} tahun
Lokasi: ${locationLabels[location] || location}
Level: ${levelLabels[level] || level}

Terima kasih.`;

    const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encoded}`, "_blank");
  };

  return (
    <section
      className="py-24 px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto"
      id="registration"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
            Formulir Pendaftaran
          </h2>
          <p className="font-body-md text-on-surface-variant mt-4">
            Isi data di bawah ini untuk mendaftar. Tim kami akan segera
            menghubungi Anda.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-low p-8 rounded-xl border-2 border-primary shadow-[8px_8px_0px_0px_rgba(0,36,81,1)] space-y-6"
        >
          <div>
            <label className="block font-label-md text-primary uppercase mb-2">
              Nama Orang Tua / Wali
            </label>
            <input
              className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
              placeholder="Masukkan nama lengkap"
              required
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-label-md text-primary uppercase mb-2">
              Nomor WhatsApp
            </label>
            <input
              className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
              placeholder="Contoh: 08123456789"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-primary uppercase mb-2">
                Nama Anak
              </label>
              <input
                className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                placeholder="Nama lengkap anak"
                required
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-label-md text-primary uppercase mb-2">
                Usia Anak
              </label>
              <input
                className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                placeholder="Contoh: 10"
                required
                type="number"
                min={5}
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-label-md text-primary uppercase mb-2">
              Pilihan Lokasi Latihan
            </label>
            <select
              className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">-- Pilih Lokasi --</option>
              <option value="sritex">Sritex Sriwedari</option>
              <option value="hapsari">Hapsari Mojosongo</option>
              <option value="htc">HTC Solobaru</option>
              <option value="scs">SCS Pabelan</option>
              <option value="blulukan">Blulukan Colomadu</option>
              <option disabled value="berma">
                Berma Pajang (Penuh)
              </option>
            </select>
          </div>
          <div>
            <label className="block font-label-md text-primary uppercase mb-2">
              Pilihan Level / Program
            </label>
            <select
              className="w-full bg-surface border border-outline rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
              required
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">-- Pilih Level --</option>
              <option value="basic">Basic</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-on-primary font-headline-lg text-headline-lg-mobile md:text-headline-lg px-8 py-4 rounded-full uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(146,0,28,1)] hover:bg-secondary-container transition-all hover:translate-y-1 hover:shadow-none mt-4"
          >
            Kirim Pendaftaran
          </button>
        </form>
      </div>
    </section>
  );
}
