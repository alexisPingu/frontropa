import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import { useParams } from 'react-router-dom'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const Actulizarempleado = () => {
    const { rfc } = useParams()
    const [tiposUsuarios, setTipoUsuarios] = useState([])
    console.log(rfc)
    const [datosObtenidos, setDatosObtenidos] = useState({})
    const obtenerDatosEmpleado = async () => {
        const datosRow = await fetch(`${API_URL}/ventas/obtnerempleado`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'rfc': rfc
            }
        })
        const datos = await datosRow.json()
        console.log(datos[0][0])
        setDatosObtenidos(datos[0][0])
    }
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
    useEffect(() => {
        obtenerDatosEmpleado()
        obteberTiposUsuarios()
    }, [])
    const actualizarEmpleado=()=>{
        actualizarempleado()
    }
    const actualizarempleado = async () => {
        const body={
            'rfc':datosObtenidos.RFC,
            'direccion': datosObtenidos.DIRECCION,
            'telefono':datosObtenidos.TELEFONO,
            'correo': datosObtenidos.CORREO,
            'usuario':datosObtenidos.USUARIO,
            'pass':datosObtenidos.PASSWORD,
            'tipo':datosObtenidos.TIPO
        }
        const datosRow = await fetch(`${API_URL}/ventas/actualizarempleado`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const aviso = await datosRow.json()
        Swal.fire('Mensaje', aviso[0][0].mensaje, 'info')

        
    }
    return (
        <div className='container-fluid cuerpo input-productos'>
            <Navegacion />
            <div className='container'>
                <form className='mt-5 pt-5' onSubmit={actualizarEmpleado}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">RFC</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required maxLength={13} disabled value={datosObtenidos.RFC} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nombre(s)</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required disabled value={datosObtenidos.NOMBRES} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Apellidos</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required disabled value={datosObtenidos.APELLIDOS} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Direccion</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosObtenidos.DIRECCION} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,DIRECCION:e.target.value})}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Telefono</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required maxLength={10} value={datosObtenidos.TELEFONO} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,TELEFONO:e.target.value})}} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Correo</span>
                        <input type="email" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosObtenidos.CORREO} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,CORREO:e.target.value})}} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Usuario</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosObtenidos.USUARIO} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,USUARIO:e.target.value})}}/>
                        <span class="input-group-text ms-1" id="basic-addon1" >Contraseña</span>
                        <input type="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required value={datosObtenidos.PASSWORD} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,PASSWORD:e.target.value})}} />
                    </div>
                    <div class="input-group mb-3">
                        <select class="form-select" aria-label="Default select example" value={datosObtenidos.TIPO} onChange={(e)=>{setDatosObtenidos({...datosObtenidos,TIPO:e.target.value})}}>
                            {
                                tiposUsuarios.map((item, index) => {
                                    return <option value={item.ID}>{item.Usuario}</option>
                                })
                            }


                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary col-12">Actualizar</button>
                </form>
            </div>
        </div>
    )
}
