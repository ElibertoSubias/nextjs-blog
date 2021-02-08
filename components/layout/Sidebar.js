import React, { useContext, useEffect } from 'react';
import Menu from './Menu';
import Link from 'next/link';
import styled from '@emotion/styled';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import { FirebaseContext } from '../../fb';

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 1;
    text-align: center;
    font-weight: 700;
    font-family: 'Poiret One', serif;
    margin: 0rem;
    padding: 0px;
    letter-spacing: 2px;
`;

const SidebarContenedor = styled.aside`

    @media (min-width: 768px) {

        background-color: #dcdcdc;
        flex: 0 0 300px;

    }


    /* BARRA LATERAL */
    height: 100%;
    padding: 1rem 2rem;
    max-width: 250px;
    width: 20%;
    background-color: #dcdcdc;
    position: fixed;
`;
const Sidebar = () => {
    
    const { usuario, firebase } = useContext(FirebaseContext);

    return (
        <SidebarContenedor>
            
            <div
                css={css`
                    text-align:center;
                    height: 40%;
                `}
            >
                <Link href="/">
                    <a><Logo>Pedidos
                        Online</Logo></a>
                </Link>
                <span
                    
                ></span>
                
                { usuario ? (
                    <>
                        <img 
                        alt="perfil" 
                        src="/static/img/perfil-default.jpg"
                        css={css`
                            margin-top: 2rem;
                            height: 95px;
                            width: 95px;
                            background-color: #bbb;
                            border-radius: 50%;
                            display: inline-block;
                        `}
                    />
                        <p
                            css={css`
                            margin: 0rem;
                            `}
                        >Hola, { usuario.displayName }</p>

                        {/* <Boton
                            bgColor="true"
                            onClick={() => firebase.cerrarSesion()}
                        >Cerrar Sesión</Boton> */}
                    </>

                ) : (

                    <>
                        {/* <Link href="/login">
                            <Boton
                                bgColor="true"
                            >Login</Boton>
                        </Link>
                        <Link href="/crear-cuenta">
                            <Boton>Crear Cuenta</Boton>
                        </Link> */}
                    </>

                )}
            </div>
            <Menu/>
            <footer
                css={css`
                    height:  20%;
                    font-size: 10px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: -2rem;
                    font-weight: 700;
                    font-family: 'Roboto Slab', serif;
                `}
            >
                <span>
                    PedidosOnline<br></br>
                    Todos los derechos reservados<br></br>
                    &copy;{new Date().getFullYear()}<br></br>
                    Desarrollado por Eliberto Subias
                </span>
            </footer>
        </SidebarContenedor>
    )
}

export default Sidebar;