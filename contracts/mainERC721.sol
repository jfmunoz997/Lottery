// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import './Lottery.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract mainERC721 is ERC721{

    address public lotteryAddress;

    constructor() ERC721("Lottery", "PI"){
        lotteryAddress = msg.sender;
    }

    //create NFTs
    function safeMint(address _owner, uint256 _ticket) public{
        require(msg.sender == lottery(lotteryAddress).userInfo(_owner), "You are not allowed");
        _safeMint(_owner, _ticket);
    }

}