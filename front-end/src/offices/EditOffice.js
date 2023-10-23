import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditOffice() {
  let navigate = useNavigate()
  const { id } = useParams()

  const [office, setOffice] = useState({
    name: "",
    number: "",
  })

  const { name, number } = office;

  useEffect(() => {
    loadOffice();
  }, [])

  const onInputChange = (e) => {
    setOffice({ ...office, [e.target.name]: e.target.value });
  }

  const loadOffice = async () => {
    const result = await axios.get(`http://localhost:8080/offices/${id}`)
    setOffice(result.data)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/offices/${id}`, office)
    navigate(-1)
  };

  const nameRef = useRef();
  useEffect(() => {
    nameRef.current.focus();
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 offset-md-1 border rounded p-2 mt-2 shadow backcolor'>
          <h3 className='text-center'>Kabineto redagavimas</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='form-group row mb-2'>
              <label htmlFor="networkId" className='col-sm-3 col-form-label'>Numeris</label>
              <div className='col-sm-8'>
                <input type={"text"} className="form-control" name="number" value={number == null ? '' : number} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <div className='form-group row mb-2'>
              <label htmlFor="inventoryId" className='col-sm-3 col-form-label'>Pavadinimas</label>
              <div className='col-sm-8'>
                <input ref={nameRef} type={"text"} className="form-control" name="name" value={name == null ? '' : name} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <button type="submit" className='btn btn-outline-success m-1'>Patvirtinti</button>
            <Link className='btn btn-outline-danger my-2' to={-1}>Grįžti atgal</Link>
          </form>
        </div>
      </div>
    </div>
  )
}