const main = async () => {
    try {
        const [deployer] = await ethers.getSigners();
        const Transactions = await ethers.getContractFactory("Transactions", deployer);
        console.log("1/4 - Got Contract Factory");

        const deployTx = Transactions.getDeployTransaction();
        const gasEstimate = await ethers.provider.estimateGas(deployTx);
        console.log(`2/4 - Gas estimate: ${gasEstimate.toString()}`);

        const transactions = await Transactions.deploy();
        console.log(
            "3/4 - Deployment transaction sent:",
            transactions.deploymentTransaction().hash
        );

        console.log("Waiting for confirmations...");
        await transactions.waitForDeployment();
        console.log("4/4 - Contract deployed at:", transactions.target);

        return transactions;
    } catch (error) {
        console.error("Deployment failed at step:", {
            error: error.message,
            stack: error.stack,
        });
        throw error;
    }
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // Exit with success code
    } catch (error) {
        process.exit(1); // Exit with error code
    }
};

// Execute the script
runMain();
