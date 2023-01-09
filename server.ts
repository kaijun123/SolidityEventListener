import { WebSocketProvider } from "@ethersproject/providers"
import * as dotenv from 'dotenv'
import { ethers } from "ethers"
import express from "express"
import ABI from "./utils/abi.json"
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

async function getTransfer() {
  const usdcAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
  const provider: WebSocketProvider = new ethers.providers.WebSocketProvider(
    `${process.env!.WEBSOCKET!}`
  );
  const contract = new ethers.Contract(usdcAddress, ABI, provider);
  contract.on("Transfer", (from, to, value, event) => {
    let transferEvent = {
      from: from,
      to: to,
      value: value,
      eventData: event,
    }
    console.log(JSON.stringify(transferEvent, null, 4))
  })
}

app.listen(port, async () => {
  console.log(`Listening to port ${port}`)
  try {
    await getTransfer()
  }
  catch (err) {
    console.log(err)
  }
})