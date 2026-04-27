"use client";

import { useState } from "react";

export default function PasoPuesto({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const puestos = [
    "Analista",
    "Desarrollador",
    "Contador",
    "Asistente",
  ];

  const handleSelect = (puesto) => {
    updateForm("puesto", puesto);

    // 🔥 IMPORTANTE: limpiar habilidades si cambia el puesto
    updateForm("habilidades", []);

    setError("");
  };

  const handleNext = () => {
    if (!formData.puesto) {
      setError("Selecciona un puesto.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        ¿A qué puesto deseas postular?
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Selecciona el área en la que te gustaría trabajar.
        Esto nos permitirá evaluar tu perfil de forma más precisa.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {puestos.map((puesto) => (
          <button
            key={puesto}
            onClick={() => handleSelect(puesto)}
            className={`border rounded-md px-4 py-2 text-sm transition 
              ${
                formData.puesto === puesto
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
          >
            {puesto}
          </button>
        ))}
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