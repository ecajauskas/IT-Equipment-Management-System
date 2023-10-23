import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const NAME_REGEX = /^[A-z\u0080-\uFFFF][A-z0-9-_\u0080-\uFFFF]{2,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/;

export default function Register() {
    const firstnameRef = useRef();
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        firstnameRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname));
    }, [firstname])

    useEffect(() => {
        setValidLastname(NAME_REGEX.test(lastname));
    }, [lastname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [firstname, lastname, email, password])

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(firstname);
        const v2 = NAME_REGEX.test(lastname);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios.post("http://localhost:8080/auth/register",
                {firstname, lastname, email, password} 
            );
            navigate("/userlist");
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('Šis el. paštas jau užimtas');
            } else {
                setErrMsg('Neina pasiekti serverio')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-7 offset-md-2 border rounded p-2 mt-2 shadow backcolor'>
                    <h3 className='text-center'>Paskyros kūrimas</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group row mb-2'>
                            <label htmlFor="firstname" className='col-sm-3 col-form-label'>
                                Vardas:
                                <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFirstname || !firstname ? "hide" : "invalid"} />
                            </label>
                            <div className='col-sm-8'>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="firstname"
                                    ref={firstnameRef}
                                    autoComplete="off"
                                    onChange={(e) => setFirstname(e.target.value)}
                                    value={firstname}
                                    required
                                    aria-invalid={validFirstname ? "false" : "true"}
                                    aria-describedby="namenote"
                                    onFocus={() => setFirstnameFocus(true)}
                                    onBlur={() => setFirstnameFocus(false)}
                                />
                            </div>
                        </div>
                        <p id="namenote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /><br />
                            Nuo 3 iki 24 simbolių.<br />
                            Turi prasidėti raide.<br />
                        </p>
                        <div className='form-group row mb-2'>
                            <label htmlFor="lastname" className='col-sm-3 col-form-label'>
                                Pavardė:
                                <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} />
                            </label>
                            <div className='col-sm-8'>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="lastname"
                                    autoComplete="off"
                                    onChange={(e) => setLastname(e.target.value)}
                                    value={lastname}
                                    required
                                    aria-invalid={validLastname ? "false" : "true"}
                                    aria-describedby="lastnote"
                                    onFocus={() => setLastnameFocus(true)}
                                    onBlur={() => setLastnameFocus(false)}
                                />
                            </div>
                        </div>
                        <p id="lastnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /><br />
                                Nuo 3 iki 24 simbolių.<br />
                                Turi prasidėti raide.<br />
                            </p>
                        <div className='form-group row mb-2'>
                            <label htmlFor="email" className='col-sm-3 col-form-label'>
                                El. paštas:
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <div className='col-sm-8'>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>
                        </div>
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /><br />
                                Turi atitikti elektroninio pašto formatą.
                            </p>
                        <div className='form-group row mb-2'>
                            <label htmlFor="password" className='col-sm-3 col-form-label'>
                                Slaptažodis:
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                            </label>
                            <div className='col-sm-8'>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="passwordnote"
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                />
                            </div>
                        </div>
                        <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} /><br />
                                Nuo 8 iki 24 simbolių.<br />
                                Privalo būti bent viena raidė ir skaičius.<br />
                        </p>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <button disabled={!validFirstname || !validLastname || !validEmail || !validPassword ? true : false} className='btn btn-outline-success m-1'>Sukurti</button>
                        <button className='btn btn-outline-danger m-1' onClick={goBack}>Grižti  atgal</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
