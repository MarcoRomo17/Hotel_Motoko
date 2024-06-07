import Array "mo:base/Array";

actor HTbudos {

//Se modificara y se completara
type host = {
  id : Nat;
  nombre : Text;
  cantidadHuespedes : Nat;
  habitacion : Nat;
  piso : Nat;
   diaEntrada : Text;
  diaSalida : Text
};
//Se declara arreglo en el que se van a ir guardando todos los huespedes
var huespedes : [host] = [{id =1;
                      nombre = "Nombre del titular";
                      cantidadHuespedes = 1;
                      habitacion = 1;
                      piso = 1;
                      diaEntrada ="Dia en el que llegas";
                      diaSalida ="Dia en el que te vas";}];


//funcion que guarda en el arreglo en base a los parametros
public func registrarHuesped ( NTitular : Text, CH : Nat, h :Nat, p : Nat,  DE:Text,DS:Text) : async Text{
  let IDR : Nat = Array.size(huespedes)+1;
  let huespedNuevo = {
    id = IDR;
    nombre = NTitular;
    cantidadHuespedes = CH;
    habitacion = h;
    piso = p;
    diaEntrada =DE;
    diaSalida =DS;
  };
huespedes := Array.append<host>(huespedes, [huespedNuevo]);
  return "Se pudo";
};



public func huespedesRegistrados (): async [host]{
return huespedes;
};
//Busca unico registro
public func huespedEspecifico (NTitular: Text) : async  ?host{
  return Array.find<host>(huespedes, func(n){n.nombre == NTitular})
};
//Actualiza el registrp a base de ID
public func actualizaRegistro(ID : Nat, NTitular : Text, CH : Nat, h :Nat, p : Nat, DE:Text,DS:Text): async Bool{
  let huespedesToupdate = Array.find<host>(huespedes, func(h){h.id==ID});

  switch(huespedesToupdate){
    case(null){ return false};
    case(?huespedesToupdate){
   var huespedActualizado ={
                  id =ID;
                      nombre = NTitular;
                      cantidadHuespedes = CH;
                      habitacion = h;
                      piso = p;
                      diaEntrada =DE;
                      diaSalida =DS;
                };

huespedes := Array.map<host, host>(huespedes,func(n){if (n.id == ID){huespedActualizado}else{n}} );
      return true
    };

  };
};

 public func borrarRegistro(ID : Nat, NTitular : Text  ): async Text{
var huespedABorrar : ?host = Array.find<host>(huespedes, func(huespedABorrar){huespedABorrar.id == ID and huespedABorrar.nombre==NTitular});
if(huespedABorrar != null){
huespedes := Array.filter<host>(huespedes, func(huespedABorrar) { huespedABorrar.id != ID } );
return "Simon si se pudo";
}else{
  return "No se ha eliminado correctamente";
};

 };

};