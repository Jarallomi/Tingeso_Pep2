import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubirArchivo.css';

const SubirArchivo = () => {
    const [archivo, setArchivo] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleArchivoChange = (event) => {
        const archivoSubido = event.target.files[0];
        if (archivoSubido && archivoSubido.type === "text/csv") {
            setArchivo(archivoSubido);
            setMensaje('');
        } else {
            setMensaje('Formato de archivo no válido. Por favor, sube un archivo CSV.');
            setArchivo(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (archivo) {
            const formData = new FormData();
            formData.append('file', archivo);

            try {
                const response = await fetch('http://localhost:8080/subirArchivo/', { // Asegúrate de que la URL y el puerto sean correctos
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const mensajeRespuesta = await response.text();
                    setMensaje(mensajeRespuesta);
                } else {
                    setMensaje("Error al subir el archivo");
                }
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                setMensaje("Error al subir el archivo");
            }
        } else {
            setMensaje("Por favor, selecciona un archivo CSV.");
        }
    };

    const handleVolver = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h2>Subir Archivo CSV</h2>
            {mensaje && <p>{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleArchivoChange} accept=".csv" />
                <button type="submit">Subir Archivo</button>
            </form>
            <button onClick={handleVolver}>Volver</button>
        </div>
    );
};

export default SubirArchivo;
