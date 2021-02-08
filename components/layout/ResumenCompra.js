import React, { useContext, useState } from 'react';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../fb';

const ContenedorResumen = styled.div`
    text-align: center;
    width: 40%;
    float: right;
    background: #cecbcb;

    table {
        width: 100%;
        margin-bottom: 5rem;
    }
`;

const ResumenCompra = ({carrito}) => {

    const [ producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const { firebase, usuario } = useContext(FirebaseContext);



    const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection('productos').doc(carrito.idProducto);
        const producto = await productoQuery.get();
        if (producto.exists) {
            guardarProducto(producto.data());
        } else {
            guardarError(true);
        }
    }

    if (Object.keys(producto).length === 0) {
        obtenerProducto();            
    }

    const { nombre, precio } = producto;

    return ( 
        <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>{carrito.cantidad}</td>
            <td></td>
            {carrito.cantidad > 1 ? <td>${producto.precio*carrito.cantidad}</td> : <td>${producto.precio}</td> }
        </tr>
     );
}
 
export default ResumenCompra;