import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";
import Cookies from 'universal-cookie';

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();

        if (cookies.get("jwt_authorization") != null) {
            navigate('/')
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const token = response?.data?.token;
            const decoded = jwt_decode(token);
            cookies.set("jwt_authorization", token, { expires: new Date(decoded.exp * 1000), path: '/' });
            axios.defaults.headers.common = {
                'Authorization': 'Bearer ' + token
              };
            setEmail('');
            setPassword('');
            navigate("/")
        } catch (err) {
            setErrMsg('Login Failed');
            errRef.current.focus();
        }
    }

    return (
        <div className='loginbody bg-secondary'>

        <section>
            <div className='login'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <h2 className='pb-2'>Prisijungimas</h2>

                    <div className='form-group'>
                        <label htmlFor="email">El. paštas:</label>
                        <input
                            className='form-control mb-2'
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Slaptažodis:</label>
                        <input
                            className='form-control mb-2'
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>

                    <button className="btn btn-outline-success mt-2">Prisijungti</button>
                </form>
                </div>
        </section>
        </div>

    )
}

export default Login