import Layout from "../components/layout"
import Post from "../components/post"
import styles from '../styles/grid.module.css'
import postsData from '../components/post.json';

export default function Blog({posts}) {
  return (
    <Layout
      title={'Blog'}
      description="Blog de música, venta de guitarras, consejos, GuitarLA"
    >
        <main className="contenedor">
            <h1 className="heading">Blog</h1>
            <div className={styles.grid}>
                {posts?.map(post => (
                    <Post
                      key={post.id}
                      post={post.attributes}
                    />
                ))}
            </div>
        </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = postsData.data;

  return {
    props: {
      posts
    }
  }
}
