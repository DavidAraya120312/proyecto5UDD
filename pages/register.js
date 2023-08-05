import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from '../styles/register.module.css';



function Signup() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const signupResponse = await axios.post("/api/singup/registerUser", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupResponse);
      
      router.push("/profile");

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            <h1>Signup</h1>

            <label className={styles.label}>Nombre Completo:</label>
            <input
                type="text"
                placeholder="Nombre y Apellido"
                className={styles.input}
                name="fullname"
            />
            <label className={styles.label}>Corre:</label>
            <input
                type="email"
                placeholder="Email"
                className={styles.input}
                name="email"
            />
            <label className={styles.label}>Contraseña:</label>
            <input
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
            />
            <button className={styles.button}>
                Registrarse
            </button>
        </form>
        <button className={styles.back} onClick={() => router.push('/')}>
            Return to Home
        </button>
    </div>
);

}

export default Signup;