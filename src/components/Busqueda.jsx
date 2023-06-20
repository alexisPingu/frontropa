import React, { useEffect, useState } from 'react'
import { Navegacion } from './Navegacion'
import '../css/estilo.css'
import { API_URL } from '../assets/const'

export const Busqueda = () => {
    const [categorias, setCategorias] = useState([])
    const [colores, setColores] = useState([])
    const [tallas, setTallas] = useState([])
    const [inventario, setInventario] = useState([])

    const [codigo, setCodigo] = useState('')
    const [talla, setTalla] = useState(0)
    console.log(talla)
    const [categoria, setCategoria] = useState(0)
    const [color, setColor] = useState(0)

  

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
    
    
    useEffect(() => {
        obtenerCategorias()
        obtenerColores()
        obtenerTallas()
    }, [])
    const inventarioCodigo = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/inventariocodigo`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'codigo': codigo
          }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        setInventario(datos[0])
      }
      const inventarioporCategoria = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/obtcat`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'categoria': categoria
          }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        setInventario(datos[0])
      }
      const inventrarioporCategoriaTalla = async () => {
        const datosRaw = await fetch(`${API_URL}/productos/obtcattalla`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'categoria': categoria,
            'talla':talla
          }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        setInventario(datos[0])
      }
      const inventrarioporCategoriaTallacolor= async () => {
        const datosRaw = await fetch(`${API_URL}/productos/obtcattallacolor`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'categoria': categoria,
            'talla':talla,
            'color':color
          }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        setInventario(datos[0])
      }

      const inventrarioporCategoriacolor= async () => {
        const datosRaw = await fetch(`${API_URL}/productos/obtcatcolor`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'categoria': categoria,
            'color':color
          }
        })
        const datos = await datosRaw.json()
        console.log(datos)
        setInventario(datos[0])
      }
      
      
    const inventarioMandar=()=>{
        if(codigo!=''){
            inventarioCodigo()
        }else if(categoria!=0 && talla==0 && color==0){
            inventarioporCategoria()
        }else if(categoria!=0 && talla!=0 && color==0){
            inventrarioporCategoriaTalla()
        }else if(categoria!=0 && talla!=0 && color!=0){
            inventrarioporCategoriaTallacolor()
        }else if(categoria!=0 && talla==0 && color!=0){
            inventrarioporCategoriacolor()
        }
    }
    const mandarActualizar=(indice)=>{
        window.location=`/#/actualizar/${indice}`
    }
    return (
        <div className='container-fluid cuerpo input-productos'>
            <Navegacion />
            <div class="container text-center mt-5 pt-5">
                <form onSubmit={inventarioMandar}>
                    <div class="row justify-content-md-center">
                        <div class="col col-lg-2">
                            <h1>Busqueda</h1>
                        </div>
                    </div>
                    <div class="row justify-content-md-center">
                        <div class="col col-lg-5">
                            <div class="input-group mb-3 col col-lg-2">
                                <span class="input-group-text" id="basic-addon1">Codigo</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{setCodigo(e.target.value)}} maxLength={15}/>
                            </div>
                        </div>
                        <div class="col col-lg-5">
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setCategoria(e.target.value) }}>
                                <option value={0} selected>Selecciona una categoria</option>
                                {
                                    categorias.map((item, index) => {
                                        return <option value={item.ID}>{item.CATEGORIA}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div class="row justify-content-md-center">
                        <div class="col col-lg-5">
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setColor(e.target.value) }}>
                                <option value={0} selected>Selecciona un color</option>
                                {

                                    colores.map((item, index) => {
                                        return <option value={item.ID}>{item.COLOR}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div class="col col-lg-5">
                            <select class="form-select" aria-label="Default select example" onChange={(e) => { setTalla(e.target.value) }}>
                                <option value={0} selected>Selecciona una talla</option>
                                {
                                    tallas.map((item, index) => {
                                        return <option value={item.ID}>{item.TALLA}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div class="row justify-content-md-center">
                        <div class="col col-lg-12">
                            <button type="submit" class="btn btn-secondary col-lg-10">Buscar</button>
                        </div>
                    </div>



                </form>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Color</th>
                            <th scope="col">Talla</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventario.map((item, index) => {
                            return (
                                <tr>
                                    <td key={index}>{item.CODIGO}</td>
                                    <td>{item.CANTIDAD}</td>
                                    <td>${item.PRECIO}</td>
                                    <td>{item.CATEGORIA}</td>
                                    <td>{item.COLOR}</td>
                                    <td>{item.TALLA}</td>
                                    <td><button type="button" onClick={()=>{mandarActualizar(item.CODIGO)}} class="btn btn-primary">Ver</button></td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>

            </div>
        </div>
    )
}
