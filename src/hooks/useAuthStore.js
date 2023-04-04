// Realiza la interaccion con la parte del auth del store

import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from "../store/auth/auth";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        // console.log({ email, password }) esto se recibe de LoginPage.jsx

        // hara el estado de checando antes de verificar si es correcto o no las credenciales del usuario
        dispatch( onChecking() );

        //////// Aqui ya alcanzamos el Backend con ayuda de axios y calendarApi.js ////////
        try {
            // mandamos llamar la baseURL.post ( la ruta (auth) y mandamos lo que ingreso el user (email y password) )
            // const resp = await calendarApi.post('/auth', { email, password });
            const { data } = await calendarApi.post('/auth', { email, password });
            // console.log(data)

            // Guardamos el token que nos da el back (data.token) que se encuentra en la data en el localStorage para que al cargar la pagina no se pierda la autenticacion
            localStorage.setItem('token', data.token);
            // Podemos saber dia y hora que se creo el Token para avisar al usuario que ya casi expira
            localStorage.setItem('token-init-date', new Date().getTime() ); // Opcional

            // Dispatch de onLogin y mandamos el payload renombrando las variables de la data para evitar errores
            dispatch( onLogin({ name: data.name, uid: data.uid }) );  
            
        } catch (error) {
            console.log({error}) // en response data encontramos el error que se manda desde el BACK

            dispatch( onLogout('Las credenciales no existen') );

            // limpia en 10 milisegundos el store auth y mandamos a errorMessage como undefined para la alarma de sweetalert2
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async({ email, password, name }) => {

        dispatch( onChecking() );

        try {
            
            const { data } = await calendarApi.post('/auth/new', { email, password, name });
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onRegister({ name: data.name, uid: data.uid }) );  
            
        } catch (error) {
            console.log({error})

            dispatch( onLogout( error.response.data?.msg || 'Usuario ya existe!') );

            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    // Lo utilizaremos en el AppRouter.jsx
    // ayuda para mantener nuestra autenticacion al actualizar la pagina
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if( !token ) return dispatch( onLogout() );

        try {
            const { data } = await calendarApi.get('/auth/renew');
            // console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() ); // Opcional
            dispatch( onLogin({ name: data.name, uid: data.uid }) );  
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }

    }

    const startLogout = () => {
        // Se limpia todo lo del localStorage
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        // Propiedades
        status,
        user,
        errorMessage,
        // Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}