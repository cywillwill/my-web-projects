const { utils } = require("ethers");
// const hre = require("hardhat");

async function main() {
    // 上传的nft相关json文件夹的ipfs地址, 设定了基本URI以后openzeppelin的实现会自动推导出每个token的URI
    const baseTokenURI = "ipfs://QmaX7CVYHMgoUgRQ89Pe51hconGyV7r9Fi1Ej5Re2WGLvF/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("NFTCollectible");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    let txn = await contract.reserveNFTs();
    await txn.wait();
    console.log("10 NFTs have been reserved");

    // Mint 3 NFTs by sending 0.03 ether
    // txn = await contract.mintNFTs(1, { value: utils.parseEther('0.1') });
    // await txn.wait()

    // Get all token IDs of the owner
    // let tokens = await contract.tokensOfOwner(owner.address)
    // console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });