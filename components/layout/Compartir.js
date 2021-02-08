import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const ContenedorCompartir = styled.div`
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    i {
        opacity: 0;
        font-size: 28px;
        color: var(--naranja);
        will-change: transform;
        transform: scale(.1);
        transition: all .3s ease;
    }

    .btn_wrap {
        position: relative;
        display: flex;
        justify-content: center; align-items: center;
        overflow: hidden; cursor: pointer;
        width: 150px; height: 40px;
        background-color: #EEEEED;
        border-radius: 80px;
        padding: 0 18px;
        will-change: transform;
        transition: all .2s ease-in-out;
    }

    .btn_wrap:hover {transition: scale(1.1);}

    span {
        text-align: center;
        position: absolute; z-index: 90;
        width: 240px; height: 72px;
        border-radius: 80px; font-size: 20px;
        line-height: 70px;
        letter-spacing: 2px;
        color: #EEEEED; background-color: var(--naranja);
        padding: 0 18px;
        transition: all 1.2s ease;
    }

    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 240px; height: 64px;
        border-radius: 80px;
    }

    .container i:nth-of-type(1) {
        transition-delay: 1.1s;
    }
    .container i:nth-of-type(2) {
        transition-delay: .9s;
    }
    .container i:nth-of-type(3) {
        transition-delay: .7s;
    }
    .container i:nth-of-type(4) {
        transition-delay: .4s;
    }

    .btn_wrap:hover span {
        transition-delay: .25s;
        transform: translateX(-280px);
    }

    .btn_wrap:hover i {
        opacity: 1;
        transform: scale(1);
    }
`;

const Compartir = () => {
    return ( 
        <ContenedorCompartir>
          <div className="btn_wrap">
            <span>Compartir</span>
            <div className="container">
              <i className="fa fa-facebook-f"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-instagram"></i>
              <i className="fa fa-github"></i>
            </div>
          </div>
        </ContenedorCompartir>
     );
}

export default Compartir;