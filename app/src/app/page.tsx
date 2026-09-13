import { getTournaments, getGalleryPhotos, getPrograms, getLocations, getPricing, getCoaches } from "@/actions";
import RegistrationForm from "@/components/landing/registration-form";
import Header from "@/components/landing/header";

export default async function HomePage() {
  const [tournaments, galleryPhotos, programs, locations, pricing, coaches] = await Promise.all([
    getTournaments(),
    getGalleryPhotos(),
    getPrograms(),
    getLocations(),
    getPricing(),
    getCoaches(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-grow pt-[88px]">
      {/* Hero */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden clip-diagonal-bottom">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0Q34_UYMiwqkkSYKSM9NnGwTYl6_DAhvDA96dE3Ys1rttTDPeg7Ci7uF2pPil-GM8xF-WHEdQg2GBI8BbzclQ0nh2MvJiVRu1IfzR8Mgjzk5Rls1FnU_7PQ45eXLLWcIpYcXKjheIijmP1coLDWpqpD9uq3SmwZ5g9ffaDN-yMP7A7HYjN8GG57LstDg24pzsBo9MNu-YkFlLfZCFXKdx4QSkI77ujCTr9G7k4UhXGIv6cWzOOWXZ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-container-max mx-auto counter-skew">
          <div className="bg-surface rounded-full p-4 shadow-[8px_8px_0px_0px_rgba(183,16,42,1)] mb-8 transform -rotate-2">
              <img
                alt="PB Tangkis Jaya Logo"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-contain"
                src="/images/logo.jpeg"
              />
          </div>
          <h1 className="font-display-lg text-display-lg text-white uppercase italic text-shadow-heavy mb-2 transform -skew-x-6">
            PB TANGKIS JAYA
          </h1>
          <p className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-secondary-fixed mb-8 uppercase tracking-wide bg-primary px-4 py-1 inline-block -skew-x-6 shadow-[4px_4px_0px_0px_rgba(219,49,63,1)]">
            Membangun Juara dari Surakarta
          </p>
          <a
            className="bg-secondary text-on-primary font-headline-lg text-headline-lg-mobile md:text-headline-lg px-8 py-4 rounded-full uppercase tracking-wider shadow-[0px_4px_0px_0px_rgba(146,0,28,1)] hover:bg-secondary-container transition-all hover:translate-y-1 hover:shadow-none inline-flex items-center gap-2"
            href="#registration"
          >
            Daftar Sekarang
            <span className="material-symbols-outlined font-bold">
              arrow_forward
            </span>
          </a>
        </div>
      </section>

      {/* Navbar placeholder is in the layout via position: fixed */}

      {/* Tentang Kami */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="order-2 md:order-1 relative">
            <div className="w-full aspect-square bg-surface-container-high rounded-xl overflow-hidden relative border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,36,81,1)]">
              <div
                className="bg-cover bg-center w-full h-full"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHjaE9AoS3UKdpOUm-6T3Aus9Q2HhuFue91zpA_vjiq13EwZu2S-JiTNprewPhAAzwGoZjNSe7YZ1Qfjvr1Qs21QwFBnx2OpseItdl-c72Rh-c1CqAkqmNU1BgrDBhSf0yNqyfdw3ZdilcAZXoTy7iRxPtyRk9HlEFgr0FwhWOfllt74oljoe97i38l2IK8JVJsyD3xjaO1TNNGbP2jcsZAr6NUsti0P4r98oCVxlSAmL-NwxC3b5e')",
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-tertiary-container text-on-tertiary-container font-headline-xl p-6 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transform rotate-12">
              <span className="material-symbols-outlined text-6xl">
                emoji_events
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-widest border-b-2 border-secondary pb-1">
              <span className="material-symbols-outlined">info</span>
              Tentang Kami
            </div>
            <h2 className="font-headline-xl text-headline-xl text-primary uppercase leading-tight">
              Melatih Calon Juara <br />
              <span className="text-secondary italic">
                di Jantung Kota Solo
              </span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Berdiri dengan semangat untuk memajukan olahraga bulutangkis di
              Surakarta, PB Tangkis Jaya mendedikasikan diri untuk membina
              talenta muda menjadi atlet berprestasi. Dengan pelatih profesional
              dan fasilitas berkualitas, kami berkomitmen mencetak generasi juara
              berikutnya.
            </p>
          </div>
        </div>
      </section>

      {/* Program Latihan */}
      <section id="training" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low clip-diagonal relative">
        <div className="max-w-container-max mx-auto counter-skew">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
              Program Latihan
            </h2>
          </div>
          {programs.length === 0 ? (
            <p className="text-center text-on-surface-variant font-body-lg py-12">
              Belum ada program latihan yang tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className={
                    prog.is_featured
                      ? "bg-primary text-white p-8 rounded-xl border-2 border-secondary shadow-[4px_4px_0px_0px_rgba(183,16,42,1)] transform hover:-translate-y-2 transition-transform"
                      : "bg-surface p-8 rounded-xl border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,36,81,1)] transform hover:-translate-y-2 transition-transform"
                  }
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                      prog.is_featured
                        ? "bg-secondary text-on-secondary"
                        : "bg-primary-container text-on-primary-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {prog.icon}
                    </span>
                  </div>
                  <h3
                    className={`font-headline-lg text-headline-lg uppercase mb-2 ${
                      prog.is_featured
                        ? "text-secondary-fixed"
                        : "text-primary"
                    }`}
                  >
                    {prog.title}
                  </h3>
                  <p
                    className={`font-body-md ${
                      prog.is_featured
                        ? "text-primary-fixed-dim"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {prog.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

            {/* Pelatih */}
      <section id="coaches" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest max-w-container-max mx-auto clip-diagonal-top clip-diagonal-bottom my-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
            Pelatih Kami
          </h2>
        </div>
        {coaches.length === 0 ? (
          <p className="text-center text-on-surface-variant font-body-lg py-12">
            Belum ada pelatih yang terdaftar.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {coaches.map((coach) => (
              <div key={coach.id} className="group relative">
                <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="bg-surface border-2 border-primary p-6 rounded-xl relative z-10 h-full flex flex-col items-center text-center transform transition-transform group-hover:-translate-y-1">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-secondary mb-4">
                    <img src={coach.image_url} alt={coach.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-1">{coach.name}</h3>
                  <span className="inline-block bg-primary text-on-primary px-3 py-1 text-sm font-bold uppercase rounded-full mb-3">
                    {coach.role}
                  </span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">{coach.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {/* Lokasi & Jadwal */}
      <section id="schedules" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
            Lokasi & Jadwal
          </h2>
        </div>
        {locations.length === 0 ? (
          <p className="text-center text-on-surface-variant font-body-lg py-12">
            Belum ada lokasi yang tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`bg-surface-container p-6 rounded-xl border flex flex-col justify-between ${
                  loc.status === "FULL"
                    ? "border-error opacity-75 relative overflow-hidden"
                    : "border-outline-variant"
                }`}
              >
                {loc.status === "FULL" && (
                  <div className="absolute top-4 right-[-30px] bg-error text-on-error font-bold text-xs py-1 px-8 transform rotate-45">
                    FULL
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3
                      className={`font-headline-lg text-headline-lg-mobile uppercase ${
                        loc.status === "FULL"
                          ? "text-on-surface-variant"
                          : "text-primary"
                      }`}
                    >
                      {loc.name}
                    </h3>
                    {loc.status === "AVAILABLE" && (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        AVAILABLE
                      </span>
                    )}
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-4 flex items-start gap-2">
                    <span
                      className={`material-symbols-outlined text-sm mt-1 ${
                        loc.status === "FULL"
                          ? "text-on-surface-variant"
                          : "text-primary"
                      }`}
                    >
                      location_on
                    </span>
                    {loc.address}
                  </p>
                </div>
                <div className="space-y-2">
                  {loc.schedules.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-t border-outline-variant pt-2"
                    >
                      <span className="font-body-md font-semibold">{s.day}</span>
                      <span className="font-body-md text-on-surface-variant">
                        {s.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Turnamen & Event */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
            Turnamen & Event
          </h2>
        </div>
        {tournaments.length === 0 ? (
          <p className="text-center text-on-surface-variant font-body-lg py-12">
            Belum ada turnamen yang tersedia saat ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="bg-surface rounded-xl border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,36,81,1)] overflow-hidden flex flex-col"
              >
                <img
                  alt={t.title}
                  className="w-full object-cover h-64 border-b-2 border-primary"
                  src={t.poster_url}
                />
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-headline-lg text-headline-lg text-primary uppercase mb-2">
                    {t.title}
                  </h3>
                  <p className="font-body-md text-secondary font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      calendar_month
                    </span>
                    {new Date(t.event_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {t.status === "selesai" && (
                      <span className="ml-2 text-xs font-label-sm bg-surface-dim text-on-surface-variant px-2 py-0.5 rounded">
                        Selesai
                      </span>
                    )}
                  </p>
                  <div className="mt-auto">
                    <details className="group">
                      <summary className="flex justify-between items-center font-label-md text-primary uppercase cursor-pointer bg-surface-container-high p-3 rounded-md hover:bg-surface-variant transition-colors">
                        <span>Lihat Ketentuan</span>
                        <span className="material-symbols-outlined transition group-open:rotate-180">
                          expand_more
                        </span>
                      </summary>
                      <div className="p-3 bg-surface-container-low text-on-surface-variant font-body-md text-sm rounded-b-md mt-1 border border-outline-variant border-t-0 whitespace-pre-line">
                        {t.terms}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Galeri Juara */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low clip-diagonal relative">
        <div className="max-w-container-max mx-auto counter-skew">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
              Galeri Juara
            </h2>
          </div>
          {galleryPhotos.length === 0 ? (
            <p className="text-center text-on-surface-variant font-body-lg py-12">
              Belum ada foto di galeri.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((p) => (
                <div
                  key={p.id}
                  className="relative group rounded-lg overflow-hidden border-2 border-primary"
                >
                  <img
                    alt={p.caption}
                    className="w-full h-48 object-cover"
                    src={p.image_url}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div>
                      <p className="text-white font-label-md text-label-md font-semibold">
                        {p.caption}
                      </p>
                      {p.event_date && (
                        <p className="text-white/70 font-label-sm text-label-sm">
                          {new Date(p.event_date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
            Testimoni
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[
            {
              name: "Budi S.",
              role: "Orang Tua Murid",
              initial: "A",
              text: '"Anak saya perkembangannya sangat pesat sejak gabung PB Tangkis Jaya. Pelatihnya sabar tapi disiplin."',
            },
            {
              name: "Rini A.",
              role: "Atlet Junior",
              initial: "R",
              text: '"Fasilitas latihannya bagus dan programnya jelas. Saya merasa lebih siap menghadapi turnamen."',
            },
            {
              name: "Dewi K.",
              role: "Orang Tua Murid",
              initial: "D",
              text: '"Sangat merekomendasikan PB ini untuk anak-anak yang ingin serius di bulutangkis. Komunitasnya juga supportif."',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-surface-container p-8 rounded-xl border-t-4 border-secondary shadow-[4px_4px_0px_0px_rgba(0,36,81,1)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-bold">
                  {t.initial}
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-primary">
                    {t.name}
                  </h4>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    {t.role}
                  </p>
                </div>
              </div>
              <p className="font-body-md text-on-surface-variant italic">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Biaya */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low clip-diagonal relative">
        <div className="max-w-container-max mx-auto counter-skew">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary uppercase inline-block border-b-4 border-secondary pb-2 transform -skew-x-6">
              Biaya Latihan
            </h2>
          </div>
          {pricing.length === 0 ? (
            <p className="text-center text-on-surface-variant font-body-lg py-12">
              Belum ada informasi biaya.
            </p>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(pricing.length, 3)} gap-gutter`}>
              {pricing.map((p) => (
                <div
                  key={p.id}
                  className={
                    p.is_popular
                      ? "bg-primary text-white p-8 rounded-xl border-2 border-secondary text-center shadow-[8px_8px_0px_0px_rgba(183,16,42,1)] transform md:-translate-y-4 flex flex-col"
                      : "bg-surface p-8 rounded-xl border-2 border-primary text-center shadow-[4px_4px_0px_0px_rgba(0,36,81,1)] flex flex-col"
                  }
                >
                  {p.is_popular && (
                    <div className="bg-secondary text-on-secondary text-xs font-bold px-3 py-1 rounded-full uppercase inline-block mx-auto mb-4 tracking-wider">
                      Populer
                    </div>
                  )}
                  <h3
                    className={`font-headline-lg text-headline-lg uppercase mb-4 ${
                      p.is_popular ? "text-secondary-fixed" : "text-primary"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <div
                    className={`font-bold mb-4 ${
                      p.is_popular
                        ? "text-4xl text-tertiary-fixed"
                        : "text-3xl text-secondary"
                    }`}
                  >
                    Rp {new Intl.NumberFormat("id-ID").format(p.price)}
                    {p.period && (
                      <span
                        className={`text-sm font-normal ${
                          p.is_popular
                            ? "text-white/70"
                            : "text-on-surface-variant"
                        }`}
                      >
                        /{p.period}
                      </span>
                    )}
                  </div>
                  <ul
                    className={`font-body-md text-left space-y-2 mb-8 flex-grow ${
                      p.is_popular
                        ? "text-white/90"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span
                          className={`material-symbols-outlined text-sm ${
                            p.is_popular
                              ? "text-tertiary-fixed"
                              : "text-green-600"
                          }`}
                        >
                          check_circle
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  {p.is_popular ? (
                    <a
                      className="bg-secondary text-on-primary font-label-md px-6 py-3 rounded-full uppercase hover:bg-secondary-container transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                      href="#registration"
                    >
                      {p.cta_text}
                    </a>
                  ) : (
                    <a
                      className="border-2 border-primary text-primary font-label-md px-6 py-3 rounded-full uppercase hover:bg-primary-container hover:text-on-primary-container transition-colors"
                      href="#registration"
                    >
                      {p.cta_text}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form Pendaftaran */}
      <div id="registration">
        <RegistrationForm />
      </div>

      {/* Footer */}
      <footer className="w-full relative clip-diagonal-top bg-primary">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 gap-gutter w-full max-w-container-max mx-auto counter-skew">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="font-headline-lg text-headline-lg text-secondary-fixed italic uppercase">
              PB TANGKIS JAYA
            </div>
            <div className="font-body-md text-body-md text-white/80">
              Â© 2024 PB TANGKIS JAYA. ALL RIGHTS RESERVED.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-body-md text-body-md">
            <a
              className="text-white/80 hover:text-secondary-fixed-dim transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-white/80 hover:text-secondary-fixed-dim transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-white/80 hover:text-secondary-fixed-dim transition-colors"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="text-tertiary-fixed font-bold hover:text-secondary-fixed-dim transition-colors flex items-center gap-1"
              href="#"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Support
            </a>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}

