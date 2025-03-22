const GuardarEnSheets = async (datosFormulario) => {
    const url = "https://script.google.com/macros/s/AKfycbx3NCO_a-UrYtqJrXsYslhKnmlKe0uHzZ2jhm4FRRU3PwZNrZcidUhRKtq-5VT6_-YymA/exec"; // Reemplaza con tu URL del script de Google Apps
  console.log(JSON.stringify(datosFormulario))
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors", // Google Apps Script no necesita CORS
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
  console.log(response)
      console.log("Datos enviados a Google Sheets");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  
  export default GuardarEnSheets;
  