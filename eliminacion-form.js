/* =========================================================
   VEKTRA — LÓGICA DEL FORMULARIO DE ELIMINACIÓN
   Archivo: eliminacion-form.js
   ========================================================= */

(() => {
  "use strict";

  const form = document.getElementById("eliminacionForm");

  if (!form) return;

  const emailInput = document.getElementById("emailCuenta");
  const nameInput = document.getElementById("nombreCuenta");
  const confirmationInput = document.getElementById(
    "confirmacionEliminacion"
  );
  const submitButton = document.getElementById("submitEliminacion");
  const statusBox = document.getElementById("formStatus");

  const errors = {
    email: document.getElementById("emailError"),
    name: document.getElementById("nombreError"),
    confirmation: document.getElementById("confirmationError")
  };

  const fields = [emailInput, nameInput];

  // ---------------------------------------------------------
  // LIMPIAR ERRORES
  // ---------------------------------------------------------

  function clearErrors() {
    fields.forEach((field) => {
      field.classList.remove("input-invalid");
    });

    Object.values(errors).forEach((element) => {
      if (element) {
        element.textContent = "";
      }
    });
  }

  // ---------------------------------------------------------
  // MOSTRAR ESTADO
  // ---------------------------------------------------------

  function showStatus(message, type = "success") {
    if (!statusBox) return;

    statusBox.textContent = message;

    statusBox.className =
      type === "error"
        ? "status-error"
        : "status-success";

    statusBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  // ---------------------------------------------------------
  // VALIDAR FORMULARIO
  // ---------------------------------------------------------

  function validateForm() {
    clearErrors();

    let valid = true;

    // Correo
    if (
      !emailInput.value.trim() ||
      !emailInput.checkValidity()
    ) {
      emailInput.classList.add("input-invalid");

      errors.email.textContent =
        "Ingresa un correo electrónico válido.";

      valid = false;
    }

    // Nombre
    if (
      !nameInput.value.trim() ||
      nameInput.value.trim().length < 2
    ) {
      nameInput.classList.add("input-invalid");

      errors.name.textContent =
        "Ingresa tu nombre de usuario o nombre completo.";

      valid = false;
    }

    // Confirmación
    if (!confirmationInput.checked) {
      errors.confirmation.textContent =
        "Debes confirmar que deseas proceder con la eliminación.";

      valid = false;
    }

    // Llevar al primer campo incorrecto
    if (!valid) {
      const firstInvalid = form.querySelector(
        ".input-invalid, input:invalid"
      );

      firstInvalid?.focus();
    }

    return valid;
  }

  // ---------------------------------------------------------
  // VALIDACIÓN EN TIEMPO REAL
  // ---------------------------------------------------------

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("input-invalid");

      // Validar correo
      if (
        field === emailInput &&
        field.value &&
        emailInput.checkValidity()
      ) {
        errors.email.textContent = "";
      }

      // Validar nombre
      if (
        field === nameInput &&
        field.value.trim().length >= 2
      ) {
        errors.name.textContent = "";
      }
    });
  });

  // ---------------------------------------------------------
  // CONFIRMACIÓN
  // ---------------------------------------------------------

  confirmationInput.addEventListener("change", () => {
    if (confirmationInput.checked) {
      errors.confirmation.textContent = "";
    }
  });

  // ---------------------------------------------------------
  // ENVÍO DEL FORMULARIO
  // ---------------------------------------------------------

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Validar
    if (!validateForm()) {
      showStatus(
        "Revisa los campos indicados antes de enviar la solicitud.",
        "error"
      );

      return;
    }

    // Desactivar botón
    submitButton.disabled = true;

    const buttonText = submitButton.querySelector("span");

    if (buttonText) {
      buttonText.textContent = "Procesando solicitud…";
    }

    // Obtener información
    const formData = new FormData(form);

    const payload = {
      email: String(
        formData.get("email") || ""
      ).trim(),

      name: String(
        formData.get("name") || ""
      ).trim(),

      phone: String(
        formData.get("phone") || ""
      ).trim(),

      vehicleOrGpsId: String(
        formData.get("vehicleOrGpsId") || ""
      ).trim(),

      deletionScope: String(
        formData.get("deletionScope") || "complete"
      ),

      confirmation: Boolean(
        formData.get("confirmation")
      ),

      submittedAt: new Date().toISOString()
    };

    /*
      ========================================================
      IMPORTANTE
      ========================================================

      Este formulario actualmente funciona en el frontend,
      pero todavía NO elimina realmente la cuenta.

      Para realizar la eliminación real debes conectarlo
      a Firebase o a un backend.

      Ejemplo:

      await fetch("TU_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      ========================================================
    */

    try {
      // Mostrar los datos en consola
      console.log(
        "Solicitud de eliminación preparada:",
        payload
      );

      // Simulación de procesamiento
      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });

      // Mensaje de éxito
      showStatus(
        "La solicitud fue validada correctamente y quedó preparada para su procesamiento. " +
        "Conecta este formulario a tu backend o Firebase para ejecutar el borrado real.",
        "success"
      );

      // Limpiar formulario
      form.reset();

    } catch (error) {
      console.error(
        "Error procesando la solicitud:",
        error
      );

      showStatus(
        "No se pudo procesar la solicitud. Inténtalo nuevamente.",
        "error"
      );

    } finally {
      // Reactivar botón
      submitButton.disabled = false;

      if (buttonText) {
        buttonText.textContent =
          "Confirmar y Eliminar Mi Cuenta";
      }
    }
  });

})();