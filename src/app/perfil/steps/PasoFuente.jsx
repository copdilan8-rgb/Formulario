"use client";

import { useState } from "react";

export default function PasoFuente({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const fuentes = [
    "Universidad",
    "LinkedIn",
    "Referido",
    "Portal de Empleo",
    "Agencia",
    "Otro..."
  ];

  const handleSelect = (fuente) => {
    updateForm("fuente", fuente);
    setError("");
  };

  const handleNext = () => {
    if (!formData.fuente) {
      setError("Selecciona una opción.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        ¿Cómo te enteraste de esta oportunidad?
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Esta información nos ayuda a mejorar nuestros canales de reclutamiento
        y llegar a más profesionales como tú.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {fuentes.map((fuente) => (
          <button
            key={fuente}
            onClick={() => handleSelect(fuente)}
            className={`border rounded-md px-4 py-2 text-sm transition
              ${
                formData.fuente === fuente
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
          >
            {fuente}
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