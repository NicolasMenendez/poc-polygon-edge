// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity 0.8.11;

import "./Test2.sol";

contract Test1 {
    event FailedExecution(bytes lowLevelData);

    receive() external payable {}

    event CalledBackbyTest2();
    event EthReceived(uint256 amount);
    event CalledBackPayable();

    function withdrawFromTest2usingCall(
        Test2 test2Address,
        uint256 amount
    ) public {
        try
            test2Address.withdrawFromTest2usingCall(
                payable(address(this)),
                amount
            )
        {} catch (bytes memory lowLevelData) {
            emit FailedExecution(lowLevelData);
            return;
        }
        emit EthReceived(amount);
    }

    function withdrawFromTest2usingTransfer(
        Test2 test2Address,
        uint256 amount
    ) public {
        try
            test2Address.withdrawFromTest2usingTransfer(
                payable(address(this)),
                amount
            )
        {} catch (bytes memory lowLevelData) {
            emit FailedExecution(lowLevelData);
            return;
        }
        emit EthReceived(amount);
    }

    function callTest2andBack(Test2 test2Address) public {
        try test2Address.callandBack() {} catch (bytes memory lowLevelData) {
            emit FailedExecution(lowLevelData);
            return;
        }
    }

    function callTest2andBackPayable(
        Test2 test2Address,
        uint256 amount
    ) public {
        try test2Address.callandBackPayable(amount) {} catch (
            bytes memory lowLevelData
        ) {
            emit FailedExecution(lowLevelData);
            return;
        }
    }

    // recieve calls from Test2

    function receiveCall() public {
        emit CalledBackbyTest2();
    }

    function receivePayableCall() public payable {
        emit CalledBackPayable();
        emit EthReceived(msg.value);
    }
}
