import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Pagination = ({ objectsPerPage, totalObjects, paginate, typeoflist }) => {
    const pageNumbers = [];
    const navigate = useNavigate();
    let { pagenumber } = useParams();

    for (let i = 1; i <= Math.ceil(totalObjects / objectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item" onClick={() => navigate(`/${typeoflist}/${number}`)}>
                        <Link
                            onClick={() => paginate(number)} className={`page-link ${pagenumber == number ? "active bg-dark" : "text-dark"}`}
                        >{number}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;