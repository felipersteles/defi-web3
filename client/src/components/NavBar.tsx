import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";

const NavBarItem = ({
    title,
    classProps,
}: {
    title: string;
    classProps: string;
}) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center px-4 py-2">
            <div className="md-flex-[0.5] flex-initial justify-center items-center">
                <img
                    src={"/images/logo.png"}
                    alt="Logo"
                    className="w-32 cursor-pointer"
                />
            </div>
            <ul className="text-white md:flex hidden flex-row list-none justify-between items-center flex-initial">
                {["O mercado", "Transferências", "Tutoriais", "Carteiras"].map(
                    (title, key) => (
                        <NavBarItem key={key} title={title} classProps="" />
                    )
                )}

                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative md:hidden">
                {toggleMenu ? (
                    <AiOutlineClose
                        className="text-white"
                        onClick={() => setToggleMenu(!toggleMenu)}
                    />
                ) : (
                    <HiMenuAlt1
                        className="text-white"
                        onClick={() => setToggleMenu(!toggleMenu)}
                    />
                )}

                {toggleMenu && (
                    <ul className="z-10 fixed top-0 -right-2 p-3 w-[45vw] h-screen shadow-2xl list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose
                                className="text-white"
                                onClick={() => setToggleMenu(!toggleMenu)}
                            />
                        </li>
                        {[
                            "O mercado",
                            "Transferências",
                            "Tutoriais",
                            "Carteiras",
                        ].map((title, key) => (
                            <NavBarItem key={key} title={title} classProps="my-2 text-lg" />
                        ))}

                        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            Login
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
