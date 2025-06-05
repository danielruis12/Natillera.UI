var URLBase = "http://natillera2025.runasp.net/";
jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaClientes();
});
function LlenarTablaClientes() {
    let URL = URLBase + "api/Clientes/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblClientes");
}
async function EjecutarComando(Metodo, Funcion) {
    let URL = URLBase + "api/Clientes/" + Funcion;
    const cliente = new Cliente($("#txtDocumento").val(), $("#txtNombre").val(), $("#txtApellido").val(), $("#txtCorreo").val(), $("#txtTelefono").val(),
        $("#txtDireccion").val(), $("#txtFechaRegistro").val());
    const rpta = await EjecutarComandoServicioAuth(Metodo, URL, cliente);
    LlenarTablaEmpleados();
}
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    let URL = URLBase + "api/Clientes/ConsultarXDocumento?Documento=" + Documento;
    const cliente = await ConsultarServicioAuth(URL);
    if (cliente == null || cliente == undefined) {
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo realizar la consulta del cliente");
        $("#txtNombre").val("");
        $("#txtApellido").val("");
        $("#txtCorreo").val("");
        $("#txtTelefono").val("");
        $("#txtDireccion").val("");
        $("#txtFechaRegistro").val("");
    }
    else {
        $("#dvMensaje").removeClass("alert alert-danger");
        $("#dvMensaje").addClass("alert alert-success");
        $("#dvMensaje").html("");
        //Consultó el cliente
        $("#txtNombre").val(cliente.Nombre);
        $("#txtApellido").val(cliente.Apellido);
        $("#txtCorreo").val(cliente.Correo);
        $("#txtTelefono").val(cliente.Telefono);
        $("#txtDireccion").val(cliente.Direccion);
        $("#txtFechaRegistro").val(cliente.FechaRegistro.split('T')[0]);
    }
}
class Cliente {
    constructor(Documento, Nombre, Apellido, Correo, Telefono, Direccion, FechaRegistro) {
        this.Documento = Documento;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Correo = Correo;
        this.Telefono = Telefono;
        this.Direccion = Direccion;
        this.FechaRegistro = FechaRegistro;
    }
}