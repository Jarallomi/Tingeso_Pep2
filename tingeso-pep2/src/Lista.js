import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Lista.css';

const ListaEstudiantes = () => {
    const [resumenes, setResumenes] = useState();

    // Función para formatear el dinero
    const formatMoney = (number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number);
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString || new Date(dateString).getFullYear() < 2000) { // Asumiendo que ninguna fecha relevante es anterior al año 2000
            return ''; // Devuelve un string vacío si la fecha es nula o inválida
        }
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Retorna 'YYYY-MM-DD'
    };

    // Carga de datos desde el backend
    useEffect(() => {
        fetch("http://localhost:8080/resumen/lista")
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos:", data); // Agrega esto
                setResumenes(data);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }, []);

    if (!resumenes || !Array.isArray(resumenes)) {
        return <div>Error al cargar los datos o datos no disponibles</div>;
    }

    // Si los datos aún no se han cargado, muestra un mensaje de carga
    if (!resumenes) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div className="lista-container">
            <div className="header">
                <h1>Lista de Resúmenes</h1>
                <a href="/" className="btn btn-secondary">Volver</a>
            </div>
            <table>
                <thead>
                <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Número de Exámenes</th>
                    <th>Promedio</th>
                    <th>Monto Total a Pagar</th>
                    <th>Tipo de Pago</th>
                    <th>Número de Cuotas Pactadas</th>
                    <th>Número de Cuotas Pagadas</th>
                    <th>Monto Total Pagado</th>
                    <th>Fecha Último Pago</th>
                    <th>Saldo por Pagar</th>
                    <th>Número de Cuotas en Retraso</th>
                </tr>
                </thead>
                <tbody>
                {resumenes.map((resumen, index) => (
                    <tr key={index}>
                        <td>{resumen.rut}</td>
                        <td>{resumen.nombre}</td>
                        <td>{resumen.n_examenes}</td>
                        <td>{resumen.promedio}</td>
                        <td>{formatMoney(resumen.monto_total_a_pagar)}</td>
                        <td>{resumen.tipo_de_pago}</td>
                        <td>{resumen.n_cuotas_pactadas}</td>
                        <td>{resumen.n_cuotas_pagadas}</td>
                        <td>{formatMoney(resumen.monto_total_pagado)}</td>
                        <td>{formatDate(resumen.fecha_ultimo_pago)}</td>
                        <td>{formatMoney(resumen.saldo_por_pagar)}</td>
                        <td>{resumen.n_cuotas_retraso}</td>
                        <td>
                            {resumen.n_cuotas_pactadas === resumen.n_cuotas_pagadas ? (
                                "El pago está al día"
                            ) : (
                                <Link to={`/registrarPagoCuotas?rut=${resumen.rut}`} className="btn btn-primary btn-sm">
                                    Pagar Cuotas
                                </Link>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaEstudiantes;
