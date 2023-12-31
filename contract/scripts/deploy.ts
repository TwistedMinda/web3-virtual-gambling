import { deployContract, deploySwapperContract, verifyContract } from "../artifacts/contracts/src/tools";
import { config } from "./config";

const hre = require("hardhat");

async function main() {
  const cfg = config[hre.network.name] ?? config.localhost

  const swapper = await deploySwapperContract(cfg)
  const swapperAddress = await swapper.getAddress()
  await deployContract(swapperAddress, cfg.chainlinkAggregator)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
