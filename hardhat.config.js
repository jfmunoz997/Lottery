require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
  },
      ganache:{
        url: "http://172.29.128.1:7545",
        accounts: [
          `0x8f7029cb5611680edd97b4e5f2423248f86eefa3b802324cd4f959b47e10b405`,
          `0xc0dd8e72aed47a056f763a853dae9ffea5cdebd74df375ecd3829ca9a084cb3d`,
          `0xba3ec985951921311a9b3902f5e991cae33f0e93f55aec702356d965981070a2`,
          `0x4eff37d5f5eb46f4ce2d06a92db2fc3a5e72f21f81818b2703e9d43327632789`,
          `0xc8ded9170a3463da0c6c1e4ce8ada8e1014143758461cbe6bec743ee205590c6`,
        ],
      }
    }   
};
