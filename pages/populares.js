import React from 'react';
import Layout from '../components/layout/Layout';
import DetallesProducto from '../components/layout/DetallesProducto';
/** @jsx jsx */ import { jsx, css } from '@emotion/core';
import useProductos from '../hooks/useProductos';

export default function Populares() {

  const { productos } = useProductos('votos');

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
