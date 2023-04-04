// Se utiliza con axios VIDEO 405 
// Se instala AXIOS **** yarn add axios ****
/* Libreria se utiliza para no estar escribiendo http://localhost:4000/api en cada parte del programa  */
import axios from "axios";

const calendarApi = axios.create({
    baseURL: "http://localhost:4000/api", // para produccion colocamos la de abajo esta es para dev
    // baseURL: "https://calendar-new2022.herokuapp.com/api",
});

// Interceptores

/* mandamos la informacion a 
    - Network
    - Fetch/XHR
    - click en el ultimo movimiento
    - Headers
    - Request estara nuestro token agregado
*/
// ayuda para mantener nuestra autenticacion al actualizar la pagina    
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
} )

export default calendarApi;