const { ethers } = require("ethers");

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '' // Your account address 1
const account2 = '' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025")
    })

    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()




// const { ethers } = require("ethers");

// const INFURA_ID = '42f9ad376b4e46cda141f5930559a990'
// const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

// const account1 = '0x451b8a6a3aA087099E8E1f2CBf852AEfD9298868';
// const account2 = '0x3B083d8C7b962D15419fFe96CC13b1f91b061847';

// const privateKey1 = '';
// const wallet = new ethers.Wallet(privateKey1, provider);


// const main = async () => {

//     const tx = await wallet.sendTransaction({ to: account2, value: ethers.utils.parseEthe("0.025") });
//     await tx.wait()
//     console.log(tx)

// }

// main()