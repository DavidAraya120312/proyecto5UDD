import Layout from "../components/layout"
import Guitarra from "../components/guitarra"
import styles from '../styles/grid.module.css'
import guitarrasData from '../components/response.json'


export default function Tienda({guitarras}) {

  return (
    <Layout
      title={'Tienda Virtual'}
      description="Tienda virtual, venta de guitarras, instrumentos, GuitarLA"
    >
        <main className="contenedor">
            <h1 className="heading">Nuestra Colección</h1>

            <div className={styles.grid}>
              {guitarras?.map(guitarra => (
                  <Guitarra
                      key={guitarra.id}
                      guitarra={guitarra.attributes}
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
      guitarras
    }
  }
}
