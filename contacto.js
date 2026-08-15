    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("contactForm");
      if (!form) return;

      const WHATSAPP_NUMBER = "593998870608";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre")?.value.trim() || "";
        const telefono = document.getElementById("telefono")?.value.trim() || "";
        const servicio = document.getElementById("servicio")?.value.trim() || "";
        const mensaje = document.getElementById("mensaje")?.value.trim() || "";

        if (!nombre || !telefono) {
          form.reportValidity();
          return;
        }

        const texto = [
          "Hola VEKTRA, quiero solicitar información sobre rastreo GPS.",
          "",
          `Nombre: ${nombre}`,
          `Teléfono / WhatsApp: ${telefono}`,
          `Servicio de interés: ${servicio || "No especificado"}`,
          `Mensaje: ${mensaje || "No especificado"}`,
        ].join("\n");

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank", "noopener,noreferrer");
      });
    });