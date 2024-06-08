import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './estilos.css';
import { useState } from 'react';
import { no_backend } from '../../declarations/no_backend';
import {  useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

function FormularioHuesped(
{
mid =null,
mnombre=null,
mcantiHues=null,
mhabitacion=null,
mpiso=null,
mdEntrada=null,
mdSalida=null,
esEditable=null,
obtenerHuesped=null,
setShow=null

}


) {
    const [id, setID]=useState(mid ? mid : BigInt(0))
    const [nombre, setNombre]=useState(mnombre ? mnombre :'');
    const [cantidadHuespedes, setcanHues]=useState(mcantiHues ? mcantiHues : BigInt(0) );
    const [habitacion, setHabitacion]=useState(mhabitacion ? mhabitacion : BigInt(0));
    const [piso, setPiso]=useState(mpiso ? mpiso :BigInt(0));
    const [diaEntrada, setDiaE]=useState(mdEntrada ? mdEntrada :'');
    const [diaSalida, setDiaS]=useState(mdSalida ? mdSalida :'');

    const onChangeNombre =(e)=>{
        e.preventDefault();
        const preNombre = e.target.value;
        
        setNombre( preNombre);

    }
    const onChangecanHues =(e)=>{
        e.preventDefault();
        const precanHues = e.target.value;
        setcanHues(precanHues);

    }
    const onChangeHabitacion =(e)=>{
        e.preventDefault();
        const preHabitacion = e.target.value;
        setHabitacion(preHabitacion);

    }
    const onChangePiso =(e)=>{
        e.preventDefault();
        const prePiso = e.target.value;
        setPiso(prePiso);

    }  
      const onChangeDiaE =(e)=>{
        e.preventDefault();
        const preDiaE = e.target.value;
        setDiaE(preDiaE);

    }
    const onChangeDiaS =(e)=>{
        e.preventDefault();
        const preDiaS = e.target.value;
        setDiaS(preDiaS);

    }





    function crearRegistro() {
        Swal.fire("Reservando su habitacion, por favor espere");
        Swal.showLoading();
        no_backend.registrarHuesped(nombre, BigInt(cantidadHuespedes), 
        BigInt(habitacion), BigInt(piso), diaEntrada, diaSalida).then(huespedes => {
            Swal.fire({
                title: "Registro actualizado",
                text: "Puede consultar sus registros para conocer su id",
                icon: "success"
              }).then(console.log("Si se registro")).catch((err)=>{
                Swal.fire({
                    title: "Ocurrio un error",
                    text: "Intentelo más tarde",
                    icon: "error"
                  });
                  console.log("Error al registrar el huesped")
              });
        });
    }
  function actualizaRegistro() {
        Swal.fire("Actualizando registro");
        Swal.showLoading();
        no_backend.actualizaRegistro(BigInt(id),  nombre, BigInt(cantidadHuespedes), 
        BigInt(habitacion), BigInt(piso), diaEntrada, diaSalida).then(huespedes => {
            Swal.fire({
                title: "Huesped reservado",
                text: "Puede consultar sus registros para conocer su id",
                icon: "success"
              }).then(()=>
                {setShow(false),
                obtenerHuesped()
}).catch((err)=>{
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
        <Form.Control type="text" defaultValue={nombre} onChange={onChangeNombre} name="nombre" placeholder="¿A nombre de quien se reservara la habitacion?" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cantidad de huespedes:</Form.Label>
        <Form.Control type="number" defaultValue={cantidadHuespedes} onChange={onChangecanHues} name="canHues" placeholder="¿Cuantos huespedes se quedaran en la habitacion?" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nuemero de habitacion:</Form.Label>
        <Form.Control type="number" defaultValue={habitacion} onChange={onChangeHabitacion} name="habitacion" placeholder="¿Que tipo de habitacion desea?"/>
      </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Numero de piso</Form.Label>
        <Form.Control type="number" defaultValue={piso} onChange={onChangePiso} name="piso" placeholder="Escriba que numero de piso que desea"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Dia de entrada:</Form.Label>
        <Form.Control type="text" onChange={onChangeDiaE}  defaultValue={diaEntrada} name="diaE" placeholder="Escriba el dia que empeiza su reservacion"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Dia de salida:</Form.Label>
        <Form.Control type="text" onChange={onChangeDiaS} defaultValue={diaSalida} name="diaS" placeholder="Escriba el dia que termina su reservacion"/>
      </Form.Group>
      
<center>
      <Button variant="outline-primary" size='lg' onClick={esEditable ? actualizaRegistro : crearRegistro}>{esEditable ? 'Editar' : 'Guardar'} registro</Button>{' '}
      </center>
      </div>
    </Form>
    </div>

 
    </>
  );
}

export default FormularioHuesped; 