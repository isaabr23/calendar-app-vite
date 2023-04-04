import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    // La palabra START la usaremos para inicializar metodo de grabacion 
    const startSavingEvent = async( calendarEvent ) => {

        try {
            
            // LLEGA AL BACK
            
            // Todo bien
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            // console.log({data})
            // dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
            // como ya alcanzamos el back ya no necesitamos generar un _id por que ya lo tenemos en el back y se lo asignamos desde el back (VIDEO 417)
            // a la nota se le agrega el id del back y el user que esta conectado (auth)
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
        
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }

    const startDeleteEvent = async() => {

        try {

            //llegar al back
            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() )
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    // Cargar todos los eventos de la base de datos
    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events')
            // console.log({data})
            // se manda a helps convertEventsToDateEvents.js para cambiar el formato de la fecha
            // data.eventos en un arreglo que espera convertEventsToDateEvents
            const events = convertEventsToDateEvents( data.eventos );
            // Vemos las fechas ya cambiadas de formato
            // console.log(events)
            dispatch( onLoadEvents( events ) );

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    return {
        // Propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,
    }
}
