const express = require("express");
const path = require("path");
require("dotenv").config();
const supabase = require("./supabaseClient");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS optimizado
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../")));

// ============================================
// ENDPOINTS
// ============================================

// Ruta principal de la API
app.get("/api", (req, res) => {
  res.json({
    message: "Bienvenido a la API de Portafolio Aetherys",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      mensajes: {
        crear: "POST /api/mensajes",
        obtener_todos: "GET /api/mensajes",
        obtener_uno: "GET /api/mensajes/:id",
        eliminar: "DELETE /api/mensajes/:id",
      },
    },
  });
});

// Endpoint de prueba
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Crear un nuevo mensaje de contacto
app.post("/api/mensajes", async (req, res) => {
  try {
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

    res.status(201).json({
      message: "Mensaje enviado exitosamente",
      data: data[0],
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      detalles: error.message,
    });
  }
});

// Obtener todos los mensajes (para dashboard admin)
app.get("/api/mensajes", async (req, res) => {
  try {
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

    res.json({
      count: data.length,
      mensajes: data,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      detalles: error.message,
    });
  }
});

// Eliminar un mensaje
app.delete("/api/mensajes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("mensajes").delete().eq("id", id);

    if (error) {
      console.error("Error de Supabase:", error);
      return res.status(500).json({
        error: "Error al eliminar mensaje",
        detalles: error.message,
      });
    }

    res.json({
      message: "Mensaje eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      detalles: error.message,
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.path,
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`🚀 Servidor Aetherys corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📧 Formulario: http://localhost:${PORT}/index.html`);
  console.log(`${"=".repeat(50)}\n`);
});

module.exports = app;
