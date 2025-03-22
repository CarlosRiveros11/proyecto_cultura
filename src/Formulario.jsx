import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { generarPDF } from "./generatePDF";
import logo from "./assets/logos/sflogosvg.png";
import logo4 from "./assets/logos/SF3.jpg";
import logo9 from "./assets/logos/imgtestsanfer.jpg";
import logo10 from "./assets/logos/imgtest2.jpg";
import panoramica from "./assets/logos/FOTO_PANORAMICA_SF_1.jpg";
import panoramica2 from "./assets/logos/FOTO_PANORAMICA_SF_2.jpg";
import GuardarEnSheets from "./GuardarEnSheets";

function Formulario() {
  const [formData, setFormData] = useState({
    //nombreSolicitante: "",
    //cargo: "",
    //encargadoArea: "",
    //fechaHoy: "",
    nombre_alumno: "",
    apellidos_alumno: "",
    edad: "",
    domicilio: "",
    institucion: "",
    contacto: "",
    taller: "",
    informacion_relevante: "",
    nombre_apellido_apoderado: "",
    telefono_apoderado: "",
    correo_apoderado: "",
    nombre_contacto_adicional: "",
    telefono_contacto_adicional: "",
    informacion_relevante: "",
    peticion: "",
    finalidad: "", // Nuevo campo añadido aquí
    informe: "" , 
    descripcionInforme: "",
    documento1: false,  // 👈 Ahora es un booleano en vez de una cadena vacía
    documento2: false,  // 👈 Ahora es un booleano en vez de una cadena vacía
    documento3: false,  // 👈 Ahora es un booleano en vez de una cadena vacía
  });

  const [currentBackground, setCurrentBackground] = useState(panoramica2); // La imagen fija al inicio de la pagina, antes de la rotacion 
  //const logos = [panoramica2]; // estas son las imagenes que van a ir rotando 
  const [isFading, setIsFading] = useState(false);

  // useEffect es la función que genera el bucle de imagenes quye estan guardadas en const logos
 /* useEffect(() => {                           
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentBackground((prevBackground) => {
          const currentIndex = logos.indexOf(prevBackground);
          const nextIndex = (currentIndex + 1) % logos.length;
          return logos[nextIndex];
        });
        setIsFading(false);
      }, 2000); // Ajustar el tiempo de transición para mayor suavidad
    }, 7000);

    return () => clearInterval(interval);
  }, []);
*/

/*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
*/
// Este es el nuevo handleChange que permite marcar y desmarcar las casillas de los documentos a adjuntar
  
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,  // 👈 Maneja checkboxes y inputs de texto
    }));
  };


  
  const handleGeneratePDF = () => {
    generarPDF(formData);
    toast.success("PDF generado exitosamente");
  };
  
  //Indica los campos que son obligatorios para obtener la visuualización del formulario. Además '&&' (es sintaxis) dice que se debe ingresar otro campo. Cuando ya no hay mas campos que agregar entonces no se coloca &&
  const isFormComplete = () => {
    return (
      //formData.nombreSolicitante && 
      formData.nombre_alumno &&  
      formData.apellidos_alumno &&  
      formData.edad &&
      formData.domicilio &&
      formData.institucion &&
      formData.contacto && 
      formData.taller &&
      //formData.cargo &&
      //formData.encargadoArea &&
      //formData.finalidad &&
      formData.informe &&
      formData.descripcionInforme &&
      formData.documento1 && // Verificar si Documento 1 está marcado (dejar esta linea solo en caso de que este documento sea obligatorio)
      //formData.documento2 && // Verificar si Documento 2 está marcado (dejar esta linea solo en caso de que este documento sea obligatorio)
      formData.documento3 // Verificar si Documento 3 está marcado (dejar esta linea solo en caso de que este documento sea obligatorio)
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    GuardarEnSheets(formData);
    alert("Datos enviados correctamente");
  };

  /*
  const enviarDatos = async (formData) => {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyBHuoDkD_NxWNkHc7udUYGw6f3MfcZYqNxUo7n0BMJnMfl7kmb6Qs5vAHAR8P51EDYKQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
    console.log("Respuesta del servidor:", data);
  };*/
  

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 2s cubic-bezier(0.77, 0, 0.175, 1)", // Ajustar la duración de la transición
      }}
    >
      <Toaster />
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-200 p-4 mb-6 rounded relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-2000`} // Ajustar duración para la transición de opacidad
          >
            <img src={logo4} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-50"></div>
          </div>

          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            <img src={logo} className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="w-full justify-between bg-blue-500 text-white text-center py-2 rounded-md shadow-md mb-2">
                <span className="text-lg font-bold uppercase tracking-wide">Datos del alumno</span>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Campos del formulario */}
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre del alumno 
            </label>
            <input
              name="nombre_alumno"
              value={formData.nombre_alumno}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el nombre y apellido de la persona que este llenando el formulario"
              required
            />
          </div>
          
          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Apellidos del alumno 
            </label>
            <input
              name="apellidos_alumno"
              value={formData.apellidos_alumno}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el nombre y apellido de la persona que este llenando el formulario"
              required
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Edad
            </label>
            <input
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              min="0"
              step="1"
              placeholder="Ingrese edad"
              required
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Domicilio
            </label>
            <input
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese contacto"
              required
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Institución educativa a la que pertenece
            </label>
            <input
              name="institucion"
              value={formData.institucion}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese contacto"
              required
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              contacto
            </label>
            <input
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
              maxLength={20}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese contacto"
              required
            />
          </div>

          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Taller al que se inscribe
            </label>
            <div className="relative">
              <select
                name="taller"
                value={formData.taller}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled hidden>Seleccione una taller</option>  {/* ✅ No aparece luego de seleccionar */}
                <option value="Taller 1">Taller 1</option>
                <option value="Taller 2">Taller 2</option>
                <option value="Taller 3">Taller 3</option>
                <option value="Taller 4">Taller 4</option>
                <option value="Taller 5">Taller 5</option>
                <option value="Taller 6">Taller 6</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Información relevante (opcional) {/* Nuevo campo añadido aquí */}
            </label>
            <textarea
              name="informacion_relevante"
              value={formData.informacion_relevante}
              onChange={handleChange}
              maxLength={200}  
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Ingresar información relevante adicional"
            />
          </div>

          <div className="w-full px-3 mb-6">
          <div className="w-full justify-between bg-blue-500 text-white text-center py-2 rounded-md shadow-md mb-2">
                <span className="text-lg font-bold uppercase tracking-wide">Datos del apoderado</span>
          </div>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre y Apellido del apoderado
            </label>
            <input
              name="nombre_apellido_apoderado"
              value={formData.nombre_apellido_apoderado}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el nombre y apellido del apoderado"
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Teléfono del apoderado
            </label>
            <input
              name="telefono_apoderado"
              value={formData.telefono_apoderado} 
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el telefono del apoderado"
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Correo del apoderado
            </label>
            <input
              name="correo_apoderado"
              value={formData.correo_apoderado}
              onChange={handleChange} 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese correo del apoderado"
              required
            />
          </div>

          <div className="w-full px-3 mb-2">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nombre de un contacto adicional
            </label>
            <input
              name="nombre_contacto_adicional"
              value={formData.nombre_contacto_adicional}
              onChange={handleChange} 
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Ingrese el nombre del contacto adicional"
              required
            />
          </div>

          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Teléfono del contacto adicional
            </label>
            <input
              name="telefono_contacto_adicional"
              value={formData.telefono_contacto_adicional} 
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Ingrese el telefono del contacto adicional"
            />
          </div>

          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Informe o Dato en Bruto
            </label>
            <div className="relative">
              <select
                name="informe"
                value={formData.informe}
                onChange={handleChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled hidden>Seleccione una opción</option>  {/* ✅ Ahora solo aparece al inicio */}
                <option value="Informe">Informe</option>
                <option value="Dato en Bruto">Dato en bruto</option>
                <option value="Ambos">Ambos</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          {["Informe", "Ambos"].includes(formData.informe) && (
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Descripción del Informe
              </label>
              <textarea
                name="descripcionInforme"
                value={formData.descripcionInforme}
                onChange={handleChange}
                maxLength={300}  
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Describa el informe requerido"
              />
            </div>
          )}

          <div className="w-full px-3 mb-6">
            <div className="w-full justify-between bg-blue-500 text-white text-center py-2 rounded-md shadow-md mb-2">
                <span className="text-lg font-bold uppercase tracking-wide">Documentos adjuntos</span>
            </div> 
            <div className="flex flex-col"> 
              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  name="documento1"
                  className="form-checkbox"
                  checked={formData.documento1}
                  onChange={handleChange}
                />
                <span className="ml-2">Documento 1</span>
              </label>

              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  name="documento2"
                  className="form-checkbox"
                  checked={formData.documento2}
                  onChange={handleChange}
                />
                <span className="ml-2">Documento 2</span>
              </label>

              <label className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  name="documento3"
                  className="form-checkbox"
                  checked={formData.documento3}
                  onChange={handleChange}
                />
                <span className="ml-2">Documento 3</span>
              </label>
            </div>
          </div>

        </div>

        {/*
        <button
          type="button" onClick={handleGeneratePDF}
          disabled={!isFormComplete()} // ✅ Se deshabilita si falta algún campo obligatorio
          className={`w-full p-3 rounded mt-4 ${
            isFormComplete() ? "bg-lime-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Visualizar PDF
        </button>
        */}

        {/* Botón para enviar a Google Sheets */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSubmit}
        >
          Enviar
        </button>

      </div>
    </div>
  );

}
  

export default Formulario;
