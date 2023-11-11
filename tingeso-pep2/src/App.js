import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import ListaEstudiantes from './Lista';
import ListaEstudiantesB from './ListaEstudiantesB';
import RegistroEstudiante from './RegistroEstudiante';
import SubirArchivo from './SubirArchivo';
import FormularioPagoCuotas from './FormularioPagoCuotas';
import Error from './Error';

function NavigationBar() {
    let location = useLocation();

    if (location.pathname === "/") {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/lista-estudiantes">Lista de Estudiantes</Link> {/* Actualizado */}
                    </li>
                    <li>
                        <Link to="/registro-estudiante">Registro de Estudiante</Link>
                    </li>
                    <li>
                        <Link to="/subir-archivo">Subir Archivo</Link>
                    </li>
                    <li>
                        <Link to="/lista">Lista de Cuotas</Link> {/* Actualizado */}
                    </li>
                </ul>
            </nav>
        );
    }

    return null;
}

function App() {
    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/lista" element={<ListaEstudiantes />} />
                    <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
                    <Route path="/subir-archivo" element={<SubirArchivo />} />
                    <Route path="/registrarPagoCuotas" element={<FormularioPagoCuotas />} />
                    <Route path="/lista-estudiantes" element={<ListaEstudiantesB />} />
                    <Route path="/error" element={<Error />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
