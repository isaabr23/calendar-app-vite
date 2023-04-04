import { useCalendarStore } from "../../hooks/useCalendarStore";

export const FloatActButtonDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
