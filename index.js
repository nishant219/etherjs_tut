import "dotenv/config.js";
import { ethers } from "ethers";

//const Account = process.env.ENV_ACCOUNT;
//const PrivateKey = process.env.ENV_PRIVATE_KEY;
//const RpcURL = process.env.ENV_RPC_URL;

const Account = " ";
const PrivateKey = " ";
const RpcURL = " ";

console.log("Account Address : " , Account);

const provider = new ethers.providers.JsonRpcProvider(RpcURL);
const HexPrivateKey = new Buffer.from(PrivateKey ,"hex");  //convert private key into hex format
//const Signer = provider.getSigner()
const Signer=new ethers.Wallet(HexPrivateKey, provider);


async function funBalance() { 
    const balance =await provider.getBalance(Account);
    console.log("Balance in Eth(wei):", balance.toString());
    console.log("Balance in Eth:", ethers.utils.formatEther(balance));
    console.log("1 Eth --> ? wei", ethers.utils.parseEther("1.0").toString());
    const blockNumber = await provider.getBlockNumber();
    console.log("Block Number :", blockNumber);
} 
funBalance();


async function transfer_eth() { 
  const transction = await Signer.sendTransaction({
    to: "0x3B083d8C7b962D15419fFe96CC13b1f91b061847", 
    value: ethers.utils.parseEther("0.01")
  });
   console.log("Transction Hash: ", transction.hash);
}
transfer_eth();


async function transfer_erc20() { 
  const tokenAddress = "0xc3994c5cbddf7ce38b8a2ec2830335fa8f3eea6a";
  const tokenABI = [
    "function name() view returns (string)",
    "function totalSupply() view returns(uint256)",
    "function balanceOf(address) view returns(uint)",
    "function transfer(address to, uint amount)"
  ]; 

  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
  const tokenName = await tokenContract.name();
  const tokenBalance = await tokenContract.balanceOf(tokenAddress);
  const tokenSigner = tokenContract.connect(Signer);
  const tokenAmount = ethers.utils.parseUnits("0",18);
//  const tokenTotalSupply = await tokenContract.tokenTotalSupply(); 

  console.log("Token Name: ", tokenName);
  console.log("Token balance : ", tokenBalance.toString());
  console.log("Token balance in decimal: ", ethers.utils.formatUnits(tokenBalance, 18));
//  console.log("Tokens Total Supply",tokenTotalSupply);

  const transction = await tokenSigner.transfer("0x3B083d8C7b962D15419fFe96CC13b1f91b061847", tokenAmount);
  console.log("Token transction hash: ", transction.hash);
}
transfer_erc20();










