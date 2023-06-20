import React, { useState } from 'react'
import { Navegacion } from './Navegacion'
import '../css/estilo.css'
import { useEffect } from 'react'
import { API_URL } from '../assets/const'
import { Agregarproductos } from './Agregarproductos'

export const Productos = () => {
    const [categorias, setCategorias] = useState([])
    const [colores, setColores] = useState([])
    const [tallas, setTallas] = useState([])
    const [sucursales,setSucursales]=useState([])
    

    const obtenerCategorias = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/categorias`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const datos = await datosRaw.json()
        setCategorias(datos[0])
    }
    const obtenerColores = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/colores`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const datos = await datosRaw.json()
        setColores(datos[0])
    }
    const obtenerTallas = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/tallas`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })
        const datos = await datosRaw.json()
        setTallas(datos[0])
    }
    const obtenerSucursales = async()=>{
        const datosRow= await fetch(`${API_URL}/productos/sucursales`,{
            method:'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const datos = await datosRow.json()
        setSucursales(datos[0])
    }
    useEffect(() => {
        obtenerCategorias()
        obtenerColores()
        obtenerTallas()
        obtenerSucursales()
    }, [])

    
    return (
        <div className='container-fluid cuerpo'>
            <Navegacion />
            <Agregarproductos categorias={categorias} colores={colores} tallas={tallas} sucursales={sucursales} obtCategorias={obtenerCategorias} obtColores={obtenerColores} obtTallas={obtenerTallas}/>
        </div >
    )
}
