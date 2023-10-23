import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function ViewComputer() {
    const cookies = new Cookies();

    const [computer, setComputer] = useState({
        ram: "",
        cpu: "",
        inventoryId: "",
        networkId: "",
        storage: "",
        opSystem: "",
        software: "",
        office: {
            number: "",
            name: "",
        }
    })

    const [equipment, setEquipment] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadComputer();
        loadEquipment();
    }, [])

    const loadComputer = async () => {
        const result = await axios.get(`http://localhost:8080/computers/${id}`)
        setComputer(result.data)
    }

    const loadEquipment = async () => {
        const result = await axios.get(`http://localhost:8080/computers/${id}/equipment`)
        setEquipment(result.data)
    }

    const deleteEquipment = async (id) => {
        await axios.delete(`http://localhost:8080/equipment/${id}`)
        loadEquipment()
    }

    return (
        <div className='container shadow p-2 mt-2 border rounded backcolor'>
            <h3 className='text-center'>Kompiuterio duomenys</h3>
            <div className='form-group row mb-2'>
                <div className="col">
                    <ul className='list-group'>
                        {computer.office !== null ?
                            <div>
                                <li className="list-group-item">
                                    <b>Kabinetas: </b>
                                    {computer.office.number}
                                </li>
                                <li className="list-group-item">
                                    <b>Kabineto pavadinimas: </b>
                                    {computer.office.name}
                                </li>
                            </div>
                            : null}
                        <li className="list-group-item">
                            <b>Inventoriaus ID: </b>
                            {computer.inventoryNumber}
                        </li>
                        <li className="list-group-item">
                            <b>Pavadinimas tinkle: </b>
                            {computer.networkNumber}
                        </li>
                        <li className="list-group-item">
                            <b>Operatyvioji atmintis: </b>
                            {computer.ram}
                        </li>
                        <li className="list-group-item">
                            <b>Procesorius: </b>
                            {computer.cpu}
                        </li>
                        <li className="list-group-item">
                            <b>Saugykla: </b>
                            {computer.storage}
                        </li>
                        <li className="list-group-item">
                            <b>Operacinė sistema: </b>
                            {computer.operatingSystem}
                        </li>
                        <li className="list-group-item">
                            <b>Programinė įranga: </b>
                            {computer.software}
                        </li>
                        <li className="list-group-item">
                            <b>Pastaba: </b>
                            {computer.note}
                        </li>
                    </ul>
                    <div className='mt-2'>
                    </div>
                </div>
                <div className="col">
                    <h6>Šiam kompiuteriui priskirti įrenginiai:</h6>
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
                        : <h6>nėra</h6>}
                </div>
            </div>
            {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                <div>
                    <div className="row align-items-start">
                        <div className="col">
                            <Link className='btn btn-outline-primary' to={`/editcomputer/${computer.id}`}>Redaguoti</Link>
                        </div>
                        <div className="col">
                            <Link className="btn btn-outline-success" to={`/computers/addequipment/${computer.id}`}>Pridėti įrenginį</Link>
                        </div>
                    </div>
                </div>
                : null}
            <Link className='btn btn-outline-danger' to={-1}>Grįžti atgal</Link>
        </div>
    )
}
