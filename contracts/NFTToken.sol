// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ERC721.sol";

contract NFTToken is ERC721 {

    uint256 public tokenCounter;
    
    constructor() ERC721 ("NFTToken", "NFTK") {
        tokenCounter = 0;
    }

    function createCollectible() public returns (uint256){
        uint256 tokenID = tokenCounter;
        _safeMint(msg.sender, tokenID);
        tokenCounter = tokenCounter + 1;
        return tokenID;
    }
}

