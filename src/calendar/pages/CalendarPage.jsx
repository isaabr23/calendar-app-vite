import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { useEffect, useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FloatActButtonAddNew } from '../components/FloatActButtonAddNew'
import { FloatActButtonDelete } from '../components/FloatActButtonDelete'
import { useAuthStore } from '../../hooks/useAuthStore'

// Creamos los eventos
// const events = [{
//   title: 'Cumpleaños del jefe',
//   notes: 'Hay que comprar el pastel',
//   start: new Date(),
//   end: addHours( new Date(), 2 ),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'Fernando'
//   }
// }]

export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore()

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // Para que al recargar la pagina se reinicie en la ultima view don de estaba
  // Puede ser mes, semana, dia o agenda
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log({event, start, end, isSelected})

    // Para cambiar de color el evento si pertenece al usuario que lo creo
                                    // EndPoind (DB) o si ya se actualizo 
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }
  
  const onSelect = ( event ) => {
    // console.log({ Click: event})
    setActiveEvent( event )
  }

  const onDoubleClick = ( event ) => {
    // console.log({ doucleClick: event})
    openDateModal();

  }

  // Para obtener la ultima view y guardarla en localStorage
  const onViewChanged = ( event ) => {
    // console.log({ viewChanged: event})
    localStorage.setItem('lastView', event)
  }

  // Para cargar todos los eventos de la base de datos, se usa useEffect por que solo lo queremos llamar una vez
  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar />

      {/* instalamos yarn add date-fns libreria de calendario  (VIDEO 345)*/}
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

        <CalendarModal />
        <FloatActButtonAddNew/>
        <FloatActButtonDelete/>

    </>
  )
}
