"use client";
import { useEffect, useState } from "react";

import {
  listarTareas,
  crearTarea,
  cambiarEstadoTarea,
  eliminarTarea,
} from "@/services/tareas";
import { supabase } from "@/lib/supabaseClient";

export default function TareasPage() {
  const handleVolver = () => {
    window.history.back();
  };
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  const tareasPendientes = tareas.filter(
    (tarea) => tarea.estado === "pendiente",
  );
  const tareasCompletadas = tareas.filter(
    (tarea) => tarea.estado === "completada",
  );

  useEffect(() => {
    async function inicializarPagina() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw new Error(error.message);
        }

        const usuarioActual = data.user;
        setUser(usuarioActual);

        if (usuarioActual) {
          const tareasData = await listarTareas();
          setTareas(tareasData);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setCargando(false);
      }
    }

    inicializarPagina();
  }, []);

  const recargarTareas = async () => {
    try {
      const data = await listarTareas();
      setTareas(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCrearTarea = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    if (!user) {
      alert("No se encontró el usuario autenticado");
      return;
    }

    try {
      await crearTarea({
        user_id: user.id,
        titulo,
        descripcion,
      });

      setTitulo("");
      setDescripcion("");
      await recargarTareas();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleEstado = async (tarea) => {
    const nuevoEstado =
      tarea.estado === "pendiente" ? "completada" : "pendiente";

    try {
      await cambiarEstadoTarea(tarea.id, nuevoEstado);
      await recargarTareas();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarTarea(id);
      await recargarTareas();
    } catch (error) {
      alert(error.message);
    }
  };

  if (cargando) {
    return (
        
      <main className="min-h-screen p-6">
        
        <div className="mx-auto max-w-3xl">
            
        
          <h1 className="text-3xl font-bold mb-6">Mis tareas</h1>
          <p>Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
            <button
              type="button"
              onClick={handleVolver}
              className="text-sm text-gray-600 hover:underline"
            >
              ← Volver
            </button>
          </div>
        <h1 className="text-3xl font-bold mb-6">Mis tareas</h1>

        <form
          onSubmit={handleCrearTarea}
          className="mb-6 space-y-3 border p-4 rounded-xl"
        >
          <input
            type="text"
            placeholder="Título"
            className="w-full border p-2 rounded"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="Descripción (opcional)"
            className="w-full border p-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Crear tarea
          </button>
        </form>

        <div className="space-y-6">
          {/* Pendientes */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Pendientes</h2>

            {tareasPendientes.length === 0 ? (
              <p className="text-sm text-gray-500">No hay tareas pendientes.</p>
            ) : (
              tareasPendientes.map((tarea) => (
                <div
                  key={tarea.id}
                  className="flex justify-between items-center border p-3 rounded mb-2"
                >
                  <div>
                    <p className="font-semibold">{tarea.titulo}</p>
                    <p className="text-sm text-gray-500">{tarea.descripcion}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleEstado(tarea)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Completar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEliminar(tarea.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Completadas */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Completadas</h2>

            {tareasCompletadas.length === 0 ? (
              <p className="text-sm text-gray-500">
                No hay tareas completadas.
              </p>
            ) : (
              tareasCompletadas.map((tarea) => (
                <div
                  key={tarea.id}
                  className="flex justify-between items-center border p-3 rounded mb-2"
                >
                  <div>
                    <p className="font-semibold line-through text-gray-500">
                      {tarea.titulo}
                    </p>
                    <p className="text-sm text-gray-500">{tarea.descripcion}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleEstado(tarea)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Deshacer
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEliminar(tarea.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
