import { WebSocketProvider } from "@ethersproject/providers"
import * as dotenv from 'dotenv'
import { BigNumber, ethers } from "ethers"
import express, { json, Request, Response } from "express"
import Transfer from "./models/Transfer"
import ABI from "./utils/abi.json"
import router from "./routes/index"
import cors from "cors"
import { QueueManager } from "./services/SvQueue"
dotenv.config()


  ;
(async () => {
  const app = express()

  const port = process.env.PORT || 3000

  async function listen() {
    const usdcAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
    const provider: WebSocketProvider = new ethers.providers.WebSocketProvider(
      `${process.env!.WEBSOCKET!}`
    );
    const contract = new ethers.Contract(usdcAddress, ABI, provider);
    contract.on("Transfer", async (from, to, value, event) => {
      const amount: string = BigNumber.from(value).toString()
      const transactionHash: string = event.transactionHash
      const blockNumber: number = event.blockNumber
      try {
        await Transfer.create({
          fromAddress: from,
          toAddress: to,
          amount,
          transactionHash,
          blockNumber,
          eventData: event
        })
      } catch (err) {
        console.error(err)
      }
    })
  }

  const url = "amqp://localhost:5672"
  const queueManager = new QueueManager(url)
  const { consumerManager, producerManager } = await queueManager.init()
  const queueName = "test"

  router.get("/produce", async (req: Request, res: Response) => {
    const producer = await producerManager.add(queueName)
    producer.send("hello")
    res.send("success")
  })

  app.use(router)
  app.use(json())
  app.use(cors())
  app.listen(port, async () => {
    console.log(`Listening to port ${port}`)
    try {
      await consumerManager.add(queueName)
      // await listen()
    }
    catch (err) {
      console.log(err)
    }
  })
})()

