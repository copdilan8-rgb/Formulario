"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setError("");
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">

        {/* TÍTULO TIPO FORMULARIO */}
        <h1 className="mb-2 text-center text-2xl font-bold">
          Postulación de Empleo
        </h1>

        <p className="mb-6 text-center text-sm text-muted-foreground">
          Para comenzar tu postulación, inicia sesión con tu cuenta de Google
        </p>

        {/* BOTÓN GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-md border px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FcGoogle size={22} />
          {googleLoading ? "Conectando..." : "Continuar con Google"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="mt-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* TEXTO FINAL */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tus datos serán utilizados únicamente para el proceso de reclutamiento
        </p>
      </div>
    </div>
  );
}