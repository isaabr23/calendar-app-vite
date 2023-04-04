// anejamos el contenido de cuadritode la nota
export const CalendarEvent = ({event}) => {
    // console.log(props)

    const { title, user } = event;

  return (
    <>
        <strong>{ title }</strong>
        <span> - { user.name }</span>
    </>
  )
}
