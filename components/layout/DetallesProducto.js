import React, { useState, useContext } from 'react';
import useCarrito from '../../hooks/useCarrito';
import { FirebaseContext } from '../../fb';
import styled from '@emotion/styled';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es, id } from 'date-fns/locale';
import Compartir from './Compartir';
import Link from 'next/link';


const Imagen = styled.img`
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    // PARA CUANDO ES MOVIL
    @media screen and (max-width: 480px) {  

        width: 80%;

    }

`;
const Producto = styled.li`
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    float: left;
    margin-bottom: 1rem;
    border-radius: 10px;
    
    :hover {
        -webkit-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.48);
        -moz-box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.48);
        box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.48);
        cursor: pointer;
    }

    // PARA CUANDO ES MOVIL
    @media screen and (max-width: 480px) {  

        width: 100%;

    }

    // CUANDO ES ESCRITORIO
    @media screen and (min-width: 480px) {  
        width: 23.5%;
        margin-right: 1.5%;
    }
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 100%;
    column-gap: auto;
`;

const Titulo = styled.a`
    font-size: 1.1rem;
    margin: 0;

    :hover {
        cursor: pointer;
    }
`;

const Comentarios = styled.div`
    margin-top:  2rem;
    display: flex;
    align-items: center;

    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        margin-right: 1rem;
        font-weight: 700px;
        &:last-of-type {
            margin: 0;
        }
    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }
    
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;


const DetallesProducto = ({producto}) => {

    const { id, comentarios, creado, descripcion, empresa, precio, nombre, url, urlimagen, votos } = producto; 
    
    return ( 
        <Producto>
            <DescripcionProducto>
                <div
                    css={css`
                        height: 250px;
                        max-height: 250px;
                        text-align: center;
                    `}
                >
                    <Link
                        href="/productos/[id]" as={`/productos/${id}`}
                    >
                        <a>
                            <Imagen 
                                src={urlimagen}
                                css={css`
                                    cursor: pointer;
                                `}
                            />
                        </a>
                    </Link>
                </div>
                <div
                    css={css`
                        padding: .5rem;
                    `}
                >
                    <div
                        css={css`
                            padding: 0px 20px;
                            height:35%;
                            text-align: left;
                        `}
                    >
                        <strong
                            css={css`
                                font-size: 12px;
                            `}
                        >${precio}</strong>
                        
                    </div>
                    <div
                        css={css`
                            height:80%;
                            padding: 0px 20px;
                        `}
                    >
                        <Link
                            href="/productos/[id]" as={`/productos/${id}`}
                        >
                                <Titulo>{nombre}</Titulo>
                        </Link>
                    </div>
                    
                </div>
            </DescripcionProducto>
        </Producto>
     );
}
 
export default DetallesProducto;