import React from 'react'
import { Link } from 'react-router-dom'

export const Navegacion = () => {
    const rfc = document.cookie.split('rfc=')[1];
    const tipo = document.cookie.split('tipo=')[1];

    return (
        <nav class="navbar bg-body-tertiary fixed-top">
            <div class="container-fluid">
                <Link to={'/home'}><h1 class="navbar-brand">Tienda Ropa</h1></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu Principal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {(() => {
                                if (tipo == 2) {
                                    return <>
                                        <li class="nav-item">
                                            <Link class="nav-link" aria-current="page" to={'/productos'}>Productos</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link class="nav-link" to={'/empleados'}>Empleados</Link>
                                        </li>
                                    </>
                                }
                            })()}
                            <li class="nav-item">
                                <Link class="nav-link" aria-current="page" to={'/vender'}>Vender</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={'/egresos'}>Egresos</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={'/corte'}>Corte</Link>
                            </li>
                            {(() => {
                                if (tipo == 2) {
                                    return <>
                                        <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Otras opciones
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to={'/sucursales'}>Sucursales</Link></li>
                                </ul>
                            </li>
                                    </>
                                }
                            })()}
                            
                            <li class="nav-item">
                                <Link class="nav-link" to={'/'}>Cerrar sesion</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </nav>
    )
}
