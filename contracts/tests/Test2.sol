// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity 0.8.11;

import "./Test1.sol";

contract Test2 {
    receive() external payable {}

    constructor() payable {}

    function withdrawFromTest2usingCall(
        address payable recipientAddress,
        uint256 amount
    ) public {
        (bool success, ) = recipientAddress.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function withdrawFromTest2usingTransfer(
        address payable recipientAddress,
        uint256 amount
    ) public {
        recipientAddress.transfer(amount);
    }

    function callandBack() public {
        Test1 test1 = Test1(payable(msg.sender));
        test1.receiveCall();
    }

    function callandBackPayable(uint256 amount) public {
        Test1 test1 = Test1(payable(msg.sender));
        test1.receivePayableCall{value: amount}();
    }
}
