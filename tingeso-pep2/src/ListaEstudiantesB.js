import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ListaEstudiantesB.css';

const ListaEstudiantesB = () => {
    const [estudiantes, setEstudiantes] = useState([]);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };


    // Carga de datos desde el backend
    useEffect(() => {
        fetch("http://localhost:8080/estudiantes/")
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos:", data);
                setEstudiantes(data);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }, []);

    if (!estudiantes || estudiantes.length === 0) {
        return <div>Error al cargar los datos o datos no disponibles</div>;
    }

    return (
        <div className="lista-container">
            <div className="header">
                <h1>Lista de Estudiantes</h1>
                <Link to="/" className="btn btn-secondary">Volver</Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>RUT</th>
                    <th>Apellidos</th>
                    <th>Nombres</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Tipo de Colegio</th>
                    <th>Nombre del Colegio</th>
                    <th>Año de Egreso</th>
                    <th>Tipo de Pago</th>
                    <th>Número de Cuotas</th>
                </tr>
                </thead>
                <tbody>
                {estudiantes.map((estudiante, index) => (
                    <tr key={index}>
                        <td>{estudiante.rut}</td>
                        <td>{estudiante.apellidos}</td>
                        <td>{estudiante.nombres}</td>
                        <td>{formatDate(estudiante.fecha_nacimiento)}</td>
                        <td>{estudiante.tipo_colegio}</td>
                        <td>{estudiante.nombre_colegio}</td>
                        <td>{estudiante.anio_egreso}</td>
                        <td>{estudiante.tipo_pago}</td>
                        <td>{estudiante.n_cuotas}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaEstudiantesB;
