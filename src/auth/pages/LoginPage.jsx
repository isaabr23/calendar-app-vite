import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    // Usamos nuestro hook de la auth
    const { startLogin, errorMessage, startRegister} = useAuthStore();

    // Con nuestro useForm que creamos
    // se renombra onInputChange a  => onLoginInputChange por que se usara tambien en registerFormFields y marcaria un error de variables con el mismo nombre
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields ); 
    
    const loginSubmit = ( event ) => {
        event.preventDefault();
        // console.log({ loginEmail, loginPassword })

        // Mandamos email y password a nuestro hook de Auth (useAutnStore)
        // se renombra por que startLogin espera "email y password" y no "loginEmail loginPassword"
        startLogin({ email: loginEmail, password: loginPassword })
    }
    
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields ); 

    const registerSubmit = ( event ) => {
        event.preventDefault();

        if( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en la autenticacion', 'Las contraseñas son diferentes', 'error');
            return;
        }
        // console.log({ registerName, registerEmail, registerPassword, registerPassword2 })
        startRegister({ name: registerName, email: registerEmail, password: registerPassword })
    }

    // Alarma en caso de que errorMessage sea diferente a undefined (error en autenticacion)
    useEffect(() => {
      if( errorMessage !== undefined ) {
        Swal.fire('Error en la autenticacion', errorMessage, 'error');
      }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }> 
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
