import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article>
            <br />
            <h1>Klaida</h1>
            <p>Tokio puslapio nėra</p>
            <Link className='btn btn-outline-danger my-2' to={"/"}>Grįžti atgal</Link>
        </article>
    )
}

export default Missing