import { BsShieldCheck, BsCurrencyExchange, BsGraphUp, BsWallet2, BsLightning } from "react-icons/bs";
import { FaEthereum, FaMoneyBillWave } from "react-icons/fa";

const ServiceCard = ({
    title,
    color,
    icon,
    subtitle,
}: {
    title: string;
    color: string;
    subtitle: string;
    icon: React.ReactNode;
}) => (
    <div className="flex flex-row justify-center items-center white-glassmorphism p-3 m-3 cursor-pointer hover:shadow-xl">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
    </div>
);

const Services = () => {
    return (
        <div className="flex w-full flex-col justify-center gradient-bg-services">
            <div className="flex md:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
                        Serviços que <br /> continuamos a otimizar
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                <ServiceCard
                    color="bg-pink-500"
                    icon={<BsShieldCheck size={20} />}
                    title="Segurança garantida"
                    subtitle="Proteção avançada para seus ativos com smart contracts auditados"
                />
                <ServiceCard
                    color="bg-blue-500"
                    icon={<BsCurrencyExchange size={20} />}
                    title="Troca descentralizada"
                    subtitle="Swap de tokens sem intermediários com taxas mínimas"
                />
                <ServiceCard
                    color="bg-purple-500"
                    icon={<FaEthereum size={20} />}
                    title="Staking de ETH"
                    subtitle="Ganhe recompensas participando da validação da rede Ethereum"
                />
                <ServiceCard
                    color="bg-green-500"
                    icon={<BsGraphUp size={20} />}
                    title="Yield Farming"
                    subtitle="Maximize seus retornos com estratégias de liquidez automatizadas"
                />
                <ServiceCard
                    color="bg-yellow-500"
                    icon={<BsWallet2 size={20} />}
                    title="Carteira Multichain"
                    subtitle="Gerencie todos seus ativos em diferentes blockchains em um só lugar"
                />
                <ServiceCard
                    color="bg-red-500"
                    icon={<BsLightning size={20} />}
                    title="Transações Rápidas"
                    subtitle="Processamento em segundos com Layer 2 solutions"
                />
                <ServiceCard
                    color="bg-indigo-500"
                    icon={<FaMoneyBillWave size={20} />}
                    title="Empréstimos DeFi"
                    subtitle="Acesso a crédito sem burocracia usando seus criptoativos como colateral"
                />
            </div>
        </div>
    );
};

export default Services;