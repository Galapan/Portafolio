module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.status(200).json({
    message: "Bienvenido a la API de Portafolio Aetherys",
    version: "2.0.0",
    platform: "Vercel Serverless Functions",
    endpoints: {
      mensajes: {
        crear: "POST /api/mensajes",
        obtener_todos: "GET /api/mensajes",
        eliminar: "DELETE /api/mensajes?id={id}",
      },
    },
    status: "OK",
    timestamp: new Date().toISOString(),
  });
};
