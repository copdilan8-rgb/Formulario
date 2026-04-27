"use client";

import { useState } from "react";

export default function PasoHabilidades({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");

  // 🔥 MAPA INTELIGENTE
  const habilidadesPorPuesto = {
    Desarrollador: ["JavaScript", "React", "Node.js", "SQL", "Git"],
    Analista: ["Excel", "SQL", "Power BI", "Python", "Estadística"],
    Contador: ["Excel", "NIIF", "Impuestos", "Contabilidad", "Auditoría"],
    Asistente: ["Organización", "Comunicación", "Excel", "Atención al cliente"],
  };

  const habilidadesDisponibles =
    habilidadesPorPuesto[formData.puesto] || [];

  const toggleHabilidad = (habilidad) => {
    let nuevas = formData.habilidades || [];

    if (nuevas.includes(habilidad)) {
      nuevas = nuevas.filter((h) => h !== habilidad);
    } else {
      nuevas = [...nuevas, habilidad];
    }

    updateForm("habilidades", nuevas);
    setError("");
  };

  const handleNext = () => {
    if (!formData.habilidades || formData.habilidades.length === 0) {
      setError("Selecciona al menos una habilidad.");
      return;
    }

    nextStep();
  };

  return (
    <div className="w-full text-center">

      <h2 className="text-xl font-semibold mb-2">
        Selecciona tus habilidades principales
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        Esto nos ayudará a evaluar qué tan bien encajas con el puesto seleccionado.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {habilidadesDisponibles.map((hab) => (
          <button
            key={hab}
            onClick={() => toggleHabilidad(hab)}
            className={`border rounded-md px-4 py-2 text-sm transition
              ${
                formData.habilidades?.includes(hab)
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
          >
            {hab}
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