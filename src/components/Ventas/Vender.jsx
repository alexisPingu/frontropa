import React, { useEffect, useState } from 'react'
import { Navegacion } from '../Navegacion'
import { VentasGenerales } from './VentasGenerales'
import '../../css/estilo.css'
import { API_URL } from '../../assets/const'

export const Vender = () => {
    const [pagos, setPagos] = useState([])
    const [venta, setVenta] = useState([])

    const traerPagos = async () => {
        const datos = await fetch(`${API_URL}/pagos`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }

            })
        const pagos1 = await datos.json()
        setPagos(pagos1[0])
    }
    const traerVentas = async () => {
        const datos = await fetch(`${API_URL}/ventas`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }

            })
        const ventas = await datos.json()
        setVenta(ventas[0])
    }

    useEffect(() => {
        traerPagos()
        traerVentas()
    }, [])
    return (
        <div className='container-fluid cuerpo input-productos'>
            <Navegacion />
            <div className='m-5 p-5 text-center'>
                <h1>Ventas</h1>
                <br />
                <form className='row'>
                    <div className='col-lg-6 col-md-12 mb-2'>
                        <select class="form-select" aria-label="Default select example">
                            {
                                pagos.map((pago, index) => {
                                    return <option value={pago.ID}>{pago.PAGO}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='col'>
                        <select class="form-select" aria-label="Default select example">
                        {
                                venta.map((ven, index) => {
                                    return <option value={ven.ID}>{ven.TIPO}</option>
                                })
                            }
                        </select>
                    </div>

                </form>
                <VentasGenerales/>
            </div>

        </div >
    )
}
