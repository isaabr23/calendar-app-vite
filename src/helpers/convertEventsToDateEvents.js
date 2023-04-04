// Se manipulan las fechas ara pasarlas a un formato que pueda leer javascript ya que utilizamos el formato de la DB

import { parseISO } from "date-fns";
                                // events es un arreglo y por default esta vacio
export const convertEventsToDateEvents = ( events = [] ) => {

    return events.map( event => {

        event.end = parseISO( event.end );
        event.start = parseISO( event.start );

        return event;

    });
}