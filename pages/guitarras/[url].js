import Image from "next/future/image";
import styles from '../../styles/guitarras.module.css';
import Layout from "../../components/layout";
import guitarrasData from '../../components/response.json';

export default function Producto({ guitarra }) {

    // Remover [0], ya que estás enviando solo una guitarra específica
    const { nombre, descripcion, imagen, precio } = guitarra.attributes;

    return (
        <Layout title={`Guitarra ${nombre}`}>
            <div className={styles.guitarra}>
                <Image src={imagen} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />
                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const guitarras = guitarrasData.data;

    const paths = guitarras.map(guitarra => {
        console.log("URL:", guitarra.attributes.url);
        return {
            params: {
                url: guitarra.attributes.url
            }
        };
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { url } }) {
    const guitarra = guitarrasData.data.find(g => g.attributes.url === url); // Usar find() en lugar de filter() para obtener un único objeto
    return {
        props: {
            guitarra  // Enviar solo la guitarra que coincide con la URL
        }
    };
}
