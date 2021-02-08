import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../fb';

const useProductos = orden => {
    
    const [ productos, guardarProdutos ] = useState([]);
  
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
        }
        obtenerProductos();
    }, []);

    function manejarSnapshot (snapshot) {
        
        const productos = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
        });

        guardarProdutos(productos);
    }

    return {
        productos
    }
}

export default useProductos;