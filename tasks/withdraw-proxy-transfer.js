const { task } = require("hardhat/config");

task("withdraw-proxy-transfer", "Send proxy transfer")
  .addParam("test1", "Test1 contract address")
  .addParam("test2", "Test2 contract address")
  .addParam("amount", "amount")
  .setAction(async (taskArgs, hre) => {
    let [admin] = await hre.ethers.getSigners();

    const test1 = (await hre.ethers.getContractFactory("Test1")).attach(
      taskArgs.test1
    );

    console.log("Withdraw from Test2 using transfer...");
    const tx = await test1
      .connect(admin)
      .withdrawFromTest2usingTransfer(taskArgs.test2, taskArgs.amount);
    await tx.wait(1);
    console.log("tx hash: ", tx.hash);
  });

module.exports = {};
