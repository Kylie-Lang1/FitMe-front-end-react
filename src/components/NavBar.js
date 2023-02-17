import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="flex flex-row bg-blue-300 shadow-md">
            <div className="float-left flex items-center justify-center ml-4">
                <Link to="/">
                    <h1 className="text-3xl p-5 font-bold">FitMe</h1>
                </Link>
            </div>
            <div className="flex grow"></div>
            <div className="float-right flex items-center justify-center mr-10">
                <Link to="/closet">
                    <h2 className='flex p-6'>My Closet</h2>
                </Link>
                <Link to="/outfits">
                    <h2 className='flex p-6'>My Outfits</h2>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;