import React from 'react';
import Header from './Header';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import Carrito from '../ui/Carrito';
import Buscar from '../ui/Buscador';
import Link from 'next/link';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';
import Navegacion from './Navegacion';

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

const Layout = props => {
    return ( 
        <div className="contenedor-app">
            <Global
                styles={css`
                    :root {
                        --gris: #3d3d3d;
                        --gris2: #6F6F6F;
                        --gris3: #e1e1e1;
                        /* --naranja: #DA552F; */
                        --naranja: #e07541;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *,*:before, *:after {
                        box-sizing: inherit;
                    }
                    body{
                        font-size: 1.6rem; /** 16 PX */
                        line-height: 1.5;
                        font-weight: 'PT Sans', sans-serif;
                        margin: 0px;
                        padding-right: 0px;
                        padding-left: 0px;
                    }
                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }

                    h1, h2 {
                        font-weight: 'Roboto Slab', serif;
                        font-weight: 700;
                        font-size: 18px;
                    }

                    h3 {
                        font-weight: 'PT Sans', sans-serif;
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                    }

                    img {
                        max-width: 100%;
                    }

                    .seccion-principal {
                        margin-left:  20%;
                        margin-right: 2rem;
                        padding-top:50px;
                    }

                    .contenedor-app {
                        display: flex;
                        min-height: 100vh;
                    }

                    section {
                        width: 100%;
                        margin-top: 55px;
                        main {
                            margin-left: 10px;
                            margin-right: 10px;
                        }
                    }

                    background-color: #ffffff;

                    // PARA CUANDO ES MOVIL
                    @media screen and (max-width: 480px) {  

                        .ml-50 {
                            margin-left: 50px;
                        }

                        #icono-logo {
                            display: inline-block !important;
                        }
                        #menu-user {
                            display: block;
                        }
                        #icono-logo-dos {
                            display: none !important;
                        }

                    }

                    // CUANDO ES ESCRITORIO
                    @media screen and (min-width: 480px) {  
                        #icono-logo {
                            display: none;
                        }
                        #menu-user {
                            display: none;
                        }
                        #icono-logo-dos {
                            display: inline-block;
                        }
                    }
                    
                `}
            />

            <Head>
                <title>Product Hunt Firebase y Next.js</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,700;1,400&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>
                <link href="/static/css/app.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'/>
            </Head>            

            <Navegacion/>

            <section>
                <main>
                    {props.children}
                </main>
            </section>
            
        </div>
     );
}
 
export default Layout;