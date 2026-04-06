import { supabase } from "@/lib/supabaseClient";

function manejarError(error) {
  if (error) {
    throw new Error(error.message);
  }
}

export async function listarTareas() {
  const { data, error } = await supabase
    .from("tareas")
    .select("*")
    .order("creado_en", { ascending: false });

  manejarError(error);
  return data;
}

export async function crearTarea({ user_id, titulo, descripcion }) {
  const { data, error } = await supabase
    .from("tareas")
    .insert([
      {
        user_id,
        titulo,
        descripcion,
      },
    ])
    .select()
    .single();

  manejarError(error);
  return data;
}

export async function cambiarEstadoTarea(id, estado) {
  const { data, error } = await supabase
    .from("tareas")
    .update({ estado })
    .eq("id", id)
    .select()
    .single();

  manejarError(error);
  return data;
}

export async function eliminarTarea(id) {
  const { error } = await supabase
    .from("tareas")
    .delete()
    .eq("id", id);

  manejarError(error);
  return true;
}