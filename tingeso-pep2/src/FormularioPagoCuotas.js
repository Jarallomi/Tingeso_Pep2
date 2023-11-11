import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormularioPagoCuotas.css';

const FormularioPagoCuotas = () => {
    const [fechaPago, setFechaPago] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const rut = query.get('rut');


    useEffect(() => {
        if (!rut) {
            // Redirige a otra página o muestra un mensaje de error si el RUT no está presente
            navigate('/');
        }
    }, [rut, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/resumen/registrarPagoCuotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rut, fechaPago }),
            });

            if (response.ok) {
                alert('Pago registrado con éxito');
                navigate('/lista'); // Redirecciona a la lista después de registrar el pago
            } else {
                // Manejo de errores en la respuesta
                const errorText = await response.text();
                alert(`Error al registrar el pago: ${errorText}`);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div className="formulario-pago-cuotas">
            <h1>Registrar Pago de Cuotas</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="rut" className="form-label">RUT del Estudiante:</label>
                    <input type="text" className="form-control" id="rut" value={rut} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="fechaPago" className="form-label">Fecha de Pago:</label>
                    <input type="date" className="form-control" id="fechaPago" required
                           onChange={(e) => setFechaPago(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Registrar Pago</button>
            </form>
        </div>
    );
};

export default FormularioPagoCuotas;
