import '../styles/globals.css';
import firebase, { FirebaseContext } from '../fb';
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp = props => {
  
  const usuario = useAutenticacion();
  
  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider
        value={{
          firebase,
          usuario
        }}
      >
      <Component {...pageProps}/>
    </FirebaseContext.Provider>
  )
}

export default MyApp;
// function MyApp({ Component, pageProps }) {
//   return (
    
//       <FirebaseContext.Provider
//         value={{
//           firebase
//         }}
//       >
//         <Component {...pageProps}/>
//       </FirebaseContext.Provider>
//   )
// }

// export default MyApp;
