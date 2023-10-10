const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const {
  constants,
  expectRevert,
} = require('@openzeppelin/test-helpers');

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lottery", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  it("Should be deployed correctly", async function deployContract() {
    const Lottery = await ethers.getContractFactory("lottery");
    const lottery = await Lottery.deploy();

    expect(await lottery.name()).to.equal("Lottery");
    expect(await lottery.symbol()).to.equal("JA");
    expect(await lottery.totalSupply()).to.equal(1000);


  });

  it("Successful token purchase", async function deployContract() {
    const Lottery = await ethers.getContractFactory("lottery");
    const lottery = await Lottery.deploy();

    const tokens = 10;
    const [owner, addr1, addr2] = await ethers.getSigners();

    await lottery.connect(addr1).buyTokens(tokens, {value: ethers.parseEther("20")});
    expect(await lottery.tokenBalance(addr1)).to.equal(tokens);
    expect(await lottery.tokenBalanceSC(addr1)).to.equal(await lottery.totalSupply() - BigInt(tokens));

  });

  it("Successful tickets purchase", async function deployContract() {
    const Lottery = await ethers.getContractFactory("lottery");
    const lottery = await Lottery.deploy();

    const tokens = 10;
    const tickets = 1;
    const priceToken = 5;

    const [owner, addr1, addr2] = await ethers.getSigners();

    await lottery.connect(addr1).buyTokens(tokens, {value: ethers.parseEther("20")});
    await lottery.connect(addr1).buyTicket(tickets);
    expect(await lottery.tokenBalance(addr1)).to.equal(tokens - tickets*priceToken);
  });

  it("Successful winner generated", async function deployContract() {
    const Lottery = await ethers.getContractFactory("lottery");
    const lottery = await Lottery.deploy();

    const tokens = 20;
    const tickets = 4;

    const [owner, addr1, addr2] = await ethers.getSigners();


    await lottery.connect(addr1).buyTokens(tokens, {value: ethers.parseEther("30")});
    await lottery.connect(addr2).buyTokens(tokens/2, {value: ethers.parseEther("20")});

    await lottery.connect(addr1).buyTicket(tickets);
    await lottery.connect(addr2).buyTicket(tickets/2);

    await lottery.connect(owner).generateWinner();
    expect(lottery.winner).not.to.equals(constants.ZERO_ADDRESS);
  });

  it("Tokens returned correctly", async function deployContract() {
    const Lottery = await ethers.getContractFactory("lottery");
    const lottery = await Lottery.deploy();

    const tokens = 10;
    const tickets = 1;
    const priceToken = 5;

    const [owner, addr1, addr2] = await ethers.getSigners();

    await lottery.connect(addr1).buyTokens(tokens, {value: ethers.parseEther("20")});
    await lottery.connect(addr1).returnTokens(tokens);
    expect(await lottery.tokenBalance(addr1)).to.equal(0);

  });

});
