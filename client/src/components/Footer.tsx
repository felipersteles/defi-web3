const Footer = () => {
    return (
        <div className="w-full md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className="flex flex-[0.5] justify-center items-center">
                    <img src={"/images/logo.png"} alt="logo" className="w-32" />
                </div>

                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className="text-white text-base text-center mx-2 cursor-pointer">
                        Mercado
                    </p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">
                        Transações
                    </p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">
                        Carteira
                    </p>
                    <p className="text-white text-base text-center mx-2 cursor-pointer">
                        Tutoriais
                    </p>
                </div>
            </div>
            <div className=" flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">
                    Entre em Contato!
                </p>
                <p className="text-white text-sm text-center">
                    info@krypto.com
                </p>
            </div>

            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />

            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className="text-white text-sm text-center">
                    Krypto App 2025
                </p>
                <p className="text-white text-sm text-center">
                    Todos Direitos Reservados
                </p>
            </div>
        </div>
    );
};

export default Footer;
