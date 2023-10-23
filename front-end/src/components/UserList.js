import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (
        <div className='container'>
            <div className='py-2'>
                <div className="row align-items-start">
                    <div className="col">
                        <Link className="btn btn-outline-success mb-2" to="/register">
                            Nauja paskyra
                        </Link>
                    </div>
                    <div className="col">
                        <h3>Paskyros</h3>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className='table-responsive'>

                    <table className="table border shadow table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="rownumber">#</th>
                                <th scope="col">Vardas</th>
                                <th scope="col">Pavardė</th>
                                <th scope="col">El. paštas</th>
                                <th scope="col">Rolė</th>
                                <th scope="col">Veiksmas</th>
                            </tr>
                        </thead>
                        <tbody id="TextBoxContainer">
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role}</td>

                                        <td className="nav-item dropdown overflow-visible position-static">
                                            {user.role !== "ADMIN" ?
                                                <Link data-toggle="tooltip" title="Ištrinti" onClick={() => { if (window.confirm('Ar tikrai norite ištrinti šį naudotoją?')) { deleteUser(user.id) } }}><i className="fa fa-trash fa-lg text-danger"> </i></Link>
                                                : "-"}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div className='d-flex justify-content-end col'>
                <h6>Iš viso paskyrų: {users.length}</h6>
              </div>
            </div>
        </div>
    )
}
