import React, { useEffect, useState } from 'react'
import '../css/estilo.css'
import { Navegacion } from './Navegacion'
import { API_URL } from '../assets/const'
import Swal from 'sweetalert2'

export const InsertarSucursales = () => {
    const [dataSucursal,setDataSucursal]=useState({nombre:'',direccion:'',contacto:''})
    const [sucursales, setSucursales] = useState([])
    const obtenerSucursales = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/sucursales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRaw.json()
        setSucursales(datos[0])
    }
    useEffect(() => {
        obtenerSucursales()
    },[])
    const enviar=async()=>{
        try {
            const mensaje=await fetch(`${API_URL}/productos/insertarsucursal`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(dataSucursal)
            })
            const aviso=await mensaje.json()
            //console.log(aviso)
            Swal.fire('Mensaje', aviso[0][0].mensaje, 'info')
            obtenerSucursales()
            setDataSucursal({nombre:'',direccion:'',contacto:''})
        } catch (error) {
            Swal.fire('Error', error.message, 'error')
        }
    }
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <div className='container mt-5 pt-5 input-productos text-center'>
                <h1>Sucursales</h1>
                <form onSubmit={enviar}>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1" >Nombre</span>
                        <input type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1"
                        value={dataSucursal.nombre} onChange={(e)=>{setDataSucursal({...dataSucursal,nombre:e.target.value})}} />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Direccion</span>
                        <input type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1" 
                        value={dataSucursal.direccion} onChange={(e)=>{setDataSucursal({...dataSucursal,direccion:e.target.value})}}/>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Contacto</span>
                        <input type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1" 
                        value={dataSucursal.contacto} onChange={(e)=>{setDataSucursal({...dataSucursal,contacto:e.target.value})}}/>
                    </div>
                    <button type="submit" class="btn btn-primary col-12">Enviar</button>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">CLAVE</th>
                            <th scope="col">NOMBRE</th>
                            <th scope="col">DIRECCION</th>
                            <th scope="col">CONTACTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sucursales.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{item.ID}</th>
                                        <td>{item.NOMBRE}</td>
                                        <td>{item.DIRECCION}</td>
                                        <td>{item.CONTACTO}</td>
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
