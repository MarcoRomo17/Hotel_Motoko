import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './estilos.css';
import { useState } from 'react';
import { no_backend } from '../../declarations/no_backend';
import {  useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

function BasicExample() {
    let [nombre, setNombre]=useState('');
    let [canHues, setcanHues]=useState(0);
    let [habitacion, setHabitacion]=useState(0);
    let [piso, setPiso]=useState(0);
    let [diaE, setDiaE]=useState('');
    let [diaS, setDiaS]=useState('');

    const onChangeNombre =(e)=>{
        e.preventDefault();
        const preNombre = e.target.value;
        setNombre=preNombre;

    }
    const onChangecanHues =(e)=>{
        e.preventDefault();
        const precanHues = e.target.value;
        setcanHues=precanHues;

    }
    const onChangeHabitacion =(e)=>{
        e.preventDefault();
        const preHabitacion = e.target.value;
        setHabitacion=preHabitacion;

    }
    const onChangePiso =(e)=>{
        e.preventDefault();
        const prePiso = e.target.value;
        setPiso=prePiso;

    }  
      const onChangeDiaE =(e)=>{
        e.preventDefault();
        const preDiaE = e.target.value;
        setDiaE=preDiaE;

    }
    const onChangeDiaS =(e)=>{
        e.preventDefault();
        const preDiaS = e.target.value;
        setDiaS=preDiaS;

    }
    function crearRegistro() {
        Swal.fire("Reservndo su huabitacion, por favor espere");
        Swal.showLoading();
        no_backend.registrarHuesped(nombre, BigInt(canHues),BigInt(habitacion), BigInt(piso), diaE, diaS).then(huespedes => {
            Swal.fire({
                title: "Huesped reservado",
                text: "Puede consultar sus registros para conocer su id",
                icon: "success"
              }).then().catch((err)=>{
                Swal.fire({
                    title: "Ocurrio un error",
                    text: "Intentelo más tarde",
                    icon: "error"
                  });
                  console.log("Error al registrar el huesped")
              });
        });
    }
  return (
    <>
    <div className='divfondo'>
    <Form>
        <div className='divform'>
            
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control type="text" onChange={onChangeNombre} name="nombre" placeholder="¿A nombre de quien se reservara la habitacion?" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cantidad de huespedes:</Form.Label>
        <Form.Control type="number" onChange={onChangecanHues} name="canHues" placeholder="¿Cuantos huespedes se quedaran en la habitacion?" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nuemero de habitacion:</Form.Label>
        <Form.Control type="number" onChange={onChangeHabitacion} name="habitacion" placeholder="¿Que tipo de habitacion desea?"/>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Numero de piso</Form.Label>
        <Form.Control type="number" onChange={onChangePiso} name="piso" placeholder="Escriba que numero de piso que desea"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Dia de entrada:</Form.Label>
        <Form.Control type="text" onChange={onChangeDiaE} name="diaE" placeholder="Escriba el dia que empeiza su reservacion"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Dia de salida:</Form.Label>
        <Form.Control type="text" onChange={onChangeDiaS} name="diaS" placeholder="Escriba el dia que termina su reservacion"/>
      </Form.Group>
      
<center>
      <Button variant="outline-primary" size='lg' onClick={crearRegistro}>Reservar habitacion</Button>{' '}
      </center>
      </div>
    </Form>
    </div>

    <div className='divbienv'>
      <h1 className='h1bienv'>¡Bienvenidos a hotel 19 budos!</h1>
    </div>
    </>
  );
}

export default BasicExample; 