import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="ms">
            <h1 className="mst">Da-Hubb</h1>

            <nav className="compass">
                <ul className="cordinates">
                    <li>
                        <svg className="li-svg">
                            <rect></rect>
                        </svg>
                        <Link to="/">Tabs Project</Link>
                    </li>
                    <li>
                        <svg className="li-svg">
                            <rect></rect>
                        </svg>
                        <Link to="/todo">Todo App</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;