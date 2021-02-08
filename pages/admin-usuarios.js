import React, { useState, useContext, Fragment } from 'react';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import Error404 from '../components/layout/404';
import { FirebaseContext } from '../fb';
import useUsers from '../hooks/useUsers';

const AdminUsuarios = () => {

    const router = useRouter();

    // context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);
    const { users } = useUsers('');

    console.log(users);

    const cambiarTipoDeUser = async (uid, tipo) => {

        if (!usuario) {
            return router.push('/login');
        }

        if(tipo === '0') {
            tipo = '1';
        } else if (tipo === '1') {
            tipo = '0';
        }

        let userNode = {};
        await firebase.db.collection("users").where("uid", "==", uid).get().then(function(querySnapshot) {
                
            querySnapshot.forEach(function(doc) {
                userNode = doc.data();
                userNode.id = doc.id;
            });

        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

        if (Object.keys(userNode).length > 0) {
            
            // Actualizar el tipo de User
            firebase.db.collection('users').doc(userNode.id).update({
                tipo: tipo
            });

        }

    }

    const eliminarUser = (uid) => {

        if (!usuario) {
            return router.push('/login');
        }

        console.log(uid);
    }


    return ( 
        <div>
            <Layout>
            { !usuario ? <Error404 /> : (

                <>
                    <div css={css`
                        width: 100%;
                        @media screen and (max-width: 800px){
                            width: 100%;
                        }
                        margin: 0 auto;
                        `}
                    >
                        <h1
                            css={css`
                                margin-top: 1rem;
                                text-align: center;
                            `}
                        >Administrar Usuarios</h1>
                        {users && (
                            <table
                                css={css`
                                    width: 100%;
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
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Tipo</th>
                                        <th>Cambiar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr
                                            key={user.uid}
                                        >
                                            <td>{user.nombre}</td>
                                            <td>{user.email}</td>
                                            <td>{user.tipo  == 0 ? 'Admin' : 'Cliente'}</td>
                                            <td
                                                css={css`
                                                    text-align: center;
                                                `}
                                            ><button onClick={() => cambiarTipoDeUser(user.uid, user.tipo)}>{user.tipo === '0' ? 'Hacer Cliente' : 'Hacer Administrador'}</button></td>
                                            <td
                                                css={css`
                                                    text-align: center;
                                                `}
                                            ><button onClick={() => eliminarUser(user.uid)}>Eliminar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
                
            )}
            </Layout>
        </div>
     );
}
 
export default AdminUsuarios;