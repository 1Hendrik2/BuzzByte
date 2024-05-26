import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {

    return (
        <header className="bg-indigo-400 text-white sticky top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between border-gray-500 p-8 rounded-b-lg">
            <Link to="/">
                <h1 className="text-3xl flex items-baseline justify-center font-semibold">BuzzByte</h1>
            </Link>
            <Nav />
        </header>
    );
};

export default Header;