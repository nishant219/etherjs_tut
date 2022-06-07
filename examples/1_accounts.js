// const { ethers } = require("ethers");

// const INFURA_ID = ''
// const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

// const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'

// const main = async () => {
//     const balance = await provider.getBalance(address)
//     console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
// }

// main()

const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/42f9ad376b4e46cda141f5930559a990`);

const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e';
const main = async () => { 
    const balance = await provider.getBalance(address);
    console.log(`\n ETH balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH \n `);
}
main()

