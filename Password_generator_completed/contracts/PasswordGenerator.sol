pragma solidity ^0.5.4;


contract PasswordGenerator{
    
    event gererateaddress(address returnaddress);
    
    function Generator() public payable returns(address returnaddress) {
        address returnaddress = address(uint160(uint(keccak256(abi.encodePacked(now, blockhash(block.number))))));
        emit gererateaddress(returnaddress);
        return returnaddress;
    }
}