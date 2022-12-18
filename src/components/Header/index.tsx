import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/room?id=CVDpVGAYqk861POfMJwN">teste</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Header;