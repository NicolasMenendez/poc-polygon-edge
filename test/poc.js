const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Test poc ", function () {
  let Test1, Test2;

  let accounts;
  let test1Proxy;
  let test2;

  before(async () => {
    Test1 = await ethers.getContractFactory("Test1");
    Test2 = await ethers.getContractFactory("Test2");

    accounts = await ethers.getSigners();
  });

  beforeEach(async () => {
    test1Proxy = await upgrades.deployProxy(Test1, []);
    test2 = await Test2.deploy({ value: "1000" });
  });

  // test1 contract functions withdrawFromTest2, callTest2andBack, callTest2andBackPayable

  it("Test1 should be able to withdrawFromTest2usingCall from Test2", async () => {
    const test1 = test1Proxy.connect(accounts[0]);
    const test2BalanceBefore = await ethers.provider.getBalance(test2.address);
    await test1.withdrawFromTest2usingCall(test2.address, "1");
    const test2BalanceAfter = await ethers.provider.getBalance(test2.address);
    expect(test2BalanceAfter).to.equal(test2BalanceBefore.sub("1"));
  });

  it("Test1 should be able to withdrawFromTest2usingTransfer from Test2", async () => {
    const test1 = test1Proxy.connect(accounts[0]);
    const test2BalanceBefore = await ethers.provider.getBalance(test2.address);
    await test1.withdrawFromTest2usingTransfer(test2.address, "1");
    const test2BalanceAfter = await ethers.provider.getBalance(test2.address);
    expect(test2BalanceAfter).to.equal(test2BalanceBefore.sub("1"));
  });

  // expect event to emit receiveCall
  it("Test1 should be able to call Test2 and back", async () => {
    const test1 = test1Proxy.connect(accounts[0]);
    const tx = await test1.callTest2andBack(test2.address);
    const receipt = await tx.wait();
    const event = receipt.events[0];
    expect(event.event).to.equal("CalledBackbyTest2");
  });

  // callTest2andBackPayable
  it("Test1 should be able to call Test2 and back payable", async () => {
    const test1 = test1Proxy.connect(accounts[0]);

    const test2BalanceBefore = await ethers.provider.getBalance(test2.address);
    const test1BalanceBefore = await ethers.provider.getBalance(test1.address);

    const tx = await test1.callTest2andBackPayable(test2.address, "1");
    const receipt = await tx.wait();
    const event = receipt.events[0];
    expect(event.event).to.equal("CalledBackPayable");

    const test2BalanceAfter = await ethers.provider.getBalance(test2.address);
    const test1BalanceAfter = await ethers.provider.getBalance(test1.address);

    expect(test2BalanceAfter).to.equal(test2BalanceBefore.sub("1"));
    expect(test1BalanceAfter).to.equal(test1BalanceBefore.add("1"));
  });
});
