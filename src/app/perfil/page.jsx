"use client";

import { useState } from "react";

import PasoNombre from "./steps/PasoNombre";
import PasoTelefono from "./steps/PasoTelefono";
import PasoCiudad from "./steps/PasoCiudad";
import PasoPuesto from "./steps/PasoPuesto";
import PasoHabilidades from "./steps/PasoHabilidades";
import PasoEducacionExperiencia from "./steps/PasoEducacionExperiencia";
import PasoFuente from "./steps/PasoFuente";
import PasoDocumentos from "./steps/PasoDocumentos";

export default function PerfilPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    ciudad: "",
    puesto: "",
    nivelEducativo: "",
    experiencia: "",
    fuente: "",
    habilidades: [],
    cv: "",
    ci: "",
    certificados: "",
  });

  const updateForm = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">

        {/* 🔷 HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Proceso de Postulación</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Completa la información para iniciar tu proceso de selección.
          </p>
        </div>

        {/* 🔷 PROGRESO */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Paso {step} de 10</span>
            <span>{Math.round((step / 10) * 100)}%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* 🔷 CONTENIDO */}
        <div className="min-h-[180px] flex flex-col justify-center items-center text-center">

          {/* PASO 1 - INTRO */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-2">
                Comencemos con tu información básica
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Este proceso tomará menos de 2 minutos.
              </p>

              <button
                onClick={nextStep}
                className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90"
              >
                Comenzar
              </button>
            </>
          )}

          {/* PASO 2 - NOMBRE */}
          {step === 2 && (
            <PasoNombre
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 3 - TELÉFONO */}
          {step === 3 && (
            <PasoTelefono
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 4 - CIUDAD */}
          {step === 4 && (
            <PasoCiudad
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 5 - PUESTO */}
          {step === 5 && (
            <PasoPuesto
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 6 - HABILIDADES */}
          {step === 6 && (
            <PasoHabilidades
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 7 - EDUCACIÓN + EXPERIENCIA */}
          {step === 7 && (
            <PasoEducacionExperiencia
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 8 - FUENTE */}
          {step === 8 && (
            <PasoFuente
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 9 - DOCUMENTOS */}
          {step === 9 && (
            <PasoDocumentos
              formData={formData}
              updateForm={updateForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* PASO 10 - CONFIRMACIÓN */}
          {step === 10 && (
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                ¡Postulación enviada!
              </h2>

              <p className="text-gray-500 text-sm">
                Gracias por postular. Nuestro equipo revisará tu información y
                se pondrá en contacto contigo pronto.
              </p>
            </div>
          )}

        </div>

        {/* 🔷 FOOTER */}
        <div className="mt-6 text-center text-xs text-gray-400">
          Tus datos serán utilizados únicamente para el proceso de selección.
        </div>

      </div>
    </div>
  );
}