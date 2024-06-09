import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Table, Modal} from 'react-bootstrap';

import './estilos.css';
import { useEffect, useState } from 'react';
import { no_backend } from '../../declarations/no_backend';
import { Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import FormularioHuesped from './FormularioHuesped';


function HuesRes() {
    const [huespedes, setHuesped] = useState([]);
    const [huesped, setHuesped1] = useState({});
    const [show, setShow] = useState(false);
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
 
    function obtenerUnHuesped(id) {
        Swal.fire("Cambiando...");
        Swal.showLoading();
        no_backend.huespedEspecifico(BigInt(id)).then(huesped => {
            console.log(huesped)
            setHuesped1(huesped.shift());
        Swal.close();
        setShow(true);
        });
        
    }

    function eliminarRegistro(id) {
        Swal.fire("Eliminando registro...");
        Swal.showLoading();
        no_backend.borrarRegistro(BigInt(id)).then(huesped => {
            console.log('Se elimino con exito');
        Swal.close();
        obtenerHuesped();

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
                            <th>Opciones</th>
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
                                        <td><Button variant='warning' onClick={()=> obtenerUnHuesped(Number(huesped.id))}> Modificar reservacion</Button>
                                        <Button variant='danger' onClick={()=> eliminarRegistro(Number(huesped.id))}>Cancelar reservacion</Button></td>
                                    </tr>
                                ))
                                : <tr></tr>
                        }
                        
                    </tbody>
                </Table>
                <Button size="lg" variant="outline-success" onClick={()=>navigate('/Huesped')}>Registrar huesped</Button>
              
                
            </div>
<Modal show={show}>
    <Modal.Header closeButton ><Modal.Title>Edita</Modal.Title></Modal.Header>
    <Modal.Body>  
          <FormularioHuesped 
    mid ={Number(huesped.id)}
    mnombre={huesped.nombre}
    mcantiHues={Number(huesped.cantidadHuespedes)}
    mhabitacion={Number(huesped.habitacion)}
    mpiso={Number(huesped.piso)}
    mdEntrada={huesped.diaEntrada}
    mdSalida={huesped.diaSalida}
    esEditable={true}
    obtenerHuesped={obtenerHuesped}
    setShow={setShow}
    />

    </Modal.Body>

</Modal>

        </>
    );
}

export default HuesRes;