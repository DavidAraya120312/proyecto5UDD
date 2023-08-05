import Layout from '../components/layout'
import { useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Añadir un nuevo estado para el error
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response ,'A VER...!');

      if (response.data) {
        setIsLoggedIn(true);
        setUser(response.data);
        setError(''); // Limpiar el error si la autenticación es exitosa
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Configurar el mensaje de error
      } else {
        setError('Error al iniciar sesión.');
      }
    }
  }

  return (
    <Layout title={'Perfil'} description={'Tu perfil de usuario'}>
      <main className='contenedor'>
        <h1 className='heading'>Tu Perfil</h1>
        
        {isLoggedIn ? (
          <>
            <h1>Bienvenido</h1>
            <p>Nombre: {user.fullname}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar el mensaje de error si está presente */}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar sesión</button>
            <button onClick={() => router.push('/register')}>Registrarse</button>
          </form>
        )}
      </main>
    </Layout>
  )
}
