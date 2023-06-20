import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import '../css/estilo.css'
import { API_URL } from '../assets/const'

export const Home = () => {
  const [sucursales, setSucursales] = useState([])
  const [inventario, setInventario] = useState([])
  const [sucursal, setSucursal] = useState(0)





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
  }, [])
  const obtenerInventarioGeneral = async () => {
    const datosRaw = await fetch(`${API_URL}/productos/inventario`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    const datos = await datosRaw.json()
    setInventario(datos[0])
  }
  
  const obtenerInventarioGeneralSucursal = async () => {
    const datosRaw = await fetch(`${API_URL}/productos/inventariosucursal`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'sucursal': sucursal
      }
    })
    const datos = await datosRaw.json()
    setInventario(datos[0])
  }

  const crearInventario = () => {
    if (sucursal == 0) {
      obtenerInventarioGeneral()
    } else {
      obtenerInventarioGeneralSucursal()
    }
  }
  const mandar=()=>{
    window.location='/#/busqueda'
  }
  return (
    <div className='container-fluid cuerpo input-productos'>
      <Navegacion />
      <div class="container text-center mt-5 pt-5">
        <div class="row justify-content-md-center">
          <div class="col col-lg-2">
            <h1>Inventario</h1>
          </div>
        </div>
        <form onSubmit={crearInventario}>
          <div class="row justify-content-md-center">
            <div class="col col-lg-5">
              <select class="form-select" aria-label="Default select example" onChange={(e) => { setSucursal(e.target.value) }}>
                <option value={0}>Todo</option>
                {
                  sucursales.map((sucursal, index) => {
                    return <option value={sucursal.ID}>{sucursal.NOMBRE}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div class="row justify-content-md-center">
            <div class="col-5">
              <div class="input-group mt-3">
                <button type="submit" class="btn btn-primary col">Generar inventario</button>
              </div>
            </div>

            <div class="col-5">
              <div class="input-group mt-3">
                <button type="button" class="btn btn-secondary col" onClick={() => { mandar() }}>Busqueda Avanzada</button>
              </div>
            </div>
          </div>
        </form>
        <div class="row justify-content-md-center">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Codigo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Talla</th>
                  <th scope="col">Color</th>
                </tr>
              </thead>
              <tbody>
                {
                  inventario.map((inv, index) => {
                    return (<tr>
                      <th key={index}>{inv.CODIGO}</th>
                      <td>{inv.CANTIDAD}</td>
                      <td>{inv.PRECIO}</td>
                      <td>{inv.CATEGORIA}</td>
                      <td>{inv.COLOR}</td>
                      <td>{inv.TALLA}</td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
