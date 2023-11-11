import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistroEstudiante.css'; // Asume que los estilos están en RegistroEstudiante.css

const RegistroEstudiante = () => {
    const [estudiante, setEstudiante] = useState({
        rut: '',
        apellidos: '',
        nombres: '',
        fecha_nacimiento: '',
        tipo_colegio: 'Municipal',
        nombre_colegio: '',
        anio_egreso: '',
        tipo_pago: 'Contado',
        n_cuotas: '1', // Se inicializa a 1
    });

    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tipo_pago') {
            setEstudiante({
                ...estudiante,
                tipo_pago: value,
                n_cuotas: value === 'Contado' ? '1' : estudiante.n_cuotas,
            });
        } else {
            setEstudiante({
                ...estudiante,
                [name]: value,
            });
        }
    };

    const resetForm = () => {
        setEstudiante({
            rut: '',
            apellidos: '',
            nombres: '',
            fecha_nacimiento: '',
            tipo_colegio: 'Municipal',
            nombre_colegio: '',
            anio_egreso: '',
            tipo_pago: 'Contado',
            n_cuotas: '1',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const camposObligatorios = [
            'rut', 'apellidos', 'nombres', 'fecha_nacimiento',
            'tipo_colegio', 'nombre_colegio', 'anio_egreso', 'tipo_pago', 'n_cuotas'
        ];

        let esValido = camposObligatorios.every(campo => estudiante[campo].trim() !== '');

        if (!esValido) {
            setMensaje('Por favor, completa todos los campos requeridos.');
            setError(true);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estudiante)
        };

        try {
            const response = await fetch('http://localhost:8080/estudiantes/guardarEstudiante', requestOptions);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            //const data = await response.json();
            setMensaje('Estudiante registrado con éxito');
            setError(false);
            resetForm();
        } catch (error) {
            setMensaje('Error al registrar el estudiante');
            setError(true);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>RUT:</label>
                    <input
                        name="rut"
                        value={estudiante.rut}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input
                        name="apellidos"
                        value={estudiante.apellidos}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Nombres:</label>
                    <input
                        name="nombres"
                        value={estudiante.nombres}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={estudiante.fecha_nacimiento}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Tipo de Colegio:</label>
                    <select
                        name="tipo_colegio"
                        value={estudiante.tipo_colegio}
                        onChange={handleInputChange}
                    >
                        <option value="Municipal">Municipal</option>
                        <option value="Subvencionado">Subvencionado</option>
                        <option value="Privado">Privado</option>
                    </select>
                </div>
                <div>
                    <label>Nombre de Colegio:</label>
                    <input
                        name="nombre_colegio"
                        value={estudiante.nombre_colegio}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Año de Egreso:</label>
                    <input
                        type="number"
                        name="anio_egreso"
                        value={estudiante.anio_egreso}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Tipo de Pago:</label>
                    <select
                        name="tipo_pago"
                        value={estudiante.tipo_pago}
                        onChange={handleInputChange}
                    >
                        <option value="Contado">Contado</option>
                        <option value="Cuotas">Cuotas</option>
                    </select>
                </div>
                {estudiante.tipo_pago === 'Cuotas' && (
                    <div>
                        <label>Número de Cuotas:</label>
                        <input
                            type="number"
                            name="n_cuotas"
                            value={estudiante.n_cuotas}
                            onChange={handleInputChange}
                            min={estudiante.tipo_colegio === 'Municipal' ? 2 : estudiante.tipo_colegio === 'Subvencionado' ? 2 : 2}
                            max={estudiante.tipo_colegio === 'Municipal' ? 10 : estudiante.tipo_colegio === 'Subvencionado' ? 7 : 4}
                        />
                    </div>
                )}
                <button type="submit">Registrar Estudiante</button>
            </form>
            {mensaje && (
                <div style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
                    {mensaje}
                </div>
            )}
            <button onClick={handleBack}>Volver</button>
        </div>
    );
};

export default RegistroEstudiante;
