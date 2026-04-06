"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setMensaje("");
      setGoogleLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("No se pudo iniciar sesión con Google.");
      }
    } catch (err) {
      console.error("Error login Google:", err);
      setError("Ocurrió un error al iniciar sesión con Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const emailLimpio = email.trim();

    if (!emailLimpio || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validarCorreo(emailLimpio)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: emailLimpio,
        password,
      });

      if (error) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      setMensaje("Inicio de sesión exitoso.");
      router.push("/perfil");
      router.refresh();
    } catch (err) {
      console.error("Error login:", err);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
    if (mensaje) setMensaje("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
    if (mensaje) setMensaje("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-bold">Iniciar sesión</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FcGoogle size={20} />
            {googleLoading ? "Conectando con Google..." : "Continuar con Google"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">o continúa con correo</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="email"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>

              <Link
                href="/reset-password"
                className="text-sm underline underline-offset-4"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {mensaje && (
            <p className="rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-600">
              {mensaje}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-md border px-4 py-2 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}