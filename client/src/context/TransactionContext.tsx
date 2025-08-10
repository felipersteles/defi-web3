import { ethers } from "ethers";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { contractAddress, contractAbi } from "../utils/constants";

interface FormData {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
}

interface Transaction {
    to: string;
    from: string;
    amount: string;
    txHash: string;
    timestamp: string;
    keyword?: string;
    message?: string;
}

interface TransactionContextProps {
    connectWallet: () => Promise<void>;
    currentAccount: string;
    sendTransaction: () => Promise<void>;
    isLoading: boolean;
    transactionCount: number;
    transactions: Transaction[];
    formData: FormData;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => void;
}

export const TransactionContext = React.createContext<TransactionContextProps>({
    connectWallet: async () => {},
    currentAccount: "",
    sendTransaction: async () => {},
    isLoading: false,
    transactionCount: 0,
    transactions: [],
    formData: {
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    },
    handleChange: () => {},
});

declare global {
    interface Window {
        ethereum?: any;
    }
}

const { ethereum } = window;

/**
 * Retrieves an initialized ethers.js Contract instance for interacting with 
 * the blockchain transaction contract.
 * 
 * @returns {Promise<ethers.Contract>} - A promise that resolves to an ethers.js Contract instance
 * @throws {Error} - Throws an error if:
 *                   - Ethereum provider (like MetaMask) is not detected
 *                   - Contract initialization fails
 * 
 * @note In a production environment, this should be enhanced to:
 *       1. Fetch contract address and ABI from a secure backend API
 *       2. Include proper authentication/authorization
 *       3. Implement error handling for network issues
 *       4. Add caching for contract instance
 *       5. Support different networks/chains
 * 
 * @example
 * // Basic usage
 * try {
 *   const contract = await getEthereumContract();
 *   const tx = await contract.sendTransaction(...);
 * } catch (error) {
 *   console.error('Contract interaction failed:', error);
 * }
 */
const getEthereumContract = async () => {
    if (!window.ethereum) {
        throw new Error(
            "Ethereum provider not found. Please install MetaMask."
        );
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const transactionContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
    );

    return transactionContract;
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState<FormData>({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string
    ) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            setIsLoading(true);
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();
            const parsedAmount = ethers.parseEther(amount);


            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", // 21000 GWEI
                        value: parsedAmount.toString(16),
                    },
                ],
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );

            await transactionHash.wait();

            const transaction: Transaction = {
                to: addressTo,
                from: currentAccount,
                amount: amount,
                txHash: transactionHash.hash,
                timestamp: new Date().toISOString(),
                keyword,
                message,
            };

            setTransactions([transaction, ...transactions]);
            setTransactionCount((prevCount) => prevCount + 1);
            setIsLoading(false);
            setFormData({
                addressTo: "",
                amount: "",
                keyword: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            throw new Error("Transaction failed");
        }
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask");
            const transactionContract = await getEthereumContract();
            const availableTransactions =
                await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map(
                (tx: any) => ({
                    to: tx.receiver,
                    from: tx.sender,
                    amount: ethers.formatEther(tx.amount),
                    txHash: tx.transactionHash,
                    timestamp: new Date(tx.timestamp * 1000).toISOString(),
                    keyword: tx.keyword,
                    message: tx.message,
                })
            );

            setTransactions(structuredTransactions);
            setTransactionCount(structuredTransactions.length);
        } catch (error) {
            console.error(error);
            throw new Error("Could not fetch transactions");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        if (ethereum) {
            const handleAccountChange = (accounts: string[]) => {
                if (accounts.length) {
                    setCurrentAccount(accounts[0]);
                    getAllTransactions();
                } else {
                    setCurrentAccount("");
                    setTransactions([]);
                }
            };

            ethereum.on("accountsChanged", handleAccountChange);

            return () => {
                ethereum.removeListener("accountsChanged", handleAccountChange);
            };
        }
    }, []);

    const value = useMemo(
        () => ({
            connectWallet,
            currentAccount,
            sendTransaction,
            isLoading,
            transactionCount,
            transactions,
            formData,
            handleChange,
        }),
        [currentAccount, isLoading, transactionCount, transactions, formData]
    );

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};


export const useTransaction = () => {
  const context = useContext(TransactionContext);
  
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  
  return context;
};