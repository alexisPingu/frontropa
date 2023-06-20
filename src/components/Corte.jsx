import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import { API_URL } from '../assets/const'
import '../css/estilo.css'

export const Corte = () => {
    const [ventasAEfectivo, setventasAEfectivo] = useState([])
    const [ventasATarjeta, setventasATarjeta] = useState([])
    const [egresosAnteriores, setegresosAnteriores] = useState([])

    const [ventasActEfectivo, setventasActEfectivo] = useState([])
    const [ventasActTarjeta, setventasActTarjeta] = useState([])
    const [egresosActuales, setegresosActuales] = useState([])

    const [sucursales, setSucursales] = useState([])
    const [sucursal, setSucursal] = useState(1)

    const [cajaAnterior, setCajaAnterior] = useState(0)
    const [cajaEfectivo, setCajaEfectivo] = useState(0)
    const [cajaTarjeta, setCajaTarjeta] = useState(0)
    const [cajaEgresos, setCajaEgresos] = useState(0)

    const ventasEfectivoAnteriores = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/ventasEfectivoAnteriores`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setventasAEfectivo(datos[0])

    }
    const ventasTarjetaAnteriores = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/ventasTarjetaAnteriores`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setventasATarjeta(datos[0])
    }
    const egresosAnterioresD = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/egresosAnteriores`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setegresosAnteriores(datos[0])
    }
    const ventasEfectivoActuales = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/ventasEfectivoActuales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setventasActEfectivo(datos[0])
    }
    const ventasTarjetaActuales = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/ventasTarjetaActuales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setventasActTarjeta(datos[0])
    }
    const egresosActualesD = async () => {
        const datosRaw = await fetch(`${API_URL}/corte/egresosActuales`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'sucursal': sucursal
            },
        })
        const datos = await datosRaw.json()
        setegresosActuales(datos[0])
    }
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
    })

    const corteCaja = async () => {
        ventasEfectivoAnteriores()
        //ventasTarjetaAnteriores()
        egresosAnterioresD()

        ventasEfectivoActuales()
        ventasTarjetaActuales()
        egresosActualesD()
        console.log(ventasAEfectivo)
        console.log(egresosAnteriores)
        let sumaEfectivoAnterior=0
        ventasAEfectivo.map((item, index) => {
            let multiplicacion = parseInt(item.cantidad) * parseFloat(item.precioFinal);
            sumaEfectivoAnterior =sumaEfectivoAnterior + multiplicacion
        })
        /*let sumaTarjetaAnterior=0
        ventasATarjeta.map((item, index) => {
            let multiplicacion = parseInt(item.cantidad) * parseFloat(item.precioFinal);
            sumaTarjetaAnterior =sumaTarjetaAnterior  + multiplicacion
        })*/

        
        let sumaEgresoAnterior=0
        egresosAnteriores.map((item, index) => {
            sumaEgresoAnterior =sumaEgresoAnterior + item.cantidad
        })
        setCajaAnterior(sumaEfectivoAnterior-sumaEgresoAnterior)

        ////actuales
        let sumaEfectivoActual=0
        ventasActEfectivo.map((item, index) => {
            let multiplicacion = parseInt(item.cantidad) * parseFloat(item.precioFinal);
            sumaEfectivoActual =sumaEfectivoActual + multiplicacion
        })
        setCajaEfectivo(sumaEfectivoActual)
        let sumaTarjetaActual=0
        ventasActTarjeta.map((item, index) => {
            let multiplicacion = parseInt(item.cantidad) * parseFloat(item.precioFinal);
            sumaTarjetaActual=sumaTarjetaActual  + multiplicacion
        })
        setCajaTarjeta(sumaTarjetaActual)
        
        let sumaEgresoAactual=0
        egresosActuales.map((item, index) => {
            sumaEgresoAactual =sumaEgresoAactual + item.cantidad
        })
        setCajaEgresos(sumaEgresoAactual)

    }
    //console.log(cajaAnterior)
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <div className='container mt-5 pt-5 input-productos text-center'>
                <h1>Corte</h1>
                <form onSubmit={corteCaja}>
                    <select class="form-select" aria-label="Default select example" value={sucursal} onChange={(e) => { setSucursal(e.target.value) }}>
                        {sucursales.map((item, index) => { return <option value={item.ID}>{item.NOMBRE}</option> })}
                    </select>
                    <button type="submit" class="btn btn-primary col-12">Corte</button>
                </form>
                <div class="card mt-3">
                    <div class="card-body justify-content-start">
                        <h1>Caja en efectivo anterior: ${cajaAnterior}</h1>
                        <h1>Ventas en efectivo actual: ${cajaEfectivo}</h1>
                        <h1>Ventas con tarjeta actual: ${cajaTarjeta}</h1>
                        <h1>Total egresos actuales: ${cajaEgresos}</h1>
                        <h1>Total en caja: ${cajaAnterior+cajaEfectivo-cajaEgresos}</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}
