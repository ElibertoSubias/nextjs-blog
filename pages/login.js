import React, { useState } from 'react';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import firebase from '../fb';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

export default function Login() {

  const [ error, guardarError ] = useState(false);

  const STATE_INICIAL = {
    email: '',
    password: ''
  };

  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      const usuario = await firebase.login(email, password);
    
      Router.push('/');
      
    } catch (error) {
      console.error('Hubo un error al autenticar el usuario: ', error.message);
      guardarError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
           <div css={css`
            width: 50%;
            @media screen and (max-width: 800px){
                width: 100%;
            }
            margin: 0 auto;
           `}>
            <h1
                  css={css`
                      text-align: center;
                      margin-top: 5rem;
                  `}
              >Iniciar Sesión</h1>
              <Formulario
                  onSubmit={handleSubmit}
                  noValidate
              >
                  <Campo>
                      <label htmlFor="email">Email</label>
                      <input
                          type="email"
                          id="email"
                          placeholder="Tu Email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          // onBlur={handleBlur}
                      />
                      {errores.email && <Error>*</Error>}
                  </Campo>
                  
                  <Campo>
                      <label htmlFor="password">Password</label>
                      <input
                          type="password"
                          id="password"
                          placeholder="Tu password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          // onBlur={handleBlur}
                      />
                      {errores.password && <Error>*</Error>}
                  </Campo>
                  
                  {error && <Error>{error}</Error>}
                  <InputSubmit type="submit" value="Iniciar Sesión"/>
              </Formulario>
           </div>
        </>
        </Layout>
    </div>
  )
}
