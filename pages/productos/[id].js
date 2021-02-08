import React, { useEffect, useContext, useState } from 'react';
import Router, { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../fb';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const NombreProducto = styled.h1`
    font-size: 13px;
    font-weight: bold;
`;

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const BotonAgregar = styled.input`
    float: right;
    text-align: center;
    height: 32px;
    border-radius: 5px; 
    font-size: 18px;
    letter-spacing: 1px;
    color: #EEEEED; 
    background-color: var(--naranja);
    border: none;
    
    :hover {
        cursor: pointer;
    }
`;

export async function getServerSideProps() {
    // Get external data from the file system, API, DB, etc.
    // const data = ...
    // Routing para obtener el id actual
    // const router = useRouter();
    // const { query: { id }} = router;
    const id = 'aHUMVACEsPwDd9W7SWdF';
    const obtenerProducto = async () => {
        const productoQuery = await firebase.db.collection('productos').doc(id);
        const doc = await productoQuery.get();
        if (doc.exists) {
            guardarProducto(doc.data());
            console.log(producto);
        } else {
            guardarError(true);
        }
    }
    obtenerProducto();
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
    //   props: ...
        props: {
            id
        }
    }
  }

const Producto = (props) => {

    // state del componente
    const [ producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;
    
    // context de firebase
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
    }, [id]);
    
    if(Object.keys(producto).length === 0 && !error) return 'Cargando...';
    
    const { creador, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, hanVotado } = producto;

    // Administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }

        // obtener y sumar un nuevo coto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if (hanVotado.includes(usuario.uid)) return;

        // guardar el ID del usuario que ha votado
        const nuevoHaVotado = [...hanVotado, usuario.uid];
        
        // Actualizar en la BD
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            hanVotado: nuevoHaVotado 
        });

        // Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        });
    }

    // Agregar el Producto al carrito
    const agregarAlCarrito = (id) => {

        // Si el usuario no esta autenticado llevar al login
        if (!usuario) {
            return router.push('/login');
        }
        
        // Revisar si el producto ya esta en el carrito
        const validarProductoEnCarrito = async () => {

            // const carritoQuery = await firebase.db.collection('carrito').doc(id);
            let producto = {};

            await firebase.db.collection("carrito").where("creador", "==", usuario.uid).where("idProducto", "==", id).get().then(
                function(querySnapshot) {
                    
                    querySnapshot.forEach(function(doc) {
                        producto = doc.data();
                        producto.id = doc.id;
                    });

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
            
            if (Object.keys(producto).length > 0) {
                
                // console.log(producto);
                const nuevoTotal = producto.cantidad + 1;
                
                // Actualizar la cantidad de producto en la BD
                firebase.db.collection('carrito').doc(producto.id).update({
                    cantidad: nuevoTotal
                });                

            } else {
                
                // agregar el producto al carrito
                const item = {
                    idProducto: id,
                    creado: Date.now(),
                    creador: usuario.uid,
                    cantidad: 1
                }

                // Insertamos en la base de datos
                await firebase.db.collection('carrito').add(item).then(

                ).catch(function(error) {
                    
                });

                // Actualizar el state
                // if (id) {
                        
                //     const carritoQuery = await firebase.db.collection('carrito').where('creador', '==', usuario.uid);
                //     console.log("entro");
                //     console.log(carritoQuery);
                //     const carritoAux = await carritoQuery.get();
                //     if (carritoAux.exists) {
                //         guardarCarrito(carritoAux.data());
                //     } else {
                //         guardarError(true);
                //     }

                // }

            }
        }
        validarProductoEnCarrito();
    }

    // Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    // Identificando si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id == id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/login');
        }

        if (e.target[0].value.length < 2) {
            e.target[0].focus();
            return;
        } else {
            // informacion extra al comentario
            comentario.usuarioId = usuario.uid;
            comentario.usuarioNombre = usuario.displayName;

            // Tomar copia de comentarios y agregarlos al arreglo
            const nuevosComentarios = [...comentarios, comentario];

            // Actualizar la BD
            firebase.db.collection('productos').doc(id).update({
                comentarios: nuevosComentarios
            });

            // Actualizar el state
            guardarComentario({
                ...producto,
                comentarios: nuevosComentarios
            });
            e.target.reset();
        }

    }

    // funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }

    // eliminar un producto de la bd
    const eliminarProducto = async () => {

        if (!usuario) {
            return router.push('/login');
        }

        if (creador.id != usuario.uid) {
            return router.push('/');
        }

        try {

            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
            
        } catch (error) {
            console.log(error);
        }
    }

    const editarProducto = (id) => {
        Router.push({
            pathname: '/editar',
            query: { id : id}
        });
    }

    return (        
        <Layout>
            <>
                { error ? <Error404/> : (
                    <div>                               
                        <ContenedorProducto>
                            <div css={css`
                                    margin-bottom: 2rem;
                            `}>
                                <div
                                    css={css`
                                        float: right;
                                        width: 100%;
                                    `}
                                >
                                        <BotonAgregar
                                            type="button"
                                            value="Agregar al carrito"
                                            onClick={() => agregarAlCarrito(id)}
                                        />
                                    </div>
                                <div css={css`
                                    text-align: center;
                                    img {
                                        height: 400px;
                                    }
                                    // PARA CUANDO ES MOVIL
                                    @media screen and (max-width: 480px) {  
                                        img {
                                            height: 200px;
                                        }
                                    }

                                `}>
                                    <img src={urlimagen}/>
                                </div>
                                <div>
                                    <NombreProducto>{nombre}</NombreProducto>
                                </div>
                                <div>
                                    <p>{descripcion}</p>
                                </div>
                                <div css={css`
                                    p {
                                        font-size: 12px;
                                    }
                                `}>
                                    <p>Publicado hace: { formatDistanceToNow(new Date(creado), {locale: es}) }</p>
                                    <p>Por: {creador.nombre.charAt(0).toUpperCase() + creador.nombre.slice(1)} de {empresa}</p>
                                </div>
                            </div>

                            <aside>
                                {/* <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Boton> */}

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p
                                        css={css`
                                            text-align: center;
                                        `}
                                    >Votos | {votos}</p>
                                    { usuario && (

                                        <Boton
                                            onClick={votarProducto}
                                        >Votar</Boton>
                                    
                                    )}
                                </div>
                                
                                <div>
                                    { usuario && (
                                        <>
                                            <h2
                                                css={css`
                                                    font-size: 13px;
                                                `}
                                            >Agrega tu comentario</h2>
                                            <form
                                                onSubmit={agregarComentario}
                                            >
                                                <Campo>
                                                    <input
                                                        type="text"
                                                        name="mensaje"
                                                        onChange={comentarioChange}
                                                    />
                                                </Campo>

                                                <InputSubmit
                                                    type="submit"
                                                    value="Agregar Comentario"
                                                />
                                            </form>
                                        </>
                                    )}

                                    <h2
                                        css={css`
                                            font-size: 2rem;
                                            margin: 2rem 0;
                                        `}
                                    >Comentarios</h2>

                                    {comentarios.length === 0 ? "Aún no hay comentarios" : (
                                        <ul>
                                            {comentarios.map((comentario, i) => (
                                                <li
                                                    key={`${comentario.usuarioId}-${i}`}
                                                    css={css`
                                                        border: 1px solid #e1e1e1;
                                                        padding: 2rem;
                                                    `}
                                                >
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por: 
                                                        <span
                                                            css={css`
                                                                font-weight: bold;
                                                            `}
                                                        >{' '}{comentario.usuarioNombre}</span>
                                                    </p>
                                                    { esCreador( comentario.usuarioId ) &&
                                                        <CreadorProducto>Es creador</CreadorProducto> }
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </aside>
                        </ContenedorProducto>
                        { puedeBorrar() && 
                            <>
                                <Boton
                                    onClick={() => editarProducto(id)}
                                >Editar Producto</Boton>
                                <Boton
                                    onClick={eliminarProducto}
                                >Eliminar Producto</Boton>
                            </>
                        }
                    </div>
                )}
            </>
        </Layout>
    );
}
 
export default Producto;