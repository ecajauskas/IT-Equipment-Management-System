import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  let { pagenumber } = useParams();
  const [currentPage, setCurrentPage] = useState(pagenumber);
  const [equipmentPerPage] = useState(10)
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    const result = await axios.get("http://localhost:8080/equipment")
    setEquipment(result.data);
  }

  const deleteEquipment = async (id) => {
    await axios.delete(`http://localhost:8080/equipment/${id}`)
    loadEquipment()
    if (equipment.length % 10 == 1 && pagenumber != 1) {
      navigate(`/equipmentlist/${pagenumber - 1}`)
      navigate(0)
    }
  }

  const indexOfLastEquipment = currentPage * equipmentPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
  const currentEquipment = equipment.slice(indexOfFirstEquipment, indexOfLastEquipment);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchHandle = async (e) => {
    const query = e.target.value;
    if (query) {
      const result = await axios.get(`http://localhost:8080/equipment/search?query=${query}`);
      if (result) {
        setEquipment(result.data)
      }
    }
    else {
      loadEquipment();
    }
  }

  return (
    <div className='container'>
      <div className='py-2'>
        <div className="row">
          <div className="col">
            {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
              <Link className="btn btn-outline-success mb-2" to="/offices/addequipment/new">
                Pridėti įrenginį
              </Link>
              : null}
          </div>
          <div className="col">
            <h3>Įrenginiai</h3>
          </div>
          <div className="col">
            <input className='form-control bg-light' placeholder='Paieškos laukas' onChange={searchHandle}></input>
          </div>
        </div>
        {equipment.length ?
          <div className='table-responsive'>
            <table className="table border shadow table-striped">
              <thead>
                <tr>
                  <th scope="col" className="rownumber">#</th>
                  <th scope="col">Kabinetas</th>
                  <th scope="col">Kompiuteris</th>
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
                  currentEquipment.map((equipment, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {(currentPage - 1) * equipmentPerPage + index + 1}
                      </th>
                      {equipment.office !== null ? <td>{equipment.office.number}</td> : <td>-</td>}
                      {equipment.computer !== null ? <td>{equipment.computer.inventoryNumber}</td> : <td>-</td>}
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
          : <h6>nėra nei vieno pridėto įrenginio</h6>}
        <div className='row'>
          {equipment.length > 10 ?
            <div className='d-flex justify-content-start col'>
              <Pagination
                objectsPerPage={equipmentPerPage}
                totalObjects={equipment.length}
                paginate={paginate}
                typeoflist="equipmentlist"
              />
            </div>
            : null}
          <div className='d-flex justify-content-end col'>
            <h6>Iš viso įrenginių: {equipment.length}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}