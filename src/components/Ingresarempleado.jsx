import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import '../css/estilo.css'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const Ingresarempleado = () => {
    const [rfc, setRfc] = useState('')
    const [datosObtenido, setDatosObtenidos] = useState([])
    console.log(rfc)
    const [tiposUsuarios, setTipoUsuarios] = useState([])
    const [datosEmpleado, setDatosEmpleado] = useState(
        {
            rfc: '',
            nombres: '',
            apellidos: '',
            direccion: '',
            telefono: '',
            correo: '',
            usuario: '',
            contrasenia: '',
            tipo: 1
        })
    const obteberTiposUsuarios = async () => {
        const datosRow = await fetch(`${API_URL}/login/tiposUsuarios`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRow.json()
        setTipoUsuarios(datos[0])
    }
    const obtenerDatosEmpleado = async () => {
        const datosRow = await fetch(`${API_URL}/ventas/obtnerempleado`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'rfc': rfc
            }
        })
        const datos = await datosRow.json()
        setDatosObtenidos(datos[0])
    }

    useEffect(() => {
        obteberTiposUsuarios()
        obtenerDatosEmpleado()
    }, [])
    const nuevoEmpleado = async () => {
        const body = {
            "rfc": datosEmpleado.rfc,
            "nombres": datosEmpleado.nombres,
            "apellidos": datosEmpleado.apellidos,
            "direccion": datosEmpleado.direccion,
            "telefono": datosEmpleado.telefono,
            "correo": datosEmpleado.correo,
            "usuario": datosEmpleado.usuario,
            "contrasenia": datosEmpleado.contrasenia,
            "tipo": datosEmpleado.tipo
        }
        try {
            const mensaje = await fetch(`${API_URL}/ventas/ingresarempleado`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const aviso = await mensaje.json()
            Swal.fire('Mensaje', aviso[0][0].Mensaje, 'info')
            if(aviso[0][0].Mensaje=='Ya existe el empleado'){
                setRfc(datosEmpleado.rfc)
            }
            setDatosEmpleado({
                rfc: '',
                nombres: '',
                apellidos: '',
                direccion: '',
                telefono: '',
                correo: '',
                usuario: '',
                contrasenia: '',
                tipo: 1
            })
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }
    const datos = () => {
        //console.log(datosEmpleado)
        nuevoEmpleado()
    }
    const obtener = () => {
        //console.log(datosEmpleado)
        obtenerDatosEmpleado()
    }
    const actualizar=(rfc)=>{
        window.location=`/#/empleadosactulizar/${rfc}`
    }
    return (
        <div className='container-fluid cuerpo input-productos'>
            <Navegacion />

            <div className='container input-productos'>
                <h1 className='mt-5 pt-5 text-center'>Registrar empleado</h1>
                <form onSubmit={datos} className='mt-3'>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">RFC</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required maxLength={13} value={datosEmpleado.rfc} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, rfc: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nombre(s)</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.nombres} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, nombres: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Apellidos</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.apellidos} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, apellidos: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Direccion</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.direccion} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, direccion: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefono</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required maxLength={10} value={datosEmpleado.telefono} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, telefono: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Correo</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.correo} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, correo: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Usuario</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.usuario} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, usuario: e.target.value }) }} />
                        <span class="input-group-text ms-1" id="basic-addon1" >Contraseña</span>
                        <input type="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosEmpleado.contrasenia} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, contrasenia: e.target.value }) }} />
                    </div>
                    <div class="input-group mb-3">
                        <select class="form-select" aria-label="Default select example" value={datosEmpleado.tipo} onChange={(e) => { setDatosEmpleado({ ...datosEmpleado, tipo: e.target.value }) }}>
                            {
                                tiposUsuarios.map((item, index) => {
                                    return <option value={item.ID}>{item.Usuario}</option>
                                })
                            }


                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary col-12">Agregar</button>
                </form>
                <form onSubmit={obtener}>
                    <h1 className='text-center'>Buscar empleado</h1>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">RFC</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={rfc} onChange={(e) => { setRfc(e.target.value) }} />
                    </div>
                </form>

                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">RFC</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">APELLIDOS</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datosObtenido.map((item, index) => {
                                return (
                                    <tr>
                                        <td >{item.RFC}</td>
                                        <td>{item.NOMBRES}</td>
                                        <td>{item.APELLIDOS}</td>
                                        <td><button type="button" class="btn btn-primary" onClick={()=>{actualizar(item.RFC)}}>Editar</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}