import React, { useEffect, useState } from 'react'
import '../css/estilo.css'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const Login = () => {
    const [usuario, setUsuario] = useState('')
    const [pass, setPass] = useState('')
    const [eleccion,setEleccion]=useState(1)
    const [sucursal, setSucursal] = useState([])

    const ingresar = async (e) => {
        e.preventDefault()
        const datosRaw = await fetch(`${API_URL}/login`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'usuario': usuario,
                'pass': pass
            },
        })
        const datos = await datosRaw.json()
        console.log(datos)
        if (datos[0].length != 0) {
            console.log(eleccion)
            document.cookie = `rfc=${datos[0][0].RFC};path=/;somesite=strict;`
            document.cookie = `tipo=${datos[0][0].TIPO};path=/;somesite=strict;`
           // document.cookie = `sucursal=${eleccion};path=/;somesite=strict;`
            //const suc = document.cookie.split('sucursal=')[1];
            window.location = '/#/home'
        } else {
            Swal.fire(
                'Upsss',
                'Parece que tus datos no son correctos',
                'warning'
            )
        }
    }
   
    return (
        <>
            <div className="container-fluid cuerpo cuerpo-realtivo d-flex flex-column justify-content-center align-items-center">
                <form onSubmit={ingresar} className='border border-white border-3 p-3 rounded-5 col-lg-6 col-md-8 text-center form-login shadow'>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Usuario</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary col-12">Iniciar sesion</button>
                </form>
                <div className="background"></div>
            </div>
        </>
    )
}
