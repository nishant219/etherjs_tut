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



//-----------------------------------------------------------------------------


//uniswap router address present on etherscan +
//function is present in the uniswap smart contract which is used in ABI

async function uniswap() {
  const routerAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const uniswapABI = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)\
    external\
    payable\
    returns (uint[] memory amounts)",
  ];

  const uniswapContract = new ethers.Contract(routerAddress, uniswapABI, provider );
  const uniswapSigner = uniswapContract.connect(Signer);
  const token = await Fetcher.fetchTokenData( chainId, "0xc3994c5cbddf7ce38b8a2ec2830335fa8f3eea6a", provider );
  const weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(token, weth, provider); //liquidity pool pair
  const route = new Route([pair], weth);

  const swapAmount = ethers.utils.parseEther("0.001"); 
  
  // trade (route, token amount, trade type)
  const trade = new Trade(route,
    new TokenAmount(weth, swapAmount),
  TradeType.EXACT_INPUT
  ); 

  const slippage = new Percent("10000", "1000");
  const amountOut = trade.minimumAmountOut(slippage).raw;
  const amountOutMin = ethers.BigNumber.from(amountOut.toString()).toHexString(); //convert in hex
  const path = [weth.address, token.address];
  const deadlineTime = Math.floor(Data.now() / 1000) + 60 * 20;
  const deadline = ethers.BigNumber.from(deadlineTime.toString()).toHexString();
  const input = trade.inputAmount.raw;
  const inputAmount = ethers.BigNumber.from(input.toString()).toHexString();

  //transction fun
  const transction = await uniswapSigner.swapExactETHForTokens(
    amountOutMin,
    path,
    Account,
    deadline,
    { value: inputAmount }
  );
  console.log("Swap transction Hash :" , transction.hash);
  
}
uniswap();









