import { BsFillInfoCircleFill } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import Loader from "./Loader";
import { useTransaction } from "../context/TransactionContext";

const commomStyles = `min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-small font-light text-white`;

const Input = (data: {
    placeholder: string;
    name: string;
    type: string;
    value?: string;
    handleChange: (e: any, name: string) => void;
}) => (
    <input
        {...data}
        step={"0.0001"}
        onChange={(e) => data.handleChange(e, data.name)}
        className="my-2 rounded-sm w-full p-2 outline-none text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { 
        connectWallet, 
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        isLoading
    } = useTransaction();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.addressTo || !formData.amount) {
            return alert("Please fill in all required fields");
        }

        try {
            await sendTransaction();
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Mande crypto
                        <br />
                        Ao redor do mundo
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore o mundo Cripto! Compre e venda CriptoMoedas
                        Facilmente pelo Krypt!
                    </p>
                    {!currentAccount ? (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2543bd]"
                        >
                            <p className="text-white text-base font-semibold">
                                Conectar carteira
                            </p>
                        </button>
                    ) : (
                        <div className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2543bd]">
                            <p className="text-white text-base font-semibold">
                                Conta conectada: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                            </p>
                        </div>
                    )}

                    {/* Div com todas as features */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commomStyles}`}>
                            Segurança
                        </div>
                        <div
                            className={`rounded-tr-2xl sm:rounded-none ${commomStyles}`}
                        >
                            Agilidade
                        </div>
                        <div className={`sm:rounded-tr-2xl ${commomStyles}`}>
                            Ethereum
                        </div>

                        <div className={`sm:rounded-bl-2xl ${commomStyles}`}>
                            Web 3.0
                        </div>
                        <div
                            className={`rounded-bl-2xl sm:rounded-none ${commomStyles}`}
                        >
                            Taxas atrativas
                        </div>
                        <div className={`rounded-br-2xl ${commomStyles}`}>
                            Metamask
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <div className="p-3 flex justify-between items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between w-full h-full">
                            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                <SiEthereum
                                    fontSize={22}
                                    className="text-white"
                                />
                            </div>
                            <BsFillInfoCircleFill
                                fontSize={17}
                                className="text-white"
                            />
                        </div>
                        <p className="text-white font-light text-sm">
                            Endereço
                        </p>
                        <p className="text-white font-semibold text-lg mt-2">
                            {currentAccount 
                                ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`
                                : "Ethereum"}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input
                        placeholder="Address To"
                        name="addressTo"
                        type="text"
                        value={formData.addressTo}
                        handleChange={handleChange}
                    />
                    <Input
                        placeholder="Amount (ETH)"
                        name="amount"
                        type="number"
                        value={formData.amount}
                        handleChange={handleChange}
                    />
                    <Input
                        placeholder="Keyword (Gif)"
                        name="keyword"
                        type="text"
                        value={formData.keyword}
                        handleChange={handleChange}
                    />
                    <Input
                        placeholder="Enter message"
                        name="message"
                        type="text"
                        value={formData.message}
                        handleChange={handleChange}
                    />
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button
                            type="submit"
                            disabled={!currentAccount}
                            className="flex flex-row justify-center items-center border text-white border-white mt-5 bg-[#fda61e] py-3 px-7 rounded-full cursor-pointer hover:bg-[#fda64e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Enviar
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Welcome;