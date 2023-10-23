import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddComputer() {
  let navigate = useNavigate()
  const { officenumber } = useParams()

  const [computer, setComputer] = useState({
    ram: "",
    cpu: "",
    gpu: "",
    inventoryNumber: "",
    networkNumber: "",
    storage: "",
    operatingSystem: "",
    software: "",
    note: "",
  })

  const { ram, cpu, gpu, inventoryNumber, networkNumber, storage, operatingSystem, software, note } = computer;

  const onInputChange = (e) => {
    setComputer({ ...computer, [e.target.name]: e.target.value });
  };

  const [values, setValues] = useState([]);
  const [options, setOptions] = useState(officenumber);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (options == undefined || options == "new") {
      await axios.post(`http://localhost:8080/computers`, computer)
    } else {
      await axios.post(`http://localhost:8080/offices/${options}/computers`, computer)
    }
    navigate(-1)
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    const result = await axios.get("http://localhost:8080/offices")
    setValues(result.data);
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 offset-md-1 border rounded p-2 mt-2 shadow backcolor'>
          <h3 className='text-center'>Kompiuterio pridėjimas</h3>
          <form onSubmit={(e) => onSubmit(e)}>
            {values && officenumber == "new" ?
              <div>
                <h5>Kabinetas</h5>
                <div className='form-group row mb-2 p-1'>
                  <label className='col-sm-3 col-form-label'>Kabinetas</label>
                  <div className='col-sm-7'>
                    <select defaultValue={'default'} onChange={(e) => setOptions(e.target.value)} className="form-select">
                      <option value='default' disabled>Neparinktas</option>
                      {
                        values.sort((a, b) => a.number > b.number ? 1 : -1).map((opts, i) => <option key={i} value={opts.id}>{opts.name} {opts.number}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              : null}
            <h5>Duomenys</h5>
            <div className='form-group row mb-2 p-1'>
              <label className='col-sm-2 col-form-label'>Inventoriaus nr.</label>
              <div className='col-sm-4'>
                <input type={"text"} className="form-control" name="inventoryNumber" value={inventoryNumber} onChange={(e) => onInputChange(e)}></input>
              </div>
              <label className='col-sm-2 col-form-label'>Pavadinimas tinkle</label>
              <div className='col-sm-4'>
                <input type={"text"} className="form-control" name="networkNumber" value={networkNumber} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>

            <h5>Parametrai</h5>
            <div className='form-group row mb-2 p-1'>
              <label className='col-sm-2 col-form-label'>RAM</label>
              <div className='col-sm-4 pb-2'>
                <input type={"text"} className="form-control" name="ram" value={ram == null ? '' : ram} onChange={(e) => onInputChange(e)}></input>
              </div>

              <label className='col-sm-2 col-form-label'>CPU</label>
              <div className='col-sm-4'>
                <input type={"text"} className="form-control" name="cpu" value={cpu == null ? '' : cpu} onChange={(e) => onInputChange(e)}></input>
              </div>

              <label className='col-sm-2 col-form-label'>GPU</label>
              <div className='col-sm-4'>
                <input type={"text"} className="form-control" name="gpu" value={gpu == null ? '' : gpu} onChange={(e) => onInputChange(e)}></input>
              </div>

              <label className='col-sm-2 col-form-label'>Saugykla</label>
              <div className='col-sm-4'>
                <input type={"text"} className="form-control" name="storage" value={storage == null ? '' : storage} onChange={(e) => onInputChange(e)}></input>
              </div>
            </div>

            <h5>Versijos</h5>
            <div className='form-group row mb-2 p-1'>
              <label className='col-sm-2 col-form-label'>Operacinė sistema</label>
              <div className='col-sm-4'>
                <input type={"text"} list="operatingSystem" className="form-control" name="operatingSystem" onChange={(e) => onInputChange(e)} value={operatingSystem} />
                <datalist id="operatingSystem">
                  <option>Windows 7</option>
                  <option>Windows 8</option>
                  <option>Windows 10</option>
                  <option>Windows 11</option>
                </datalist>
              </div>
              <label className='col-sm-2 form-label pt-1'>Programinė įranga</label>
              <div className="col-sm-4">
                <input type={"text"} list="officeVersion" className="form-control" name="software" onChange={(e) => onInputChange(e)} value={software} />
                <datalist id="officeVersion">
                  <option>Office2007</option>
                  <option>Office2010</option>
                  <option>Office2013</option>
                  <option>Office2016</option>
                  <option>Office2019</option>
                </datalist>
              </div>
            </div>
            <div className='form-group row mb-2 p-1'>
              <h5>Pastaba</h5>

              <div className='col-sm-8 offset-2'>
                <textarea className="form-control" rows="3" name="note" onChange={(e) => onInputChange(e)} value={note == null ? '' : note} ></textarea>
              </div>
            </div>

            <div className='pt-2'>
              <button type="submit" className='btn btn-outline-success m-1'>Patvirtinti</button>
              <Link className='btn btn-outline-danger my-1' to={-1}>Grįžti atgal</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
