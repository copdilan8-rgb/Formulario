"use client";

import { useState } from "react";

export default function PasoNombre({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const validarNombre = (valor) => {
    return /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(valor);
  };

  const handleChange = (e) => {
    const valor = e.target.value;

    // permitir escribir pero validar
    updateForm("nombre", valor);

    if (error) setError("");
  };

  const handleNext = () => {
    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!validarNombre(formData.nombre)) {
      setError("Solo se permiten letras y espacios.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">
      <h2 className="text-xl font-semibold mb-2">¿Cuál es tu nombre?</h2>

      <p className="text-sm text-gray-500 mb-4">
        Ingresa tu nombre y apellidos por completo
      </p>

      <input
        type="text"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="-Juan Pérez Mendoza"
        className="w-full border px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black/20"
      />

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={prevStep}
          className="px-4 py-2 border rounded-md"
        >
          Atrás
        </button>

        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
