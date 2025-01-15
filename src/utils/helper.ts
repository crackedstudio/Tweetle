/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, num, RPC, RpcProvider } from "starknet";
import gameAbi from "../utils/gameAbi.json";

const PROVIDER = new RpcProvider({
  nodeUrl:
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/xZih3RhtucH0P0PvbFte29FfJzMmJ5E6",
});

export const readFromBlockchain = async (
  functionName: string,
  contractAddress: string,
  account: any,
  args: any[] = []
): Promise<any> => {
  if (!account) {
    console.error("Account is not connected");
    return null;
  }

  const gameContract = new Contract(gameAbi, contractAddress, account);

  try {
    console.log(`Calling function: ${functionName}`);
    const response = await gameContract[functionName](...args);
    console.log(`${functionName} response:`, response);
    return response;
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error);
    return null;
  }
};

export const writeToBlockchain = async (
  functionName: string,
  account: any,
  contractAddress: string,
  abi: any,
  args: any[] = []
): Promise<any> => {
  if (!account) {
    console.error("Account is not connected");
    return null;
  }
  const contract = new Contract(abi, contractAddress, account);
  try {
    console.log(`Preparing transaction for function: ${functionName}`);
    const call = contract.populate(functionName, args);

    // Estimate fees
    const estimatedFee = await account.estimateInvokeFee([call], {
      version: 3,
    });
    const resourceBounds = {
      ...estimatedFee.resourceBounds,
      l1_gas: {
        ...estimatedFee.resourceBounds.l1_gas,
        max_amount: num.toHex(
          BigInt(
            parseInt(estimatedFee.resourceBounds.l1_gas.max_amount, 16) * 2
          ) // Double the estimated amount
        ),
      },
    };

    // Execute the transaction
    const { transaction_hash } = await account.execute(call, {
      version: 3,
      maxFee: estimatedFee.suggestedMaxFee,
      feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
      resourceBounds,
    });

    console.log("Transaction hash:", transaction_hash);

    // Wait for the transaction receipt
    const receipt = await PROVIDER.waitForTransaction(transaction_hash);
    console.log("Transaction receipt:", receipt);

    return receipt;
  } catch (error) {
    console.error(`Error executing ${functionName}:`, error);
    throw error;
  }
};
