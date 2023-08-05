import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import styles from '../styles/nosotros.module.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

import axios from "axios";

export default function Carrito() {
  const initialCart = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('carrito')) : [];
  const [carrito, setCarrito] = useState(initialCart);

  const limpiarCarrito = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('carrito', JSON.stringify([]));
    }
    setCarrito([]);
  };

  const calculateTotal = () => {
    return carrito.reduce((acc, producto) => acc + parseFloat(producto.precio), 0).toFixed(2);
  };

  const createOrder = async () => {
    try {
      const total = calculateTotal();
      const res = await axios({
        url: "http://localhost:3000/api/payment",
        method: "POST",
        data: { total },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data.id;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Carrito de Compras" description="Revisa los productos que has agregado al carrito">
      <main className='contenedor'>
          <h1 className='heading'>Tu Carrito</h1>
          <p>Detalles del pedido: </p>
          
          <ul className={styles.listaProductos}>
              {carrito.map(producto => (
                  <li key={producto.id}>
                      {`${producto.nombre} $${producto.precio} `}
                  </li>
              ))}
          </ul>

          <div className={styles.total}>
              Total: ${calculateTotal()}
          </div>

          <PayPalScriptProvider options={{ "client-id": "AV7mU2ytQlH6nfG78kimWXrZJLmPq-hOqRA20cCTP_SriLBM-cGUoLWTrjG4316I6ZUlPbcM_HGIBfM2" }}>
            <PayPalButtons
              createOrder={createOrder}
              onCancel={(data) => console.log("compra cancelada")}
              onApprove={(data, actions) => {
                console.log(data);
                actions.order.capture();
                limpiarCarrito();
                router.push('/');
              }}
              style={{ layout: "horizontal", color: "blue" }}
            />
          </PayPalScriptProvider>

          <button className={styles.limpiarCarrito} onClick={limpiarCarrito}>
              Limpiar Carrito
          </button>
      </main>
    </Layout>
  )
}
