"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PasoDocumentos({
  formData,
  updateForm,
  nextStep,
  prevStep,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subirArchivo = async (file, carpeta) => {
    const nombre = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    const { data, error } = await supabase.storage
      .from("documentos-postulantes")
      .upload(`${carpeta}/${nombre}`, file);

    if (error) throw new Error("Error al subir archivo");

    const { data: urlData } = supabase.storage
      .from("documentos-postulantes")
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  };

  const handleFile = async (e, tipo) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);
      setError("");

      const url = await subirArchivo(file, tipo);

      updateForm(tipo, url);
    } catch (err) {
      console.log(err);
      setError("Error al subir el archivo. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 AQUÍ ESTÁ LA CLAVE (GUARDADO FINAL)
  const handleNext = async () => {
    try {
      setError("");
      setLoading(true);

      if (!formData.cv) {
        setError("Debes subir tu CV obligatoriamente.");
        return;
      }

      // 🔹 Obtener usuario autenticado
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Debes iniciar sesión.");
        return;
      }

      // 🔹 Insertar en la base de datos
      const { error: insertError } = await supabase
        .from("postulaciones_web")
        .insert([
          {
            user_id: user.id,
            nombre: formData.nombre,
            correo: user.email,
            telefono: formData.telefono,
            ciudad: formData.ciudad,
            puesto: formData.puesto,
            nivel_educativo: formData.nivelEducativo,
            anios_experiencia: parseInt(formData.experiencia),
            habilidades: formData.habilidades,
            fuente_reclutamiento: formData.fuente,
            cv_url: formData.cv,
            ci_url: formData.ci,
            certificados_url: formData.certificados,
          },
        ]);

      if (insertError) {
        console.log(insertError);
        setError("Error al guardar la postulación.");
        return;
      }

      // 🔹 Todo correcto
      nextStep();

    } catch (err) {
      console.error(err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 COMPONENTE REUTILIZABLE
  const FileUpload = ({ label, tipo, obligatorio, accept, value }) => (
    <div className="mb-5 text-left">
      <p className="text-sm font-medium mb-1">
        {label} {obligatorio && <span className="text-red-500">*</span>}
      </p>

      <p className="text-xs text-gray-500 mb-2">
        {tipo === "cv" && "Adjunta tu CV actualizado en formato PDF."}
        {tipo === "ci" && "Documento de identidad (PDF o imagen)."}
        {tipo === "certificados" &&
          "Certificados o cursos relevantes (opcional)."}
      </p>

      <label className="flex items-center justify-center w-full border-2 border-dashed rounded-lg px-4 py-4 cursor-pointer hover:bg-gray-50 transition">
        <input
          type="file"
          accept={accept}
          onChange={(e) => handleFile(e, tipo)}
          className="hidden"
        />

        <span className="text-sm text-gray-600">
          {value ? "✔ Archivo cargado" : "Haz clic para subir archivo"}
        </span>
      </label>

      {value && (
        <p className="text-green-600 text-xs mt-1">
          Documento cargado correctamente
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full">

      <h2 className="text-xl font-semibold mb-2 text-center">
        Subida de documentos
      </h2>

      <p className="text-sm text-gray-500 mb-5 text-center">
        Adjunta los documentos requeridos para completar tu postulación.
        <br />
        Un perfil completo aumenta tus posibilidades de avanzar.
      </p>

      <FileUpload
        label="Currículum Vitae"
        tipo="cv"
        obligatorio={true}
        accept=".pdf"
        value={formData.cv}
      />

      <FileUpload
        label="Documento de Identidad"
        tipo="ci"
        obligatorio={false}
        accept=".pdf,image/*"
        value={formData.ci}
      />

      <FileUpload
        label="Certificados"
        tipo="certificados"
        obligatorio={false}
        accept=".pdf"
        value={formData.certificados}
      />

      {loading && (
        <p className="text-sm text-gray-500 text-center mb-2">
          Procesando...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}

      <div className="flex justify-center gap-3 mt-4">
        <button onClick={prevStep} className="px-4 py-2 border rounded-md">
          Atrás
        </button>

        <button
          onClick={handleNext}
          className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90"
        >
          Finalizar postulación
        </button>
      </div>

    </div>
  );
}