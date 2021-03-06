import React from 'react';
import Layout from '../components/layout/Layout';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import DetallesProducto from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';


export default function Home() {

  const { productos } = useProductos('creado');
  
  return (
    <Layout>
      {productos.map(producto => (
        <DetallesProducto
          key={producto.id}
          producto={producto}
        />
      ))}
    </Layout>
  )
}
