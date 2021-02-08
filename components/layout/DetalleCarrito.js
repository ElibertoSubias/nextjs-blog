import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../fb';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const Titulo = styled.p`
    font-size: 1.5rem;
    @media screen and (max-width: 800px){
        font-size: 1.0rem;
    }
    font-weight: bold;
    margin: 0;

    :hover {
        cursor: pointer;
    }
`;

const Imagen = styled.img`
    width: 100px;
    height: 100px;
`;
const Producto = styled.li`
    padding: 1rem 0;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
    text-align: left;
    @media screen and (max-width: 800px){
        grid-template-columns: 2fr;
    }
`;

const DetalleCarrito = ({item}) => {

    const { idProducto, cantidad } = item;
    const [ producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);

    const { firebase, usuario } = useContext(FirebaseContext);



    const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection('productos').doc(idProducto);
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

    // eliminar un producto de la bd del carrito
    const eliminarDelCarrito = async (item) => {

        if (!usuario) {
            return Router.push('/login');
        }

        try {

            await firebase.db.collection('carrito').doc(item.id).delete();
            Router.push('/');
            
        } catch (error) {
            console.log(error);
        }
    }

    const { nombre, urlimagen, precio } = producto;

    return ( 
        <tr>
            <td
                css={css`
                    width: 400px;
                `}
            >
                <Link
                    href="/productos/[id]" as={`/productos/${idProducto}`}
                >
                    <a>
                    <DescripcionProducto>
                        <div>
                            <Titulo>{nombre}</Titulo>
                        </div>
                        <div>
                            <Imagen 
                                src={urlimagen}
                                css={css`
                                    cursor: pointer;
                                `}
                            />
                        </div>
                    </DescripcionProducto>
                    </a>
                </Link>
            </td>
            <td>
                <p>{cantidad}</p>
            </td>
            <td>
                <p>${precio}</p>
            </td>
            <td>
                {cantidad > 1 ? <p>${cantidad*precio}</p> : <p>${precio}</p>}
            </td>
            <td>
                {/* <img
                    src="/static/img/buscar.png"
                    css={css`
                        width: 25px;
                        height: 25px;
                    `}
                /> */}
                <input 
                    type="button" 
                    value="Eliminar" 
                    onClick={() => eliminarDelCarrito(item)}
                />
            </td>
        </tr>
     );
}
 
export default DetalleCarrito;