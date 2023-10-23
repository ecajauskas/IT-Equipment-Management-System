import { Link } from "react-router-dom"

const Unauthorized = () => {

    return (
        <article>
            <br />
            <h1>Neleistina užklausa</h1>
            <p>Jūs neturite prieigos prie šio puslapio.</p>
            <Link className='btn btn-outline-danger my-2' to={"/"}>Grįžti atgal</Link>
        </article>
    )
}

export default Unauthorized