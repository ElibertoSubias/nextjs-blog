import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import Buscar from '../ui/Buscador';
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
                height: 40%;
                max-width: 1200px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin: 0rem 0 4rem;
            `}
        >
            <ContenedorHeader>
                <div
                    // css={css`
                    //     display: flex;
                    //     align-items: center;
                    // `}
                >
                    
                    <Navegacion/>

                </div>
            </ContenedorHeader>
        </header>
     );
}
 
export default Header;