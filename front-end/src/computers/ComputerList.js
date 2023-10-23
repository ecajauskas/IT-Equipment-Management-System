import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export default function ComputerList() {
  const [computers, setComputers] = useState([]);
  let { pagenumber } = useParams();
  const [currentPage, setCurrentPage] = useState(pagenumber);
  const [computersPerPage] = useState(10);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    loadComputers();
  }, []);

  const loadComputers = async () => {
    const result = await axios.get("http://localhost:8080/computers")
    setComputers(result.data);
  }

  const deleteComputer = async (id) => {
    await axios.delete(`http://localhost:8080/computers/${id}`)
    loadComputers()
    if (computers.length % 10 == 1 && pagenumber != 1) {
      navigate(`/computerlist/${pagenumber - 1}`)
      navigate(0)
    }
  }

  const indexOfLastComputer = currentPage * computersPerPage;
  const indexOfFirstComputer = indexOfLastComputer - computersPerPage;
  const currentComputers = computers.slice(indexOfFirstComputer, indexOfLastComputer);
  const paginate = (pagenumber) => setCurrentPage(pagenumber);

  const searchHandle = async (e) => {
    const query = e.target.value;
    if (query) {
      const result = await axios.get(`http://localhost:8080/computers/search?query=${query}`);
      if (result) {
        setComputers(result.data)
      }
    }
    else {
      loadComputers();
    }
  }

  //rasti kaip sortinti pagal kabineta
  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...computers].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setComputers(sorted);
      setOrder("DSC");
    } else {
      const sorted = [...computers].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setComputers(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div className='container'>
      <div className='py-2'>
        <div className="row">
          <div className="col">
            {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
              <Link className="btn btn-outline-success mb-2" to="/addcomputer/new">
                Pridėti kompiuterį
              </Link>
              : null}
          </div>
          <div className="col">
            <h3>Kompiuteriai</h3>
          </div>
          <div className="col">
            <input className='form-control bg-light' placeholder='Paieškos laukas' onChange={searchHandle}></input>
          </div>
        </div>
        {computers.length ?
          <div className='table-responsive'>
            <table className="table border shadow table-striped">
              <thead>
                <tr>
                  <th scope="col" className="rownumber">#</th>
                  <th scope="col">Kabinetas</th>
                  <th scope="col" onClick={() => sorting("inventoryNumber")}>Inventoriaus nr.</th>
                  <th scope="col" onClick={() => sorting("networkNumber")}>Pav. tinkle</th>
                  <th scope="col" onClick={() => sorting("ram")}>RAM</th>
                  <th scope="col" onClick={() => sorting("cpu")}>CPU</th>
                  <th scope="col" onClick={() => sorting("gpu")}>GPU</th>
                  <th scope="col" onClick={() => sorting("storage")}>Saugykla</th>
                  <th scope="col" onClick={() => sorting("operatingSystem")}>Operacinė sistema</th>
                  <th scope="col" onClick={() => sorting("software")}>Programinė įranga</th>
                  <th scope="col" onClick={() => sorting("note")}>Pastaba</th>
                  <th scope="col">Veiksmas</th>
                </tr>
              </thead>
              <tbody id="TextBoxContainer">
                {
                  currentComputers.map((computer, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {(currentPage - 1) * computersPerPage + index + 1}
                      </th>
                      {computer.office !== null ? <td>{computer.office.number}</td> : <td></td>}
                      <td>{computer.inventoryNumber}</td>
                      <td>{computer.networkNumber}</td>
                      <td>{computer.ram}</td>
                      <td>{computer.cpu}</td>
                      <td>{computer.gpu}</td>
                      <td>{computer.storage}</td>
                      <td>{computer.operatingSystem}</td>
                      <td>{computer.software}</td>
                      <td>{computer.note}</td>
                      {jwt_decode(cookies.get("jwt_authorization")).authorities[0].authority === "ADMIN" ?
                        <td>
                          <Link data-toggle="tooltip" title="Peržiūrėti" to={`/viewcomputer/${computer.id}`}><i className="fa fa-eye fa-lg text-dark me-2"> </i></Link>
                          <Link data-toggle="tooltip" title="Redaguoti" to={`/editcomputer/${computer.id}`}><i className="fa fa-edit fa-lg me-2"> </i></Link>
                          <Link data-toggle="tooltip" title="Ištrinti" onClick={() => { if (window.confirm('Ar tikrai norite ištrinti šį kompiuterį?')) { deleteComputer(computer.id) } }}><i className="fa fa-trash fa-lg text-danger"> </i></Link>
                        </td>
                        : <td><Link data-toggle="tooltip" title="Peržiūrėti"  to={`/viewcomputer/${computer.id}`}><i className="fa fa-eye fa-lg text-dark"> </i></Link></td>}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          : <h6>nėra nei vieno pridėto kompiuterio</h6>}
        <div className='row'>
          {computers.length > 10 ?
            <div className='d-flex justify-content-start col'>
              <Pagination
                objectsPerPage={computersPerPage}
                totalObjects={computers.length}
                paginate={paginate}
                typeoflist="computerlist"
              />
            </div>
            : null}
          <div className='d-flex justify-content-end col'>
            <h6>Iš viso kompiuterių: {computers.length}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}