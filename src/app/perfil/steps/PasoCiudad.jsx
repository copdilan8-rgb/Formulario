"use client";

import { useState } from "react";

export default function PasoCiudad({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  const ciudades = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Santa Marta",
    "Bucaramanga",
  ];

  const handleSelect = (ciudad) => {
    updateForm("ciudad", ciudad);
    setError("");
  };

  const handleNext = () => {
    if (!formData.ciudad) {
      setError("Por favor selecciona una ciudad.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        ¿En qué ciudad te encuentras?
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Esto nos ayuda a asignarte a la sucursal más cercana
        y considerar oportunidades disponibles en tu zona.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {ciudades.map((ciudad) => (
          <button
            key={ciudad}
            onClick={() => handleSelect(ciudad)}
            className={`border rounded-md px-4 py-2 text-sm transition 
              ${
                formData.ciudad === ciudad
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
          >
            {ciudad}
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