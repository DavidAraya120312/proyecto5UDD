import { useState, useEffect } from 'react';
import Image from "next/future/image"
import Link from 'next/link'
import styles from '../styles/guitarras.module.css'

export default function Guitarra({guitarra, agregarAlCarrito, yaEnCarrito}) {
  const { descripcion, imagen, nombre, precio, url } = guitarra;

  return (
    <div className={styles.guitarra}>
        <Image src={imagen} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />
        <div className={styles.contenido}>
            <h3>{nombre}</h3>
            <p className={styles.descripcion}>{descripcion}</p>
            <p className={styles.precio}>${precio}</p>
            <button 
                className={styles.enlace} 
                onClick={() => agregarAlCarrito(guitarra)}
                disabled={yaEnCarrito}
            >
                {yaEnCarrito ? 'Ya en Carrito' : 'Agregar al Carrito'}
            </button>
        </div>
    </div>
  )
}
