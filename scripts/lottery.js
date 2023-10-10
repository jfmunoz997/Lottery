const { JsonRpcProvider } = require('ethers');
const { ethers } = require('hardhat');


const provider = new JsonRpcProvider(`http://172.29.128.1:7545`)

const account1 = '0x7dF63267EF2610440fbdB6774C46eBC3fea53d46'
const account2 = '0x291d8262da7B397C96140E8128C260BE84376841'
const account3 = '0x701eaFEdccb04760C09C2a064892105c348C2e6d'
const account4 = '0x0ec56330B64773205F11656126AdD7A52D329EFf'
const privateKey1 = '0x8f7029cb5611680edd97b4e5f2423248f86eefa3b802324cd4f959b47e10b405'
const privateKey3 = '0xba3ec985951921311a9b3902f5e991cae33f0e93f55aec702356d965981070a2'


const wallet = new ethers.Wallet(privateKey1, provider)
const wallet3 = new ethers.Wallet(privateKey3, provider)


const lottery_ABI = [
    "function totalSupply() public view returns (uint256)",
    "function name() public view returns (string memory)",
    "function symbol() public view returns (string memory)",
    "function balanceOf(address account) public view  returns (uint256)",
    "function nft() public view returns (address)",
    "function winner() public view returns (address)",
    "function user_contract(address) public view returns (address)",
    "function tokenPrice(uint256 _numTokens) internal pure returns (uint256)",
    "function tokenBalance(address _account) public view returns (uint256)",
    "function tokenBalanceSC() public view returns (uint256)",
    "function EtherBalanceSC() public view returns (uint256)",
    "function mint(uint256 _cantidad) public",
    "function register() internal",
    "function userInfo(address _account) public view returns (address)",
    "function buyTokens(uint _numTokens) public payable",
    "function returnTokens(uint _numTokens) public payable",
    "function priceTicket() public view returns (uint)",
    "function idUser_tickets(address) public view returns (uint[])",
    "function ticket_user(address) public view returns (uint[])",
    "function randNonce() public view returns (uint)",
    "function getTicketsPurchased() public view returns(uint[] memory)",
    "function buyTicket(uint _numTickets) public",
    "function userTickets(address _owner) public view returns(uint [] memory)",
    "function generateWinner() public"
];

const lotteryAddress = '0xf208b3b2b45b2Cf3eE48A2E564ca0C2470027647'
const contract = new ethers.Contract(lotteryAddress, lottery_ABI, provider)

const main = async () => {
    const nft = await contract.nft();
    console.log("The nft smart contract address is: " + nft);

    const totalSupply = await contract.totalSupply();
    console.log("The total supply is: " + ethers.getBigInt(totalSupply).toString());

    const name = await contract.name();
    console.log("The name is: " + name);

    const symbol = await contract.symbol();
    console.log("The symbol is: " + symbol);

//-----------------------------/

    const balance = await contract.tokenBalance(account3);
    console.log("The balance is: " + balance.toString());

    const balanceSC = await contract.tokenBalanceSC();
    console.log("The SC balance is: " + balanceSC.toString());

    const [owner, addr1] = await ethers.getSigners();

    console.log(owner)
    console.log(addr1)


    /*
    const conection = contract.connect(wallet3)
    await conection.buyTokens(10);

    console.log("EEEEEEEEEEEEERRE")

    balance = contract.tokenBalance(account3);
    console.log("The balance is: " + ethers.getBigInt(balance).toString());

    balanceSC = contract.tokenBalance();
    console.log("The SC balance is: " + ethers.getBigInt(balanceSC).toString());
*/
    
  
}

main()