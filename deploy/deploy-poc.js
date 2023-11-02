require("dotenv").config();
const {
  verify,
  networkHasVerification,
  getProxyImplementationAddress,
} = require("./utils.js");
const { task } = require("hardhat/config");

task("deploy-poc", "Deploy poc").setAction(async (taskArgs, hre) => {
  let [admin] = await hre.ethers.getSigners();
  console.log("The admin address: ", admin.address);

  console.log("Deploying contract Test1...");
  const Test1 = await ethers.getContractFactory("Test1");

  const test1ProxyInstance = await upgrades.deployProxy(Test1, []);
  await test1ProxyInstance.deployed();
  console.log(`Test1 deployed to ${test1ProxyInstance.address}`);

  if (networkHasVerification(hre.network.config.chainId)) {
    const test1Implementation = await getProxyImplementationAddress(
      "Test1",
      test1ProxyInstance.address
    );

    console.log("Waiting for block confirmations...");
    await test1ProxyInstance.deployTransaction.wait(6);
    await verify(test1Implementation, []);
  }

  console.log("Deploying Test2 contract...");
  const Test2 = await hre.ethers.getContractFactory("Test2");

  const test2 = await Test2.connect(admin).deploy({
    value: "1000",
  });

  await test2.deployed();
  console.log(`Test2 deployed to ${test2.address}`);

  if (networkHasVerification(hre.network.config.chainId)) {
    console.log("Waiting for block confirmations...");
    await test2.deployTransaction.wait(6);
    await verify(test2.address, []);
  }
});
