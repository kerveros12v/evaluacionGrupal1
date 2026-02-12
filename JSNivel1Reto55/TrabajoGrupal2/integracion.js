cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]
cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
}
/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let tabla = "<table><tr><th>Cuenta</th><th>Nombre y Apellido</th><th>Saldo</th></tr>";
    for (let i = 0; i < cuentas.length; i++) {
        tabla += "<tr><td>" + cuentas[i].numeroCuenta + "</td><td>" + cuentas[i].nombre + " " + cuentas[i].apellido + "</td><td>" + cuentas[i].saldo + "</td></tr>";
    }
    tabla += "</table>";
    mostrarTextoDiv("infoCuentas", tabla);
}
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
agregarCuenta = function (cuenta) {
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let encontrado = false;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == cuenta.numeroCuenta) {
            encontrado = true;
            break;
        } else {
            encontrado = false;
        }
    }
    if (!encontrado) {
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
        return true;
    }
    alert("CUENTA EXISTENTE");
    return false;
}
agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let valorCedula = recuperarTexto("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");
    let valorApellido = recuperarTexto("txtApellido");
    let valorCuenta = recuperarTexto("txtCuenta");
    let auxcuenta = {};
    auxcuenta.numeroCuenta = valorCuenta;
    auxcuenta.cedula = valorCedula;
    auxcuenta.nombre = valorNombre;
    auxcuenta.apellido = valorApellido;
    auxcuenta.saldo = 0.0;
    agregarCuenta(auxcuenta);
    mostrarCuentas();
}
ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    let campoCuenta = recuperarTexto("txtcuentaBuscar");
    let cuentaLocalizada = buscarCuenta(campoCuenta);
    if (cuentaLocalizada != null) {
        alert("Cuenta: " + cuentaLocalizada.numeroCuenta + "---Nombre: " + cuentaLocalizada.nombre + " " + cuentaLocalizada.apellido + "---Saldo: " + cuentaLocalizada.saldo);
    } else {
        alert("No existe la cuenta");
    }
}
//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos
depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto;
    let movimiento = { numeroCuenta: cuentaAfectada.cuenta, monto: monto, tipo: "C" };
    movimientos.push(movimiento);
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
        //Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
        //con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
        //y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos
        let movimiento = { numeroCuenta: cuentaAfectada.cuenta, monto: monto, tipo: "D" };
        movimientos.push(movimiento);
        alert("TRANSACCION EXITOSA");
    } else {
        //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
        alert("SALDO INSUFICIENTE");
    }

}
filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    numeroCuenta = recuperarTexto("txtNumCuenta")
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
mostrarMovimientos = function (misMovimientos) {
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
            monto = movimiento.monto * -1
        } else {
            monto = movimiento.monto
        }
        contenidoTabla +=
            "<tr><td>" + movimiento.numeroCuenta + "</td>"
            + "<td>" + monto + "</td>"
            + "<td>" + movimiento.tipo + "</td>"
            + "</tr>";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}
//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


mostrarSeccionCuentas = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
}
mostrarSeccionTransacciones = function () {
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    mostrarComponente("divTransacciones");
}
mostrarSeccionMovimientos = function () {
    ocultarComponente("divCuentas");
    mostrarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
}
