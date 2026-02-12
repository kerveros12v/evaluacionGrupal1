movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
filtrarMovimientos=function(numeroCuenta){
    let movimientosCuenta = [];
    numeroCuenta=recuperarTexto("txtNumCuenta")
    // Se barre el arreglo de movimientos
    for (let i = 0; i < movimientos.length; i++) {
        // Verifica si el número de cuenta del movimiento es igual al que recibe como parámetro
        if (numeroCuenta == movimientos[i].numeroCuenta) {
            // Agrega el movimiento al arreglo movimientosCuenta
            movimientosCuenta.push(movimientos[i]);
        }
    }
    // Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    mostrarMovimientos(movimientosCuenta);
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, OPERACION
    let cmpTabla = document.getElementById("tablaMovimientos");
    let contenidoTabla = "<table><tr>" +
        "<th>Cuenta</th>" +
        "<th>Monto</th>" +
        "<th>Operación</th>" +
        "</tr>";
    for (let i = 0; i < misMovimientos.length; i++) {
        let movimiento = misMovimientos[i];
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
    let monto
        if (movimiento.tipo == "D") {
            monto = movimiento.monto*-1
        }else{
            monto = movimiento.monto
        }
        contenidoTabla +=
            "<tr><td>" + movimiento.numeroCuenta + "</td>"
            + "<td>" + monto + "</td>"
            + "<td>" + movimiento.tipo  + "</td>"
            + "</tr>";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;  
}




