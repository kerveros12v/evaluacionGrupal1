cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");

}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            cuentaEncontrada = cuentas[i];
            break;
        }
    }
    return cuentaEncontrada;
}

ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let campoCuenta = recuperarTexto("txtcuentaBuscar");
    let cuentaLocalizada = buscarCuenta(campoCuenta);
    if (cuentaLocalizada != null) {
        alert("Cuenta: "+cuentaLocalizada.numeroCuenta + "---Nombre: " + cuentaLocalizada.nombre + " " + cuentaLocalizada.apellido + "---Saldo: " + cuentaLocalizada.saldo);
    } else {
        alert("No existe la cuenta");
    }
}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto;
}

ejecutarDeposito = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    let campoCuenta = recuperarTexto("txtcuentaBuscar");

    //Toma el monto ingresado en la caja de texto
    let campoMonto = recuperarFloat("txtmonto");

    //invoca a depositar
    depositar(campoCuenta, campoMonto);
    //Muestra un mensaje TRANSACCION EXITOSA
   // alert("TRANSACCION EXITOSA");
    //Muestra en pantalla el nuevo saldo de la cuenta
    alert("Saldo actual: " + buscarCuenta(campoCuenta).saldo);
}
ejecutarRetirar = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    let campoCuenta = recuperarTexto("txtcuentaBuscar");

    //Toma el monto ingresado en la caja de texto
    let campoMonto = recuperarFloat("txtmonto");

    //invoca a retirar
    retirar(campoCuenta, campoMonto);
    //Muestra un mensaje TRANSACCION EXITOSA
   // alert("TRANSACCION EXITOSA");
    //Muestra en pantalla el nuevo saldo de la cuenta
    alert("Saldo actual: " + buscarCuenta(campoCuenta).saldo);
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    if (cuentaAfectada.saldo > monto) {
        //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
        cuentaAfectada.saldo -= monto;
         //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
         alert("TRANSACCION EXITOSA");
    } else {
        //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
        alert("SALDO INSUFICIENTE");
    }
   
}
