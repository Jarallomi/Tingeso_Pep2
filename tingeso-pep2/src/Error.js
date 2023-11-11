import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Error.css'; // Asegúrate de que la ruta sea correcta

function Error() {
    return (
        <div className="container text-center">
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">¡Ha ocurrido un error en el proceso!</h4>
                <p>Lo sentimos, ha ocurrido un error durante la ejecución del proceso.</p>
                <hr />
                <p className="mb-0">Por favor, intenta de nuevo más tarde.</p>
            </div>
            <a href="/" className="btn btn-primary">Volver a Inicio</a>
        </div>
    );
}

export default Error;
