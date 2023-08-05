// import { useEffect } from 'react';
// import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

// export default function PaymentComponent() {

//   useEffect(() => {
//     initMercadoPago('TEST-5476792426338534-080401-f1d7c6de7c7e79acec569c8c599673ca-314612104');
//   }, []);

//   // 2. Configuraciones:
//   const initialization = {
//     amount: 100,
//   };

//   const onSubmit = async (formData) => {
//     return new Promise((resolve, reject) => {
//       fetch('/process_payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//       .then(response => response.json())
//       .then(() => {
//         resolve();
//       })
//       .catch((error) => {
//         reject();
//       });
//     });
//   };

//   const onError = (error) => {
//     console.log(error);
//   };

//   const onReady = () => {
//     // Código que se ejecuta cuando el Brick está listo.
//   };

//   // Asegurarse de desmontar el componente cuando el usuario salga de la página
//   useEffect(() => {
//     return () => {
//         if (typeof window !== 'undefined' && window.cardPaymentBrickController) {
//             window.cardPaymentBrickController.unmount();
//         }
//     };
// }, []);


//   // 3. Renderizar el Brick
//   return (
//     <div>
//       <CardPayment
//         initialization={initialization}
//         onSubmit={onSubmit}
//         onReady={onReady}
//         onError={onError}
//       />
//     </div>
//   );
// }
