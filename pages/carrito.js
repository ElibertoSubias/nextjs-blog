import React, {useState, useContext} from 'react';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import DetalleCarrito from '../components/layout/DetalleCarrito';
import useCarrito from '../hooks/useCarrito';
import ResumenCompra from '../components/layout/ResumenCompra';
import styled from '@emotion/styled';
import useProductos from '../hooks/useProductos';
import { FirebaseContext } from '../fb';

const ContenedorTabla = styled.div`
    text-align: center;
    width: 100%;

    table {
        width: 100%;
    }
`;

const Carrito = () => {

    // context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);
    const { carrito } = useCarrito('creado');
    const { productos } = useProductos('creado');
    const [ resultado, guardarResultado ] = useState([]);
    const { numePedido } = useState('');
    
    let totalPedido = 0;
    let numPedido = null;

    for (let x = 0; x < carrito.length; x++) {
        
        for (let y = 0; y < productos.length; y++) {
            
            if (carrito[x].idProducto == productos[y].id) {
                carrito[x].precio = productos[y].precio;
                carrito[x].nombre = productos[y].nombre;
                totalPedido += parseFloat(productos[y].precio) * parseInt(carrito[x].cantidad);
            }
            
        }
        
    }

    const guardarPedido = async () => {

        // Si el usuario no esta autenticado llevar al login
        if (!usuario) {
            return router.push('/login');
        }

        const pedido = {
            userId: usuario.uid,
            creado: Date.now(),
            total: totalPedido,
            productos: []
        }

        const queryPedido = await firebase.db.collection("pedidos").add(pedido);

        numPedido = await queryPedido.get();

        let productos = {};


        if (numPedido.id != null) {

            // // Actualizar la BD
            await firebase.db.collection("pedidos").doc(numPedido.id).update({
                productos: carrito,
                estatus: 1
            });

            try {

                const eliminar_query = await firebase.db.collection('carrito').where('creador','==',usuario.uid);
                await eliminar_query.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.delete();
                    });
                });
                router.push('/');
                
            } catch (error) {
                console.log(error);
            }
            console.log(productos);
        }

    }

    return (
        <div>
            <Layout>
                <>
                    <div css={css`
                            width: 100%;
                            @media screen and (max-width: 800px){
                                width: 100%;
                            }
                            margin: 0 auto;
                        `}
                    >
                        <h4>Mi Carrito</h4>
                        {carrito.length > 0 ? 
                            (
                                <>
                                    <ContenedorTabla>
                                        <table
                                            css={css`
                                                width: 100%;
                                                border-collapse: collapse;
                                                th {
                                                    padding-right: 10px;
                                                }
                                                @media screen and (max-width: 800px){
                                                    font-size: 12px;
                                                }
                                                th {
                                                    background-color: var(--naranja);
                                                }
                                            `}
                                        >
                                            <thead>
                                                <tr>
                                                    <th scope="col">Producto</th>
                                                    <th scope="col">Cantidad </th>
                                                    <th scope="col">Precio Unitario</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carrito.map(producto => (
                                                    <DetalleCarrito
                                                        key={producto.id}
                                                        item={producto}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </ContenedorTabla>
                                    <div 
                                        css={css`
                                            width: 100%;
                                            
                                            div {
                                                float: right;
                                                width: 25%;
                                                @media screen and (max-width: 800px){
                                                    width: 100%;
                                                }
                                                text-align: center;
                                            }
                                            h4 {
                                                text-align: center;
                                                margin: 0;
                                            }
                                            table {
                                                width: 100%;
                                                text-align: right;
                                                padding: 2rem;
                                            }
                                        `}
                                    >
                                        <div
                                            css={css`
                                                margin-bottom: 100px;
                                                background-color: #f1f1f1;
                                                border: 1px solid rgba(0,0,0,.05);
                                                padding: 10px;
                                                input {
                                                    border-radius: 5px;
                                                    border: none;
                                                    background-color: var(--naranja);
                                                    color: #EEEEED;
                                                    text-align: center;
                                                    height: 32px;
                                                    font-size: 18px;
                                                    letter-spacing: 1px;
                                                }
                                            `}
                                        >
                                            <h4>Resumen de pedido</h4>
                                            <table>
                                                <thead>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th><strong>Total:</strong></th>
                                                        <th>${totalPedido}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <input 
                                                type="button"
                                                onClick={guardarPedido}
                                                value="Finalizar Pedido"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) 
                            : 
                            (
                                <p>Aun no tienes ningun producto en tu carrito...</p>
                            ) 
                        }
                    </div>
                </>
            </Layout>
        </div>
      );
}
 
export default Carrito;