"use client";

import { useState } from "react";

export default function PasoTelefono({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const validarTelefono = (valor) => {
    return /^[0-9]{7,10}$/.test(valor); // Bolivia suele 7-8 fijo, 8-10 móvil
  };

  const handleChange = (e) => {
    const valor = e.target.value;

    // Solo permitir números
    if (/^\d*$/.test(valor)) {
      updateForm("telefono", valor);
    }

    if (error) setError("");
  };

  const handleNext = () => {
    if (!formData.telefono) {
      setError("El número de teléfono/Cel es obligatorio.");
      return;
    }

    if (!validarTelefono(formData.telefono)) {
      setError("Ingresa un número válido (solo números, entre 7 y 10 dígitos).");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        ¿Cuál es tu número de contacto?
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Usaremos este número para contactarte en caso de avanzar en el proceso.
        <br />
        No se compartira esta información con terceros.
      </p>

      <input
        type="text"
        value={formData.telefono}
        onChange={handleChange}
        placeholder=" 77755682"
        className="w-full border px-4 py-2 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-black/20"
      />

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

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