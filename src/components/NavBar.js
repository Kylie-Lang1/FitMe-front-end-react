import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
        <Link to="/">
            <h1 className="bg-yellow-200"> FitMe</h1>
        </Link>
        <Link to="/closet">
            <h2>My Closet</h2>
        </Link>
        <Link to="/outfits">
            <h2>My Outfits</h2>
        </Link>
        </nav>
    );
}

export default NavBar;