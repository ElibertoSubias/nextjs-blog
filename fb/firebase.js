import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Registrar un usuario
    async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

        // crear el node con información del usuario
        const user = {
            uid: nuevoUsuario.user.uid,
            nombre: nombre.toLowerCase(),
            email: email,
            tipo: '1'
        }

        // Insertamos en la base de datos
        firebase.db.collection('users').add(user);

        nombre = nombre.toLowerCase();
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

        return await nuevoUsuario.user.updateProfile({
            displayName : nombre
        });
    }

    // Iniciar sesion del usuario
    async login(email, password) {

        
        await this.auth.signInWithEmailAndPassword(email, password);

        await this.auth.onAuthStateChanged(function(user) {
            if (user) {
                let usuarioTipo = {};
                firebase.db.collection('users').where('uid', '==', user.uid).get().then(function(querySnapshot) {
    
                    querySnapshot.forEach(function(doc) {
                        usuarioTipo = doc.data();
                        user.tipo = usuarioTipo.tipo;
                        return user;
                    });
    
                });
            } else {
              // No user is signed in.
            }
        });
    }

    // Cerrar la sesión del usuario
    async cerrarSesion() {
        
        // await this.auth.signOut();
        await this.auth.signOut();

        await this.auth.onAuthStateChanged(function(user) {
            if (!user) {
                return user;
            }
        });
    }
}

const firebase = new Firebase();

export default firebase;