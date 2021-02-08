import React from 'react';
import { useRouter } from 'next/router';

const DetallePedido = () => {

    // Routing para obtener el id actual
    const router = useRouter();    
    const { query: { pedido }} = router;

    return ( 
        <h1>Det Pedido</h1>
     );
}
 
export default DetallePedido;