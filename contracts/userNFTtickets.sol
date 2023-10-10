// SPDX-License-Identifier: MIT

import './mainERC721.sol';

pragma solidity ^0.8.4;

contract userNFTtickets{

    struct Owner{
        address ownerAddress;
        address lotteryAddress;
        address nft;
        address user;
    }

    Owner public owner;

    constructor(address _owner, address _lottery, address _nft){
        owner = Owner(_owner, _lottery, _nft, address(this));
    }
    
    function mintTicket(address _owner, uint _ticket) public {
        require(msg.sender == owner.lotteryAddress, "You are not allowed");
        mainERC721(owner.nft).safeMint(_owner, _ticket);
    }
}