import { ethers } from "hardhat";

async function main() {

  const lottery = await ethers.deployContract("lottery");
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