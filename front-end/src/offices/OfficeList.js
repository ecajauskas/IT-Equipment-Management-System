import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function Offices() {
  const [offices, setOffices] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    loadOffices();
  }, []);

  const loadOffices = async () => {
    const result = await axios.get("http://localhost:8080/offices")
    setOffices(result.data);
  }

  const deleteOffice = async (id) => {
    await axios.delete(`http://localhost:8080/offices/${id}`)
    loadOffices()
  }

  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...offices].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setOffices(sorted);
      setOrder("DSC");
    } else {
      const sorted = [...offices].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setOffices(sorted);
      setOrder("ASC");
    }
  };

  const searchHandle = async (e) => {
    const query = e.target.value;
    if (query) {
      const result = await axios.get(`http://localhost:8080/offices/search?query=${query}`);
      if (result) {
        setOffices(result.data)
      }
    }
    else {
      loadOffices();
    }
  }

  return (
    <div className='container'>
      <div className='py-2'>
        <div className="row align-items-start">
          <div className="col">
            {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
              <Link className="btn btn-outline-success mb-2" to="/addoffice">
                Pridėti kabinetą
              </Link>
              : null}
          </div>
          <div className="col">
            <h3>Kabinetai</h3>
          </div>
          <div className="col">
            <input className='form-control bg-light' placeholder='Paieškos laukas' onChange={searchHandle}></input>
          </div>
        </div>
        {offices.length ?
          <table className="table border shadow table-striped">
            <thead>
              <tr>
                <th scope="col" className="rownumber">#</th>
                <th scope="col" onClick={() => sorting("number")}>Kabineto numeris</th>
                <th scope="col" onClick={() => sorting("name")}>Kabineto pavadinimas</th>
                <th scope="col">Veiksmas</th>
              </tr>
            </thead>
            <tbody id="TextBoxContainer">
              {
                offices.sort((a, b) => a.number > b.number ? 1 : -1).map((office, index) => (
                  <tr key={index}>
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{office.number}</td>
                    <td>{office.name}</td>
                    {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                      <td>
                        <Link data-toggle="tooltip" title="Peržiūrėti" to={`/viewoffice/${office.id}/${office.number}`}><i className="fa fa-eye fa-lg text-dark me-2"> </i></Link>
                        <Link data-toggle="tooltip" title="Redaguoti" to={`/editoffice/${office.id}`}><i className="fa fa-edit fa-lg me-2"> </i></Link>
                        <Link data-toggle="tooltip" title="Ištrinti" onClick={() => { if (window.confirm('Ar tikrai norite ištrinti šį kabinetą? \nPriskirti IT įranga liks be kabineto.')) { deleteOffice(office.id) } }}><i className="fa fa-trash fa-lg text-danger"> </i></Link>
                      </td>
                      : <td><Link data-toggle="tooltip" title="Peržiūrėti" to={`/viewoffice/${office.id}/${office.number}`}><i className="fa fa-eye fa-lg text-dark"> </i></Link></td>}
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <h6>nėra nei vieno pridėto kabineto</h6>}
        <div className='d-flex justify-content-end col'>
          <h6>Iš viso kabinetų: {offices.length}</h6>
        </div>
      </div>
    </div>
  )
}
