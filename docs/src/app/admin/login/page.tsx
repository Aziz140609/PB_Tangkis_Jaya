"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <main
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARiD0dJWnJu4Awm48h272-ZS00QGNQzpxzGgGcdWPL_tWYbwg1tan3MyGTkCe0wXx1fd5ZL3H3jqPnEpweInD32CYowjfJZ9dIvitXMTWoGaEb2bVKTQrf3ZYDeNzmCjsvdfijy3y7bnCxLjkj8539YBYOmwXKpDDgs5YV2pbjajyw55AzDoiFbuunIL1rp5fSvEHph_YRenkpOjuEFa2Q9jJqDAz0uR8Vl5XjOuYZIffTlQ2F2uUu')",
      }}
    >
      <div className="w-full max-w-[420px] px-6 mx-auto relative z-10">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.12)] border border-surface-border overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            {/* Logo */}
            <div className="w-24 h-24 mb-4 flex items-center justify-center bg-surface-container-low rounded-full overflow-hidden border border-surface-border">
              <span className="material-symbols-outlined text-5xl text-primary">
                sports_tennis
              </span>
            </div>

            {/* Heading */}
            <div className="text-center w-full mb-6">
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                Admin Login
              </h1>
              <p className="font-body-md text-body-md text-text-muted">
                Secure access to PB Tangkis Jaya Management
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="w-full mb-4 p-3 bg-error-container border border-error/20 rounded text-error text-sm font-body-md">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1">
                  Email Staff
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    className="w-full pl-10 pr-3 py-2 bg-surface-container-lowest border border-surface-border rounded focus:outline-none focus:border-primary input-glow text-on-surface font-body-md text-body-md transition-shadow"
                    type="email"
                    placeholder="admin@pbtangkis.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-label-md text-label-md text-on-surface-variant">
                    Kata Sandi
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    className="w-full pl-10 pr-10 py-2 bg-surface-container-lowest border border-surface-border rounded focus:outline-none focus:border-primary input-glow text-on-surface font-body-md text-body-md transition-shadow"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-on-surface-variant focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded bg-primary hover:bg-primary-container text-on-primary font-headline-md text-headline-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                >
                  {loading ? "Masuk..." : "Masuk"}
                  <span className="material-symbols-outlined ml-2 text-[20px]">
                    login
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-surface-container-low px-8 py-3 border-t border-surface-border text-center">
            <p className="font-label-sm text-label-sm text-text-muted">
              © 2024 PB Tangkis Jaya. Authorized access only.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
