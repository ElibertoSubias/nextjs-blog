import React, { useContext, useState, useEffect, Fragment } from 'react';
import Layout from '../components/layout/Layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import usePedidos from '../hooks/usePedidos';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import { FirebaseContext } from '../fb';
import { useRouter } from 'next/router';

const Pedidos = () => {

    const { firebase, usuario } = useContext(FirebaseContext);
    const { pedidos } = usePedidos('creado');
    const router = useRouter();
    const [ itemActivo, guardarItemActivo ] = useState('');

    const estatusPedido = ['Abierto', 'Cerrado', 'Entregado'];

    const mostrarIems = (itemId) => {
        guardarItemActivo(itemId);
    }

    return ( 
        <div>
            <Layout>
                <h3>Mis Pedidos</h3>

                <table
                    cellSpacing="0"
                    css={css`
                        font-size: 15px;
                        @media screen and (max-width: 800px){
                            font-size: 12px;
                        }
                        width: 100%;
                        background-color: #eaeaea;
                        .tituloPedido {
                            :hover {
                                background-color: var(--naranja);
                            }
                        }
                        .tituloProducto {
                            background-color: black;
                            color: white;
                            :hover {
                                color: white;
                            }
                        }
                        .tituloActivo {
                            background-color: var(--naranja);
                        }
                        tbody tr table{
                            background-color: white;
                                color: black;
                        }
                        td {
                            width: 20%;
                        }
                        input {
                            cursor: pointer;
                        }

                        table th{
                            width: 200px;
                        }

                        .visible {
                            display: table-row;
                        }
                        .oculto {
                            display: none;
                        }
                    `}
                >
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Estatus</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                        // soft -> Ordena el array ya que la consulta los regresa por userId
                        pedidos.sort((a, b) => a.creado < b.creado ? 1 : -1).map(pedido => (
                            <Fragment
                                key={pedido.id}
                            >
                            <tr 
                                className={pedido.id==itemActivo ? 'tituloPedido tituloActivo' : 'tituloPedido'}
                                css={css`
                                    border-bottom: 1px solid black;
                                `}
                            >
                                <td>{ formatDistanceToNow(new Date(pedido.creado), {locale: es}) }</td>
                                <td>{estatusPedido[pedido.estatus-1]}</td>
                                <td
                                    css={css`
                                        text-align: right;
                                    `}
                                >
                                    <input className={itemActivo!=pedido.id  ? 'visible' : 'oculto'} type="button" value="Ver" onClick={() => mostrarIems(pedido.id)}/>
                                    {
                                        itemActivo && <input className={pedido.id==itemActivo ? 'visible' : 'oculto'} type="button" value="Ocultar" onClick={() => guardarItemActivo('')}/>
                                    }
                                </td>
                            </tr>
                            <tr 
                                id={pedido.id}
                                className={pedido.id==itemActivo ? 'visible' : 'oculto'}                    
                            >
                                <td colSpan="3">
                                    <table
                                        cellSpacing="0"
                                        css={css`
                                            width: 100%;
                                        `}
                                    >
                                        <thead>
                                            <tr className="tituloProducto">
                                                <th scope="col">Producto</th>
                                                <th scope="col">Cantidad</th>
                                                <th scope="col">Precio Unitario</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedido.productos && pedido.productos.map(item => (
                                                <tr
                                                    key={item.idProducto}
                                                >
                                                    <td
                                                        css={css`
                                                            text-align: center;
                                                        `}
                                                    >{item.nombre}</td>
                                                    <td
                                                        css={css`
                                                            text-align: center;
                                                        `}
                                                    >{item.cantidad}</td>
                                                    <td
                                                        css={css`
                                                            text-align: center;
                                                        `}
                                                    >${item.precio}</td>
                                                    <td
                                                        css={css`
                                                            text-align: right;
                                                        `}
                                                    >${item.precio}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr
                                className={pedido.id==itemActivo ? 'visible' : 'oculto'} 
                            >
                                <td
                                colSpan={3}
                                    css={css`
                                        text-align: right;
                                        background-color: #c3c3c3;
                                    `}
                                >
                                    <div>
                                        <strong>Total</strong>:<strong>${pedido.total}</strong>
                                    </div>
                                    <div>
                                        <strong>Pagos</strong>:<strong>$110.00</strong>
                                    </div>
                                    <div>
                                        <strong>Restan</strong>:<strong>$0.00</strong>
                                    </div>
                                </td>
                            </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
     );
}
 
export default Pedidos;