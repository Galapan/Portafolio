const { createClient } = require("@supabase/supabase-js");

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // POST - Crear mensaje
    if (req.method === "POST") {
      const { nombre, email, mensaje } = req.body;

      // Validación de campos
      if (!nombre || !email || !mensaje) {
        return res.status(400).json({
          error: "Faltan campos requeridos",
          campos_requeridos: ["nombre", "email", "mensaje"],
        });
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Email inválido",
        });
      }

      const { data, error } = await supabase
        .from("mensajes")
        .insert([
          {
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            mensaje: mensaje.trim(),
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error("Error de Supabase:", error);
        return res.status(500).json({
          error: "Error al guardar el mensaje",
          detalles: error.message,
        });
      }

      return res.status(201).json({
        message: "Mensaje enviado exitosamente",
        data: data[0],
      });
    }

    // GET - Obtener todos los mensajes
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("mensajes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error de Supabase:", error);
        return res.status(500).json({
          error: "Error al obtener mensajes",
          detalles: error.message,
        });
      }

      return res.json({
        count: data.length,
        mensajes: data,
      });
    }

    // DELETE - Eliminar mensaje
    if (req.method === "DELETE") {
      const id = req.query.id;

      if (!id) {
        return res.status(400).json({
          error: "ID requerido",
        });
      }

      const { error } = await supabase.from("mensajes").delete().eq("id", id);

      if (error) {
        console.error("Error de Supabase:", error);
        return res.status(500).json({
          error: "Error al eliminar mensaje",
          detalles: error.message,
        });
      }

      return res.json({
        message: "Mensaje eliminado exitosamente",
      });
    }

    // Método no permitido
    return res.status(405).json({
      error: "Método no permitido",
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      detalles: error.message,
    });
  }
};
