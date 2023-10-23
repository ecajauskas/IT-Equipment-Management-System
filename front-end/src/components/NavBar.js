import { React, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function NavBar() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const logout = () => {
        cookies.remove("jwt_authorization", { path: '/' });
    }

    const [role, setRole] = useState("");
    const [user, setUser] = useState("");
    useEffect(() => {
        if (cookies.get("jwt_authorization") != null) {
            setRole(jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority);
            setUser(jwt_decode(cookies.get("jwt_authorization")).sub);
        }
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand" to="/"><span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Klaipėdos Baltijos gimnazija</span></Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/officelist" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "nav-link active" : "nav-link"}><span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Kabinetai</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/computerlist/1" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "nav-link active" : "nav-link"}><span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Kompiuteriai</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/equipmentlist/1" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "nav-link active" : "nav-link"}><span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Įrenginiai</span></NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {role == "ADMIN" ?

                                <li className="nav-item">
                                    <NavLink to="/userlist" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "nav-link active" : "nav-link"}><span data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Naudotojai</span></NavLink>
                                </li>
                                : null}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li className="nav-item d-flex justify-content-center">
                                        <Link className="text-black" type="button" onClick={logout}><i className="fa fa-sign-out">Atsijungti</i></Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

