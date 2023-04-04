import { useDispatch } from "react-redux";
import { useAuthStore } from "../../hooks/useAuthStore"
import { onLogout } from "../../store/auth/auth";

export const Navbar = () => {

  const dispatch = useDispatch();
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { user.name }
        </span>

        <button 
          className="btn btn-outline-danger"
          onClick={ startLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
