export default function validarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del usuario
    if (!valores.txtNombre) {
        errores.txtNombre = "El nombre es obligatorio";
    }

    // validar la empresa
    if (!valores.txtEmpresa) {
        errores.txtEmpresa = "Nombre de la Empresa es obligatorio";
    }

    // validar el precio
    if (!valores.txtPrecio) {
        errores.txtPrecio = "El Precio del producto es obligatorio";
    }

    // validar el url
    if (!valores.txtUrl) {
        errores.txtUrl = "El url del producto es obligatorio";
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.txtUrl) ) {
        errores.txtUrl = "El url no es valida";
    }

    if (!valores.txtDescripcion) {
        errores.txtDescripcion = "Agrega una descripción de tu producto";
    }

    return errores;

}