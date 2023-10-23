import axios from 'axios';
import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddOffice() {
    let navigate = useNavigate()

    const [office, setOffice] = useState({
        name: "",
        number: "",
    })

    const { name, number } = office;

    const onInputChange = (e) => {
        setOffice({ ...office, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/offices`, office)
        navigate(-1)
    };

    // iš karto duoda rašyti numerį, nereikia pasirinkti
    const numberRef = useRef();
    useEffect(() => {
        numberRef.current.focus();
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 offset-md-1 border rounded p-2 mt-2 shadow backcolor'>
                    <h3 className='text-center'>Kabineto pridėjimas</h3>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='form-group row mb-2'>
                            <label htmlFor="networkId" className='col-sm-3 col-form-label'>Numeris</label>
                            <div className='col-sm-8'>
                                <input ref={numberRef} type={"text"} className="form-control" name="number" value={number} onChange={(e) => onInputChange(e)}></input>
                            </div>
                        </div>
                        <div className='form-group row mb-2'>
                            <label htmlFor="inventoryId" className='col-sm-3 col-form-label'>Pavadinimas</label>
                            <div className='col-sm-8'>
                                <input type={"text"} className="form-control" name="name" value={name} onChange={(e) => onInputChange(e)}></input>
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