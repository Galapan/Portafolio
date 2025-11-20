document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("form");

  if (formulario) {
    formulario.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Obtener los valores del formulario
      const datos = {
        nombre: document.getElementById("nombre").value.trim(),
        email: document.getElementById("email").value.trim(),
        mensaje: document.getElementById("mensaje").value.trim(),
      };

      // Validar que todos los campos requeridos estén llenos
      if (!datos.nombre || !datos.email || !datos.mensaje) {
        alert("Por favor, completa todos los campos marcados con *");
        return;
      }

      // Deshabilitar el botón mientras se envía
      const botonEnviar = formulario.querySelector('button[type="submit"]');
      const textoOriginal = botonEnviar.textContent;
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";

      try {
        // Determinar la URL del backend:
        // - Si la página está siendo servida desde un servidor web (http/https), usar el mismo origen.
        // - Si la página se abrió como archivo local (file://) o el origen es 'null', usar el backend en localhost:3000.
        const isFileProtocol =
          window.location.protocol === "file:" ||
          window.location.origin === "null";
        const API_BASE = isFileProtocol
          ? "http://localhost:3000"
          : window.location.origin;

        const response = await fetch(`${API_BASE}/api/mensajes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        const resultadoText = await response.text();
        let resultado;
        try {
          resultado = JSON.parse(resultadoText || "{}");
        } catch (err) {
          // si no es JSON, dejar el texto crudo
          resultado = { raw: resultadoText };
        }

        if (response.ok) {
          // Éxito
          mostrarMensaje(
            "¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.",
            "exito"
          );
          formulario.reset(); // Limpiar el formulario
        } else {
          // Error del servidor
          console.error("Error del servidor:", response.status, resultado);
          mostrarMensaje(
            "Error al enviar el mensaje: " +
              (resultado.error || resultado.raw || "Error desconocido"),
            "error"
          );
        }
      } catch (error) {
        // Error de red o conexión
        console.error("Error de conexión:", error);
        mostrarMensaje(
          "Error de conexión. Por favor, verifica que el servidor esté corriendo (p. ej. http://localhost:3000)",
          "error"
        );
      } finally {
        // Rehabilitar el botón
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginal;
      }
    });
  }
});

// Función para mostrar mensajes estilizados
function mostrarMensaje(texto, tipo = "exito") {
  // Optimización: Eliminar modal anterior si existe para evitar duplicados
  const existingModal = document.getElementById("notificationModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Crear contenedor del modal
  const modal = document.createElement("div");
  modal.style.zIndex = "9999"; // Corrección: Asegurar que aparezca al frente de todo
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm";
  modal.id = "notificationModal";
  modal.style.animation = "fadeInUp 0.3s ease-out";

  // Crear la tarjeta del mensaje
  const messageCard = document.createElement("div");
  messageCard.className =
    "glass-card p-6 rounded-2xl backdrop-blur-md border border-white/20 max-w-sm w-11/12 mx-4";

  // Determinar estilos según el tipo
  const iconClass =
    tipo === "exito"
      ? "fas fa-check-circle text-3xl text-green-400 mb-3"
      : "fas fa-exclamation-circle text-3xl text-red-400 mb-3";
  const borderClass =
    tipo === "exito"
      ? "border-l-4 border-green-400"
      : "border-l-4 border-red-400";

  messageCard.className += ` ${borderClass}`;

  // Contenido del mensaje
  messageCard.innerHTML = `
    <div class="flex flex-col text-center">
      <i class="${iconClass}"></i>
      <h3 class="text-lg font-semibold text-white mb-2">
        ${tipo === "exito" ? "¡Éxito!" : "Error"}
      </h3>
      <p class="text-gray-300 text-sm leading-relaxed mb-4">
        ${texto}
      </p>
      <button onclick="cerrarNotificacion()" class="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all border border-white/20 hover:border-white/40">
        Cerrar
      </button>
    </div>
  `;

  modal.appendChild(messageCard);
  document.body.appendChild(modal);

  // Optimización: Cerrar con tecla Escape
  const handleEsc = (e) => {
    if (e.key === "Escape") cerrarNotificacion();
  };
  document.addEventListener("keydown", handleEsc);
  modal.handleEsc = handleEsc;

  // Auto-cerrar después de 5 segundos si es éxito
  if (tipo === "exito") {
    setTimeout(() => {
      cerrarNotificacion();
    }, 5000);
  }
}

// Función para cerrar la notificación
function cerrarNotificacion() {
  const modal = document.getElementById("notificationModal");
  if (modal) {
    // Limpiar listener de Escape
    if (modal.handleEsc) {
      document.removeEventListener("keydown", modal.handleEsc);
    }

    modal.style.animation = "fadeOut 0.3s ease-out forwards";
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}
