import React from 'react'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function Home() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-3 mt-2 shadow backcolor'>
                    <h4>Leistinos funkcijos:</h4>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button className='btn btn-outline-dark mt-2' onClick={(e) => navigate(`/officelist`)}>Kabinetai</button>
                        <button className='btn btn-outline-dark' onClick={(e) => navigate(`/computerlist/1`)}>Kompiuteriai</button>
                        <button className='btn btn-outline-dark' onClick={(e) => navigate(`/equipmentlist/1`)}>Įrenginiai</button>
                        {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                             <button className='btn btn-outline-dark' onClick={(e) => navigate(`/userlist`)}>Naudotojai</button>
                        : null }
                    </div>
                </div>
            </div>
        </div>
    )
}
