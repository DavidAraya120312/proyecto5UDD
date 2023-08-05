import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../components/layout'
import Guitarra from '../components/guitarra'
import styles from '../styles/grid.module.css'
import guitarrasData from '../components/response.json'

export default function Home({ guitarras }) {
  const [carrito, setCarrito] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCarrito = window.localStorage.getItem('carrito');
      if (savedCarrito) return JSON.parse(savedCarrito);
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto]);
  }


  return (
    <Layout title={'Inicio'} description={'Blog de música, venta de guitarras y más'}>
      <main className='contenedor'>
        <h1 className='heading'>Nuestra Colección</h1>
        <div className={styles.grid}>
          {guitarras?.map(guitarra => (
            <Guitarra
              key={guitarra.id}
              guitarra={guitarra.attributes}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      </main>
    </Layout>
  )
}


export async function getStaticProps() {
    const guitarras = guitarrasData.data;

    return {
        props: {
            guitarras,
        }
    }
}