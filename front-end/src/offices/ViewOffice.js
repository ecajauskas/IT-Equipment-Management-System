import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function Office() {
    const [equipment, setEquipment] = useState([]);
    const [computers, setComputers] = useState([]);
    let { officeid } = useParams();
    let { officenumber } = useParams();
    const cookies = new Cookies();

    useEffect(() => {
        loadComputers(officenumber);
        loadEquipment();
    }, []);

    const loadComputers = async () => {
        const result = await axios.get(`http://localhost:8080/offices/${officeid}/computers`);
        setComputers(result.data);
    }

    const loadEquipment = async () => {
        const result = await axios.get(`http://localhost:8080/offices/${officeid}/equipment`);
        setEquipment(result.data);
    }

    const deleteComputer = async (id) => {
        await axios.delete(`http://localhost:8080/computers/${id}`)
        loadComputers(officenumber)
    }

    const deleteEquipment = async (id) => {
        await axios.delete(`http://localhost:8080/equipment/${id}`)
        loadEquipment()
    }

    return (
        <div className='container shadow p-2 mt-2 border rounded backcolor'>
            <div className="row">
                <h3>{officenumber} kabineto įranga</h3>
                <div className="col">
                    <h4>Kompiuteriai</h4>
                    {computers.length ?
                        <div className='table-responsive'>
                            <table className="table border shadow table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Inventoriaus nr.</th>
                                        <th scope="col">Pav. tinkle</th>
                                        <th scope="col">Pastaba</th>
                                        <th scope="col">Veiksmas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        computers.map((computer, index) => (
                                            <tr key={index}>
                                                <td>{computer.inventoryNumber}</td>
                                                <td>{computer.networkNumber}</td>
                                                <td>{computer.note}</td>
                                                {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                                                    <td>
                                                        <Link data-toggle="tooltip" title="Peržiūrėti" to={`/viewcomputer/${computer.id}`}><i className="fa fa-eye fa-lg text-dark me-2"> </i></Link>
                                                        <Link data-toggle="tooltip" title="Redaguoti" to={`/editcomputer/${computer.id}`}><i className="fa fa-edit fa-lg me-2"> </i></Link>
                                                        <Link data-toggle="tooltip" title="Ištrinti" onClick={() => { if (window.confirm('Ar tikrai norite ištrinti šį kompiuterį?')) { deleteComputer(computer.id) } }}><i className="fa fa-trash fa-lg text-danger"> </i></Link>
                                                    </td>
                                                    : <td><Link data-toggle="tooltip" title="Peržiūrėti" to={`/viewcomputer/${computer.id}`}><i className="fa fa-eye fa-lg text-dark"> </i></Link></td>}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <h6>nėra priskirtų kompiuterių</h6>}
                </div>
                <div className="col">
                    <div className="col">
                        <h4>Įrenginiai</h4>
                    </div>
                    {equipment.length ?
                        <div className='table-responsive'>
                            <table className="table border shadow table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Kategorija</th>
                                        <th scope="col">Pavadinimas</th>
                                        <th scope="col">Aprašymas</th>
                                        <th scope="col">Inventoriaus nr.</th>
                                        <th scope="col">Pastaba</th>
                                        {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?

                                            <th scope="col">Veiksmas</th>
                                            : null}
                                    </tr>
                                </thead>
                                <tbody id="TextBoxContainer">
                                    {
                                        equipment.map((equipment, index) => (
                                            <tr key={index}>
                                                <td>{equipment.category}</td>
                                                <td>{equipment.name}</td>
                                                <td>{equipment.description}</td>
                                                <td>{equipment.inventoryNumber}</td>
                                                <td>{equipment.note}</td>
                                                {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                                                    <td>
                                                        <Link data-toggle="tooltip" title="Redaguoti" to={`/editequipment/${equipment.id}`}><i className="fa fa-edit fa-lg me-2"> </i></Link>
                                                        <Link data-toggle="tooltip" title="Ištrinti" onClick={() => { if (window.confirm('Ar tikrai norite ištrinti šį įrenginį?')) { deleteEquipment(equipment.id) } }}><i className="fa fa-trash fa-lg text-danger"> </i></Link>
                                                    </td>
                                                    : null}
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        : <h6>nėra priskirtų įrenginių</h6>}
                </div>
                <div className='wrapper'>
                    {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                        <div>
                            <div className="row align-items-start">
                                <div className="col">
                                    <Link className="btn btn-outline-success" to={`/addcomputer/${officenumber}`}>Pridėti kompiuterį</Link>
                                </div>
                                <div className="col">
                                    <Link className="btn btn-outline-success" to={`/offices/addequipment/${officenumber}`}>Pridėti įrenginį</Link>
                                </div>
                            </div>
                        </div>
                        : null}
                    <Link className='btn btn-outline-danger' to={-1}>Grįžti atgal</Link>
                </div>
            </div>
        </div>
    )
}
