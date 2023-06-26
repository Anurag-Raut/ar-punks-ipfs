// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ARpunks is ERC721Enumerable, Ownable {
    string baseURI;
    constructor(string memory _baseURI) ERC721('ARPunktokes','ARpunk') {
        baseURI=_baseURI;
    }
    uint maxTokenId=10;
    uint pricePerNft=0.02 ether;

    function mint() public payable{
        require(totalSupply()<maxTokenId,'All the NFTs are minted');
        require(msg.value>=pricePerNft,"Insufficient ETH sent");
         _safeMint(msg.sender, totalSupply());
    }

    function noOfTokens() public view returns(uint){
        return totalSupply();
    }







    function withdraw() public onlyOwner  {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory) {
        require(_exists(tokenId),"token doesnt exists");

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")) : "";


    }



        receive() external payable {}

}