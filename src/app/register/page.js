"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const limpiarMensajes = () => {
    if (error) setError("");
    if (mensaje) setMensaje("");
  };

  const handleGoogleRegister = async () => {
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
        setError("No se pudo continuar con Google.");
      }
    } catch (err) {
      console.error("Error registro Google:", err);
      setError("Ocurrió un error al registrarte con Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    const emailLimpio = email.trim();
    const nombreLimpio = nombreCompleto.trim();

    if (!nombreLimpio || !emailLimpio || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: emailLimpio,
        password,
        options: {
          data: {
            nombre_completo: nombreLimpio,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message || "No se pudo completar el registro.");
        return;
      }

      if (data?.user && !data.session) {
        setMensaje(
          "Registro exitoso. Revisa tu correo electrónico para confirmar tu cuenta."
        );
        return;
      }

      setMensaje("Cuenta creada correctamente.");
      router.push("/perfil");
      router.refresh();
    } catch (err) {
      console.error("Error registro:", err);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-bold">Crear cuenta</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Regístrate para acceder a tu cuenta
        </p>

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading || loading}
            className="flex w-full items-center justify-center gap-3 rounded-md border px-4 py-2 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FcGoogle size={20} />
            {googleLoading ? "Conectando con Google..." : "Registrarse con Google"}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                o continúa con correo
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleRegister} className="mt-4 space-y-4">
          <div>
            <label htmlFor="nombreCompleto" className="mb-1 block text-sm font-medium">
              Nombre completo
            </label>
            <input
              id="nombreCompleto"
              type="text"
              placeholder="Tu nombre completo"
              value={nombreCompleto}
              onChange={(e) => {
                setNombreCompleto(e.target.value);
                limpiarMensajes();
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                limpiarMensajes();
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                limpiarMensajes();
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                limpiarMensajes();
              }}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              autoComplete="new-password"
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
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}