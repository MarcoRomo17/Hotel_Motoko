import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './estilos.css';
import { useEffect, useState } from 'react';
import { no_backend } from '../../declarations/no_backend';
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

function HuesRes() {
    const [huespedes, setHuesped] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        obtenerHuesped();
    }, []);

    function obtenerHuesped() {
        Swal.fire("Cargando...");
        Swal.showLoading();
        no_backend.huespedesRegistrados().then(huesped => {
            setHuesped(huesped);
        Swal.close();
        });


    }
    return (
        <>
            <div className='divfondo'>

                
                <Table responsive hover bordered  >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre del titular</th>
                            <th>Cantidad de huespedes</th>
                            <th>Habitación</th>
                            <th>Piso</th>
                            <th>Día de entrada</th>
                            <th>Día de salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            huespedes.length > 0 ?
                                huespedes.map((huesped) => (
                                    <tr>
                                        <td>{Number(huesped.id)}</td>
                                        <td>{huesped.nombre}</td>
                                        <td>{Number(huesped.cantidadHuespedes)}</td>
                                        <td>{Number(huesped.habitacion)}</td>
                                        <td>{Number(huesped.piso)}</td>
                                        <td>{huesped.diaEntrada}</td>
                                        <td>{huesped.diaSalida}</td>
                                    </tr>
                                ))
                                : <tr></tr>
                        }
                    </tbody>
                </Table>
                <Button size="lg" variant="outline-success" onClick={()=>navigate('/Huesped')}>Registrar huesped</Button>
              
                
            </div>


        </>
    );
}

export default HuesRes;