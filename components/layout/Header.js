import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import Buscar from '../ui/Buscador';
import Carrito from '../ui/Carrito';
import Navegacion from './Navegacion';
import Boton from '../ui/Boton';
import { FirebaseContext } from '../../fb';

const ContenedorHeader = styled.div`
    width: 100%;
    margin-right: 10px;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const { usuario, firebase } = useContext(FirebaseContext);

    return ( 
        <header
            css={css`
                max-width: 1200px;
                width: 100%;
                padding: 1rem 0;
                display: flex;
                justify-content: space-between;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <div>
                        <Buscar/>
                    </div>
                    <div
                        css={css`
                            padding-left: 2rem;
                        `}
                    >
                        {usuario ? (
                            <Carrito/>
                        ) : (
                            null
                        )}
                    </div>
                    
                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;