// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const lottery = await hre.ethers.deployContract("lottery");
  await lottery.waitForDeployment();
  console.log( "lottery contract:" + lottery.target);
  /*
  const mainERC721 = await ethers.deployContract("mainERC721");
  await mainERC721.waitForDeployment();
  console.log( "mainERC721 contract:" + mainERC721.target);

  const userNFTtickets = await ethers.deployContract("userNFTtickets",[  ] );
  await userNFTtickets.waitForDeployment();
  console.log( "userNFTtickets contract:" + userNFTtickets.target);
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
