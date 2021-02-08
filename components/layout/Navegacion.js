import React, { useContext } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../fb';
import Carrito from '../ui/Carrito';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';

const Nav = styled.nav`

    background: #F1F1F1;/* color de la barra*/
    color: #333;/*color de las tres barritas*/
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.05);
    width:100%;
    position:fixed; 
    z-index:101;

    @media screen and (max-width: 800px){
        .ocultar-icono {
            display: none !important;
        }
    }
    .barra{
        /*width:1020px;ancho del blog*/
        margin:0 auto;
        position: relative;
    }
    ul, li{
        margin: 0px auto;
        padding:0 0;
        list-style:none;
    }
    .iconos{
        float:right;
        margin-right: 50px;
    }
    li{
        float:left;
        display:inline;
        position:relative;
        font: 11px Arial, sans-serif;/*tamaño y fuente del texto */
    }
    ul a{
        display: block;
        line-height: 50px;
        padding: 0 14px;
        text-decoration: uppercase;
        color: #333;/*color del texto*/
        text-transform: uppercase;
        letter-spacing: 1.5px;/*espacio entre letras*/
    }
    li a:hover{
        color: #999;/* color del texto al pasar el ratón*/
        text-decoration: none;
        -webkit-transition: all .1s ease-in-out;
        -moz-transition: all .1s ease-in-out;
        -ms-transition: all .1s ease-in-out;
        -o-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
    }
    input{
        display:none;
        margin:0 0;
        padding:0 0;
        width:50px;
        height:50px;
        opacity:0;
        cursor:pointer
    }
    label{
        display:none;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 17px;
        vertical-align: middle;
    }
    ul.menus{
        height: auto;
        overflow: hidden;
        width: 170px;
        background: #F1F1F1;/*color del fondo del submenu*/
        position: absolute;
        z-index: 99;
        display: none;
        border: 1px solid rgba(0,0,0,.05);
    }
    ul.menus li{
        display: block;
        width: 100%;
    font: 11px  Arial, sans-serif;/*tamaño y fuente del  texto del submenu*/
        text-transform: uppercase;
        border-bottom: 1px solid #E9E9E9;
    }
    ul.menus li:last-child{
        border-bottom:none;
    }
    ul.menus a{
        color: #333;/*color del  texto del submenu*/
        line-height: 35px;
    }
    li:hover ul.menus{
        display:block;
    }
    ul.menus a:hover{
        color: #999;/*color del  texto del submenu al pasar el ratón*/
        -webkit-transition: all .1s ease-in-out;
        -moz-transition: all .1s ease-in-out;
        -ms-transition: all .1s ease-in-out;
        -o-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
    }
    .iconos a{
        padding: 0 10px;
        height: 50px;
        display: inline-block;
    }
    .iconos .fa{
        font-size:14px;
        line-height: 50px;
        color: #333;/*color del icono social*/
        -webkit-transition: all .1s ease-in-out;
        -moz-transition: all .1s ease-in-out;
        -ms-transition: all .1s ease-in-out;
        -o-transition: all .1s ease-in-out;
        transition: all .1s ease-in-out;
    }
    ul .fa{
        font-size: 8px;
        position: relative;
        top: -1px;
    }
    .iconos .fa:hover{
        color: #999;/*color del icono social al pasar el ratón*/
    }
    .iconos::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: #000;
        margin-left: 5px;
        opacity: .1;
    }
    #buscador {
        position:absolute;
        right:0;
        
        @media screen and (max-width: 800px){ 
            margin-right: 35px;
        }
        top:0px;
        width:50px;
        text-align:center;
    }
    #buscador a {
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        color: #333;
        display: block;
        -webkit-transition: all 0.2s linear;
        -moz-transition: all 0.2s linear;
        -ms-transition: all 0.2s linear;
        -o-transition: all 0.2s linear;
        transition: all 0.2s linear;
        width: 50px;
    }
    #buscador a:hover {
        color:#999;
    }
    .busqueda{
        position:absolute;
        top:50px;
        right:0px;
        display:none;
        z-index:10000;
    }
    .busqueda #searchform input#s {
        border: 1px solid #e5e5e5;
        width:190px;
        background:#FFF;
        padding: 7px 10px;
        font-size: 12px;
        color: #999;
        letter-spacing: 1px;
        display:block;
        opacity:1;
    }
    .busqueda #searchform input#s:focus {
        border:1px solid #d5d5d5;
    }

    #checkBusqueda{
        position:absolute;
        top:0;
        left:0;
        display:block;
    }
    #checkBusqueda{
        z-index:4
    }
    #checkBusqueda:checked ~ div{
        display:block !important;
    }
    @media screen and (max-width: 800px){
        #menu{
            position:fixed; 
            z-index:101; 
        }
        ul{
            background:#F1F1F1;/*color del desplegable del menu movil*/
            position:absolute;
            top:100%;
            right:0;
            left:0;
            z-index:3;
            height:auto;
            display:none
        }
        ul.menus{
            width:100%;
            position:static;
            padding-left:20px
        }
        li{
            display:block;
            float:none;
            width:auto;
            font: 11px  Arial, sans-serif;
        }
        ul a{
            display: block;
            line-height: 40px;
            padding: 0 14px;
        }
        #checkMenu,label{
            position:absolute;
            top:0;
            left:0;
            display:block;
        }
        #checkMenu{
            z-index:4
        }
        #checkMenu:checked + label{
            color:#333;/*color de las tres barritas una vez se clica*/
        }
        #checkMenu:checked ~ ul{
            display:block;
            top: 50px;
        }
        .barra{
            width:100%!important;
        }
        .busqueda{
            margin-right: -35px;
            /* right:212px!important; */
        }
        #carritoMovil {
            display: block !important;
        }
    }
    header{
        padding-top:50px;
    }
    #carritoMovil {
        display: none;
        position: absolute;
        right: 0;
        top: 12px;
        width: 50px;
        text-align: center;
    }
    /*-----fin menu responsive-----*/
    
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 2rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 700;
    font-family: 'Poiret One', serif;
    margin: 0rem;
    padding: 0px;
    letter-spacing: 2px;
`;

const Navegacion = () => {

    const { usuario, firebase } = useContext(FirebaseContext);
    const router = useRouter();

    const cerrarSesion = async () => {
        const salir = await firebase.cerrarSesion();
        console.log(usuario);
        if (!salir) {
            router.push('/');
        }
    }
    
    return ( 
        <Nav id="menu">
            <div className='barra'>
                <input type='checkbox' id='checkMenu'/>
                <label><i aria-hidden='true' className='fa fa-bars'/></label>
                <a href='/' id="icono-logo" className="ml-50">
                    <Logo>Pedidos<br></br>Online</Logo>
                </a>
                <ul className='principal'>
                    <li>
                        <a href='/'  id="icono-logo-dos">
                            <Logo>Pedidos<br></br>Online</Logo>
                        </a>
                    </li>
                    <li
                        css={css`
                            text-align: center !important;
                            border-bottom: 1px solid #333333;
                            padding-bottom: 5px !important;
                        `}
                        id="menu-user"
                    >
                        {usuario ? (
                            <>
                                <img 
                                    alt="perfil" 
                                    src="/static/img/perfil-default.jpg"
                                    css={css`
                                        margin-top: 8px;
                                        height: 25px;
                                        width: 25px;
                                        background-color: #bbb;
                                        border-radius: 50%;
                                        display: inline-block;
                                    `}
                                />
                                <p
                                    css={css`
                                        margin: 0rem;
                                        text-transform: capitalize;
                                    `}
                                >Hola, { usuario.displayName }</p>
                            </>
                        ) : (
                            null
                        )}
                    </li>
                    <li><Link href="/populares"><a>Populares</a></Link></li>
                    {usuario ? (
                        <>
                            { usuario.tipo === '0' && 
                                <>
                                    <li><Link href="/nuevo-producto"><a>Nuevo Producto</a></Link></li>
                                    <li><Link href="/admin-usuarios"><a>Administrar Usuario</a></Link></li>
                                </>
                            }
                            <li><a href='#'>Mi Cuenta <i className="fa fa-chevron-down"></i></a>
                                <ul className='menus'>
                                    <li
                                        className="ocultar-icono"
                                        css={css`
                                            text-align: center !important;
                                            :hover {
                                                cursor: pointer;
                                            }
                                        `}
                                        
                                    >
                                        <Link href="#">
                                            <a css={css`
                                                display: inline-block !important;
                                                width: 100%;
                                                margin: 0px;
                                                padding: 0px;
                                            `}>
                                                {usuario ? (
                                                    <>
                                                        <img 
                                                            alt="perfil" 
                                                            src="/static/img/perfil-default.jpg"
                                                            css={css`
                                                                margin-top: 8px;
                                                                margin-left: 44%;
                                                                height: 25px;
                                                                width: 25px;
                                                                background-color: #bbb;
                                                                border-radius: 50%;
                                                                display: block;
                                                            `}
                                                        />
                                                        <p
                                                            css={css`
                                                                margin: 0rem;
                                                                text-transform: capitalize;
                                                                display: inline-block;
                                                            `}
                                                        >Hola, { usuario.displayName }</p>
                                                    </>
                                                ) : (
                                                    null
                                                )}
                                            </a>
                                        </Link>
                                    </li>
                                    <li><Link href="#"><a>Abonos</a></Link></li>
                                    <li><Link href="/pedidos"><a>Pedidos</a></Link></li>
                                    <li><Link href="#"><a onClick={() => cerrarSesion()}>Salir</a></Link></li>
                                </ul>
                            </li>
                            
                        </>
                    ) : ( 
                        <>
                            <li><Link href="/login"><a>Iniciar Sesión</a></Link></li>
                            <li><Link href="/crear-cuenta"><a>Crear Cuenta</a></Link></li>
                        </>
                    )}
                    
                    <li><a href='#'>Contacto</a></li>
                </ul>
                <div className='iconos ocultar-icono'>
                    <div
                        css={css`
                            display: inline-block;
                        `}
                        className="ocultar-icono"
                    >
                        <>
                            {usuario ? (
                                <img 
                                    alt="perfil" 
                                    src="/static/img/perfil-default.jpg"
                                    css={css`
                                        height: 25px;
                                        width: 25px;
                                        background-color: #bbb;
                                        border-radius: 50%;
                                        display: inline-block;
                                        display: flex;
                                        position: fixed;
                                        margin-top: -20px;
                                        margin-left: -35px;
                                    `}
                                />
                            ): (null)}
                        </>
                    </div>
                    <div
                        css={css`
                            display: inline-block;
                        `}
                        className="ocultar-icono"
                    >
                        <>
                            {usuario ? (
                                <p
                                    css={css`
                                        margin: 0rem;
                                        text-transform: capitalize;
                                    `}
                                >{ usuario.displayName }</p>
                            ) : (
                                null
                            )}
                        </>
                    </div>
                    <a href='#' className="ocultar-icono"><i aria-hidden='true' className='fa fa-twitter'/></a>
                    <a href='#' className="ocultar-icono"><i aria-hidden='true' className='fa fa-facebook'/></a>
                    <a href='#' className="ocultar-icono"><i aria-hidden='true' className='fa fa-instagram'/></a>
                    {usuario ? (
                        <Carrito/>
                    ) : (null)}
                </div>
                <div id='buscador'>
                    <input type='checkbox' id='checkBusqueda'/>
                    <a href='#'><i className='fa fa-search'/></a>
                    <div className='busqueda'>
                        <form action='/search' id='searchform' method='get' role='search'>
                            <div><input id='s' name='q' placeholder='Escribe y pulsa enter...' type='text'/></div> 
                        </form>    
                    </div>
                </div>
                <div id='carritoMovil'>
                    {usuario ? (
                        <Carrito/>
                    ) : (null)}
                </div>
            </div>
        </Nav>
     );
}
 
export default Navegacion;