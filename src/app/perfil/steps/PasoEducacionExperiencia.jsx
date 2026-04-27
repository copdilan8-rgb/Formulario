"use client";

import { useState } from "react";

export default function PasoEducacionExperiencia({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const niveles = [
    "Bachiller",
    "Posgrado",
    "Universitario",
  ];

  const handleEducacion = (nivel) => {
    updateForm("nivelEducativo", nivel);
    setError("");
  };

  const handleExperiencia = (e) => {
    const valor = e.target.value;

    // Solo números y rango razonable
    if (/^\d*$/.test(valor)) {
      if (valor === "" || parseInt(valor) <= 50) {
        updateForm("experiencia", valor);
      }
    }

    if (error) setError("");
  };

  const handleNext = () => {
    if (!formData.nivelEducativo) {
      setError("Selecciona tu nivel educativo.");
      return;
    }

    if (!formData.experiencia) {
      setError("Ingresa tus años de experiencia.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        Cuéntanos sobre tu formación y experiencia
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Esta información nos permite evaluar tu perfil de manera más precisa
        según los requisitos del puesto.
      </p>

      {/* 🎓 EDUCACIÓN */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">
          Nivel educativo
        </p>

        <div className="grid grid-cols-2 gap-2">
          {niveles.map((nivel) => (
            <button
              key={nivel}
              onClick={() => handleEducacion(nivel)}
              className={`border rounded-md px-3 py-2 text-sm transition
                ${
                  formData.nivelEducativo === nivel
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>

      {/* 📈 EXPERIENCIA */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">
          Años de experiencia
        </p>

        <input
          type="text"
          value={formData.experiencia}
          onChange={handleExperiencia}
          placeholder="Ej: 2"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <div className="flex justify-center gap-3">
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