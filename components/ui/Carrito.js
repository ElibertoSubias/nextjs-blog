import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import useCarrito from '../../hooks/useCarrito';

const CantidadProductos = styled.span`
    text-align: center;
    position: absolute; z-index: 90;
    margin: -10px 10px;
    font-size: 1.3rem;
    color: red;
    font-weight: 700;
    margin-top: 3px;
    @media screen and (max-width: 800px){ 
        margin-top: -5px;
        font-size: 1.0rem;
    }
    margin-left: -10px;
`;

const Carrito = () => {

    const { carrito } = useCarrito('creado');

    return ( 
        
        <Link
            href="/carrito"
        >
            <a>
                <i aria-hidden='true' className='fa fa-shopping-cart'></i>
                { carrito.length ? (
                    <>
                        <CantidadProductos>{carrito.length}</CantidadProductos>
                    </>

                ) : (

                    null

                )}
            </a>
        </Link>
     );
}
 
export default Carrito;