import Image from "next/future/image"
import styles from '../../styles/guitarras.module.css'
import Layout from "../../components/layout"
import guitarrasData from '../../components/response.json'

export default function Producto({guitarra}) {

    const { nombre, descripcion, imagen, precio } = guitarra[0].attributes

    return (
        <Layout
            title={`Guitarra ${nombre}`}
        >
            <div className={styles.guitarra}>
                <Image src={imagen} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const guitarras = guitarrasData.data;

    const { data } = guitarras

    const paths = data.map(guitarra => ({
        params: {
            url: guitarra.attributes.url
        }
    }))
    return {
        paths, 
        fallback: false
    }
}

export async function getStaticProps({params: { url }}) {
    const guitarras = guitarrasData.data;
  return {
    props: {
      guitarras
    }
  }
}
