import React, { useState, useContext } from 'react';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Layout from '../components/layout/Layout';
import Error404 from '../components/layout/404';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import { FirebaseContext } from '../fb';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
  txtNombre: '',
  txtEmpresa: '',
  txtPrecio: '0.00',
  txtImagen: '',
  txtUrl: '',
  txtDescripcion: ''
};

export default function NuevoProducto() {

  const [ error, guardarError ] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { txtNombre, txtEmpresa, txtPrecio, txtImagen, txtUrl, txtDescripcion } = valores;

  // hook de routing para redureccionar
  const router = useRouter();
  
  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  // state de las imagenes
  const [ nombreimagen, guardarNombre ] = useState('');
  const [ subiendo, guardarSubiendo ] = useState(false);
  const [ progreso, guardarProgreso ] = useState(0);
  const [ urlimagen, guardarUrlImagen ] = useState('');

  async function crearProducto() {

    // si el usuario no esta autenticado llevar al login
    if (!usuario) {
      return router.push('/login');
    }

    firebase
    .storage
    .ref("productos")
    .child(nombreimagen)
    .getDownloadURL()
    .then(url => {
      console.log(url);
      guardarUrlImagen(url);

      // crear el objeto de nuevo producto
      const producto = {
        nombre: txtNombre,
        empresa: txtEmpresa,
        precio: txtPrecio,
        url: txtUrl,
        urlimagen: url,
        descripcion: txtDescripcion,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
        creador: {
          id: usuario.uid,
          nombre: String(usuario.displayName).split('|')[0]
        },
        hanVotado: []
      }

      // Insertamos en la base de datos
      firebase.db.collection('productos').add(producto);

      return router.push('/');

    });

  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }

  const handleProgress = progreso => guardarProgreso({progreso});

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  }

  const handleUploadSuccess = nombre => {
    console.log(nombre);
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
  }

  return (
    <div>
      <Layout>
        { !usuario ? <Error404 /> : (

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
                      margin-top: 1rem;
                      text-align: center;
                  `}
              >Nuevo Producto</h1>
              <Formulario
                  onSubmit={handleSubmit}
                  noValidate
              >
                <fieldset>
                  <legend>Información General</legend>
                
                  <Campo>
                      <label htmlFor="nombre">Nombre</label>
                      <input
                          type="text"
                          id="txtNombre"
                          placeholder="Nombre del producto"
                          name="txtNombre"
                          value={txtNombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>
                  {errores.txtNombre && <Error>{errores.txtNombre}</Error>}

                  <Campo>
                      <label htmlFor="empresa">Empresa</label>
                      <input
                          type="text"
                          id="txtEmpresa"
                          placeholder="Tu empresa"
                          name="txtEmpresa"
                          value={txtEmpresa}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>
                  {errores.txtEmpresa && <Error>{errores.txtEmpresa}</Error>}

                  <Campo>
                      <label htmlFor="precio">Precio</label>
                      <input
                          type="text"
                          id="txtPrecio"
                          placeholder="00.00"
                          name="txtPrecio"
                          value={txtPrecio}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>
                  {errores.txtPrecio && <Error>{errores.txtPrecio}</Error>}

                  <Campo>
                      <label htmlFor="imagen">Imagen</label>
                      <FileUploader
                        css={css` max-width: 100%;width: 95%;`}
                          accept="image/*"
                          id="txtImagen"
                          name="txtImagen"
                          randomizeFilename
                          storageRef={firebase.storage.ref("productos")}
                          onUploadStart={handleUploadStart}
                          onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          onProgress={handleProgress}
                      />
                  </Campo>
                  
                  <Campo>
                      <label htmlFor="url">URL</label>
                      <input
                          type="text"
                          id="txtUrl"
                          name="txtUrl"
                          placeholder="URL de tu producto"
                          value={txtUrl}
                          onChange={handleChange}
                          onBlur={handleBlur}
                      />
                  </Campo>
                  {errores.txtUrl && <Error>{errores.txtUrl}</Error>}

                </fieldset>
                
                <fieldset>
                  <legend>Sobre tu Producto</legend>

                  <Campo>
                      <label htmlFor="descripcion">Descripción</label>
                      <textarea
                        id="txtDescripcion"
                        name="txtDescripcion"
                        value={txtDescripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                  </Campo>
                  {errores.txtDescripcion && <Error>{errores.txtDescripcion}</Error>}

                </fieldset>

                {error && <Error>{error}</Error>}

                <InputSubmit type="submit" value="Crear Producto"/>

              </Formulario>
            </div>
          </>

        ) }
      </Layout>
    </div>
  )
}
