// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './mainERC721.sol';
import './userNFTtickets.sol';
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract lottery is ERC20, Ownable{

    address public nft;
    address public winner;

    constructor() ERC20("Lottery", "JA"){
        _mint(address(this), 1000);
        nft = address(new mainERC721());
    }

    // User registration. user address => his smart contract
    mapping(address => address) public user_contract;

    // Price tokens
    function tokenPrice(uint256 _numTokens) internal pure returns (uint256){
        return _numTokens * (1 ether);
    }
    
    function getWinner() public view returns (address){
        return winner;
    }

    // Token balance visualization
    function tokenBalance(address _account) public view returns (uint256){
        return balanceOf(_account);
    }

    // Token balance visualization (smart contract)
    function tokenBalanceSC() public view returns (uint256){
        return balanceOf(address(this));
    }

    // Ether balance visualization (smart contract)
    function EtherBalanceSC() public view returns (uint256){
        return address(this).balance / 10**18;
    }

    // Mint new tokens --- only by the owner who deploy SC
    function mint(uint256 _cantidad) public onlyOwner {
        _mint(address(this), _cantidad);
    }

    //Register new users
    function register() internal {
        address addr_personal_contract = address(new userNFTtickets(msg.sender, address(this), nft));
        user_contract[msg.sender] = addr_personal_contract;
    }

    //user info
    function userInfo(address _account) public view returns (address){
        return user_contract[_account];
    }

    //buy tokens
    function buyTokens(uint _numTokens) public payable{
        if(user_contract[msg.sender] == address(0)){
            register();
        }


        //total cost
        uint256 coste = tokenPrice(_numTokens);

        //check amount
        require(msg.value >= coste, "Insufficient amount");
        
        uint256 balance = tokenBalanceSC();
        require(balance >= _numTokens, "Insufficient liquidity, buy less tokens");

        //return value
        uint256 returnValue = msg.value - coste;
        payable(msg.sender).transfer(returnValue);
        //send tokens to the buyer
        _transfer(address(this), msg.sender, _numTokens);
    }

    //return tokens
    function returnTokens(uint _numTokens) public payable{
        require(_numTokens > 0, "return more than 0 tokens");
        require(_numTokens <= tokenBalance(msg.sender), "Insufficient tokens");
        _transfer(msg.sender, address(this), _numTokens);
        payable(msg.sender).transfer(tokenPrice(_numTokens));
    }

    //Lottery management

    uint public priceTicket = 5;

    mapping(address => uint[]) idUser_tickets;

    mapping(uint => address) ticket_user;

    uint randNonce = 0;
    uint [] ticketsPurchased;

    function getTicketsPurchased() public view returns(uint[] memory) {
        return ticketsPurchased;
    }

    //Buy tickets
    function buyTicket(uint _numTickets) public {
        uint  totalPrice = _numTickets*priceTicket;
        require(totalPrice <= tokenBalance(msg.sender), "Insufficient tokens");

        _transfer(msg.sender, address(this), totalPrice);

        for(uint i = 0; i < _numTickets;i++){
            uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 10000;
            randNonce++;
            idUser_tickets[msg.sender].push(random);
            ticket_user[random] = msg.sender;
            ticketsPurchased.push(random);
            userNFTtickets(user_contract[msg.sender]).mintTicket(msg.sender, random);
        }
    }

    //Visualize user tickets
    function userTickets(address _owner) public view returns(uint [] memory){
        return idUser_tickets[_owner];
    }

    function generateWinner() public onlyOwner {

        uint length = ticketsPurchased.length;

        require(length > 0, "No tickets purchased");
        uint random = uint(uint(keccak256(abi.encodePacked(block.timestamp))) % length);
        uint winnerTicket = ticketsPurchased[random];

        winner = ticket_user[winnerTicket];

        payable(winner).transfer(address(this).balance *95 / 100);

        payable(owner()).transfer(address(this).balance *5 / 100);

    }

}

