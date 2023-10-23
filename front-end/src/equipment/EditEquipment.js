import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditEquipment() {
  const [offices, setOffices] = useState([]);
  const [computers, setComputers] = useState([]);

  let navigate = useNavigate()
  const { id } = useParams()

  const [equipment, setEquipment] = useState({
    category: "",
    name: "",
    description: "",
    inventoryNumber: "",
    note: "",
    office: {
      id: ""
    },
    computer: {
      id: ""
    }
  })

  const { category, name, description, inventoryNumber, note, office, computer } = equipment;

  useEffect(() => {
    loadEquipment();
    loadOffices();
    loadComputers();
  }, [])

  const onInputChange = (e) => {
    setEquipment({ ...equipment, [e.target.name]: e.target.value });
  }

  const onOfficeChange = (e) => {
    setEquipment(({ ...equipment, office: { ...office, id: e.target.value } }))
  }

  const onComputerChange = (e) => {
    setEquipment(({ ...equipment, computer: { ...computer, id: e.target.value } }))
  }

  const loadEquipment = async () => {
    const result = await axios.get(`http://localhost:8080/equipment/${id}`)
    setEquipment(result.data)
  }

  const loadOffices = async () => {
    const result = await axios.get("http://localhost:8080/offices")
    setOffices(result.data);
  }

  const loadComputers = async () => {
    const result = await axios.get("http://localhost:8080/computers")
    setComputers(result.data);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (office != null && office.id == "free") {
      equipment.office = null;
    } else if (computer != null && computer.id == "free") {
      equipment.computer = null;
    }
    await axios.put(`http://localhost:8080/equipment/${id}`, equipment)
    navigate(-1)
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 offset-md-1 border rounded p-2 mt-2 shadow backcolor'>
          <h3 className='text-center'>Įrenginio redagavimas</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            {(offices == '' && computers == '') ? <div></div>
              : <div>
                {(offices.length > 0 && equipment.computer==null) &&
                  <div className='form-group row mb-2'>
                    <label className='col-sm-3 col-form-label'>Kabinetas</label>
                    <div className='col-sm-8'>
                      {office !== null ?
                        <select value={equipment.office.id} onChange={(e) => onOfficeChange(e)} className="form-select">
                          <option value="free">Laisvas</option>
                          {
                            offices.sort((a, b) => a.number > b.number ? 1 : -1).map((opts, i) => <option key={i} value={opts.id}>{opts.name} {opts.number}</option>)
                          }
                        </select>
                        : <select value={"default"} defaultValue={'default'} onChange={(e) => onOfficeChange(e)} className="form-select">
                          <option value='default' disabled>Neparinktas</option>
                          {
                            offices.sort((a, b) => a.number > b.number ? 1 : -1).map((opts, i) => <option key={i} value={opts.id}>{opts.name} {opts.number}</option>)
                          }
                        </select>}
                    </div>
                  </div>
                }
                {(computers.length > 0 && equipment.office==null) &&
                  <div className='form-group row mb-2'>
                    <label className='col-sm-3 col-form-label'>Kompiuteris</label>
                    <div className='col-sm-8'>
                      {computer !== null ?
                        <select value={equipment.computer.id} onChange={(e) => onComputerChange(e)} className="form-select">
                          <option value="free">Laisvas</option>
                          {
                            computers.sort((a, b) => a.number > b.number ? 1 : -1).map((opts, i) => <option key={i} value={opts.id}>Inventoriaus nr. - {opts.inventoryNumber}</option>)
                          }
                        </select>
                        : <select value={"default"} defaultValue={'default'} onChange={(e) => onComputerChange(e)} className="form-select">
                          <option value='default' disabled>Neparinktas</option>
                          {
                            computers.sort((a, b) => a.number > b.number ? 1 : -1).map((opts, i) => <option key={i} value={opts.id}>Inventoriaus nr. - {opts.inventoryNumber}</option>)
                          }
                        </select>}
                    </div>
                  </div>
                }
              </div>
            }


            <div className='form-group row mb-2'>
              <label className='col-sm-3 col-form-label'>Kategorija</label>
              <div className='col-sm-8'>
                <input type={"text"} className="form-control" name="category" value={category} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <div className='form-group row mb-2'>
              <label className='col-sm-3 col-form-label'>Pavadinimas</label>
              <div className='col-sm-8'>
                <input type={"text"} className="form-control" name="name" value={name} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <div className='form-group row mb-2'>
              <label className='col-sm-3 col-form-label'>Aprašymas</label>
              <div className='col-sm-8'>
                <input type={"text"} className="form-control" name="description" value={description} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <div className='form-group row mb-2'>
              <label className='col-sm-3 col-form-label'>Inventoriaus ID</label>
              <div className='col-sm-8'>
                <input type={"text"} className="form-control" name="inventoryNumber" value={inventoryNumber} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>
            <div className='form-group row mb-2'>
              <label className='col-sm-3 col-form-label'>Pastaba</label>
              <div className='col-sm-8'>
                <textarea className="form-control" rows="3" name="note" onChange={(e) => onInputChange(e)} value={note == null ? '' : note} ></textarea>
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