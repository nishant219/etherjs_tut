
//import {} from 'dotenv/config'
 import dotenv from 'dotenv'
 dotenv.config();

import { ethers } from 'ethers';


//const Sushiswap = require("@uniswap/sdk");
//const Sushiswap = 
import Sushiswap from "@sushiswap-core/sdk";
//const Uniswap = require("@sushiswap-core/sdk");
//const Uniswap =
import Uniswap from "@uniswap/sdk";

const chainId = Uniswap.ChainId.RINKEBY;

// const Account = process.env.APP_ACCOUNT ;
// const PrivateKey = process.env.APP_PRIVATE_KEY  ;
// const RpcUrl = process.env.APP_RPC_URL ;
// const UniswapRouter = process.env.APP_UNISWAP_ROUTER ;
// const SushiswapRouter = process.env.APP_SUSHISWAP_ROUTER ;
// const TokenAddress = process.env.APP_TOKEN_ADDRESS ;


console.log("wallet address: ", Account);
console.log("Token address: ", TokenAddress);

//const provider = new InfuraProvider("rinkbye");
const provider = new ethers.getDefaultProvider(RpcUrl);
const HexPrivateKey = new Buffer.from(PrivateKey, "hex");
const Signer = new ethers.Wallet(HexPrivateKey, provider);

async function run() { 
    //get token for 1 eth
    const comparePrice = ethers.utils.parseEther("1");
    // token details
    const token = await Uniswap.Fetcher.fetchTokenData(chainId, TokenAddress, provider);
  
    //------ Uniswap --------
    //get uniswap token price // get wrapped eth
    const Uweth = Uniswap.WETH[chainId];
    //uniswap pair details
    const Upair = await Uniswap.Fetcher.fetchPairData(token, Uweth, provider);
    //route to swap tokens
    const Uroute = new Uniswap.Route([Upair], Uweth);
    //trade to get token and its price for 1eth
    const Utrade = new Uniswap.Trade(Uroute, new Uniswap.TokenAmount(Uweth, comparePrice), Uniswap.TradeType.EXACT_INPUT);
    //no of tokens received for 1eth
    const UtokenPrice = Utrade.outputAmount.raw; 
    console.log("Tokens on uniswap exchange: ",ethers.utils.formatUnits(UtokenPrice.toString(), 6) );
    

    //------ Sushiswap -----
    //get Sushiswap token price // get wrapped eth
    const Sweth = Sushiswap.WETH[chainId];
    //uniswap pair details
    const Spair = await Sushiswap.Fetcher.fetchPairData(token, Sweth, provider);
    //route to swap tokens
    const Sroute = new Sushiswap.Route([Spair], Sweth);
    //trade to get token and its price for 1eth
    const Strade = new Sushiswap.Trade(Sroute, new Sushiswap.TokenAmount(Sweth, comparePrice), Sushiswap.TradeType.EXACT_INPUT);
    //no of tokens received for 1eth
    const StokenPrice = Strade.outputAmount.raw; 
    console.log("Tokens on Sushiswap exchange: ", ethers.utils.formatUnits(StokenPrice.toString(), 6) );
    

//TRADE//
    
    
    if (Number(UtokenPrice) > Number(StokenPrice)) {
//to accumulate eth
        console.log("Swap ETH for token on Uniswap and then swap token for eth on Sushiswap");
// to accumulate token (usdt) 
        console.log("Swap token for ETH on Sushiswap and then swap ETH for tokens on uniswap"); 
        
    } else if (Number(UtokenPrice) < Number(StokenPrice)) {
//to accumulate eth
       console.log("Swap ETH for token on Sushiswap and then swap token for eth on uniswap");
// to accumulate token (usdt) 
        console.log("Swap token for ETH on Uniswap and then swap ETH for tokens on Sushiswap"); 
    } else { 
        console.log("No opportunity to trade");
    }

}
run();