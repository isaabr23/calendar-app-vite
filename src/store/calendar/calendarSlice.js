import { createSlice } from '@reduxjs/toolkit';

////////////// Para que funcione en front antes de crear el back //////////////
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Fernando'
//     }
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoading: true,
        events: [ 
                    // tempEvent era la variable antes de recibir la informacion del back

                ],
        activeEvent: null
    },
    reducers: {
        // Activar la nota
        onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload
        },
        // Crear una nueva nota ( Agregarla a los eventos )
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        // Actualizar una nota
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if( event.id === payload.id ) {
                    return payload;
                }

                return event;
            })
        },
        onDeleteEvent: ( state ) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event.id !== state.activeEvent.id )
                state.activeEvent = null;
            }
        },
        // Cargar los eventos de la base de datos 
        onLoadEvents: ( state, { payload = [] } ) => {
            state.isLoading = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if( !exists ) {
                    state.events.push( event )
                }
            });
        },
        // Limpiar toda la app cuando hagamos Logout
        onLogoutCalendar: ( state ) => {
            state.isLoading = true;
            state.events = [];
            state.activeEvent = null;
        }
    }
});
// Action creators are generated for each case reducer function
export const { 
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents, // Lo llamamos en useCalendarStore.js
    onLogoutCalendar    // Se llama en useAuthStore.js
} = calendarSlice.actions;