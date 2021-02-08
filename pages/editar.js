import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import Error404 from '../components/layout/404';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { FirebaseContext } from '../fb';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

let STATE_INICIAL = {
    txtNombre: '',
    txtEmpresa: '',
    txtPrecio: '0.00',
    txtImagen: '',
    txtUrl: '',
    txtDescripcion: ''
};

export default function Editar() {

    // state del componente
    const [ productoUno, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});

    const router = useRouter();
    const { query: {id} } = router;

    const { firebase, usuario } = useContext(FirebaseContext);
    
    useEffect(() => {
        if (id) {
            
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const doc = await productoQuery.get();
                if (doc.exists) {
                    guardarProducto(doc.data());
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id, productoUno]);

    // if(Object.keys(productoUno).length === 0 && !error) return 'Cargando...';

    const { creador, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, hanVotado, precio } = productoUno;

    const { valores, errores, handleChange, handleSubmit, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, actualizarProducto);

    let { txtNombre, txtEmpresa, txtPrecio, txtImagen, txtUrl, txtDescripcion } = valores;

    STATE_INICIAL.txtNombre = nombre ? nombre : '';
    STATE_INICIAL.txtEmpresa = empresa ? empresa : '';
    STATE_INICIAL.txtPrecio = precio ? precio : '';
    STATE_INICIAL.txtUrl = url ? url : '';
    STATE_INICIAL.txtDescripcion = descripcion ? descripcion : '';

    // state de las imagenes
    const [ nombreimagen, guardarNombre ] = useState('');
    const [ subiendo, guardarSubiendo ] = useState(false);
    const [ progreso, guardarProgreso ] = useState(0);
    const [ txtUrlimagen, guardarUrlImagen ] = useState('');

    async function actualizarProducto() {

        // si el usuario no esta autenticado llevar al login
        if (!usuario) {
          return router.push('/login');
        }

        if (nombreimagen) {
            
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
                    nombre: usuario.displayName
                    },
                    hanVotado: []
                }

                // Insertamos en la base de datos
                firebase.db.collection('productos').doc(id).update(producto);
            
                return router.push('/');

            });

        } else {

            // crear el objeto de nuevo producto
            const producto = {
                nombre: txtNombre,
                empresa: txtEmpresa,
                precio: txtPrecio,
                url: txtUrl,
                urlimagen: urlimagen,
                descripcion: txtDescripcion,
                votos: 0,
                comentarios: [],
                creado: Date.now(),
                creador: {
                id: usuario.uid,
                nombre: usuario.displayName
                },
                hanVotado: []
            }

            // Insertamos en la base de datos
            firebase.db.collection('productos').doc(id).update(producto);
        
            return router.push('/');

        }
        
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
        console.log(nombre)
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombre(nombre);
    }

    return ( 
        <div>
            <Layout>
                { !usuario ? <Error404 /> : (

                <>
                    <h3
                        css={css`
                            margin-top: 1rem;
                            text-align: center;
                        `}
                    >Actualizar Información del Producto</h3>

                    {productoUno ? (
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

                                <img 
                                    src={urlimagen}
                                    css={css`
                                        width: 200px;
                                    `}
                                />

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

                            <InputSubmit type="submit" value="Guardar"/>

                        </Formulario>
                    ) : (null) }
                </>

                ) }
            </Layout>
        </div>
    );
}