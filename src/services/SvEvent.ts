import { BigNumber, ethers } from "ethers";
import config from "../setup"
import { ConsumerManager, ProducerManager, QueueManager } from "./SvQueue"
import { WebSocketProvider } from "@ethersproject/providers"
import * as fs from "fs";
import * as path from 'path';
import Transfer from "../models/Transfer";
import Approval from "../models/Approval";

interface ContractInterface {
  name: string,
  address: string,
  events: string[]
}


class SvEvent {
  public url: string;
  public consumerManager?: ConsumerManager;
  public producerManager?: ProducerManager;
  public contracts: ContractInterface[];

  public constructor(url: string) {
    this.url = url
    this.contracts = config.contracts ?? []
  }

  public async init() {
    const queueManager = new QueueManager(this.url)
    const { consumerManager, producerManager } = await queueManager.init()

    for (let c of this.contracts) {
      const { name, address, events } = c as ContractInterface
      const ABI = fs.readFileSync(path.resolve(__dirname, "../abi/" + name + ".json")).toString()
      const provider: WebSocketProvider = new ethers.providers.WebSocketProvider(config.app.ws);
      const contract = new ethers.Contract(address, ABI, provider);

      // add consumers
      const callback = async (payload: any) => {
        switch (payload.eventType!) {
          case "Transfer":
            await Transfer.create({
              contractAddress: payload.contractAddress,
              fromAddress: payload.fromAddress,
              toAddress: payload.toAddress,
              amount: payload.amount,
              transactionHash: payload.transactionHash,
              blockNumber: payload.blockNumber,
              eventData: payload.eventData
            }, { logging: console.log })
            break
          case "Approval":
            await Approval.create({
              contractAddress: payload.contractAddress,
              owner: payload.owner,
              spender: payload.spender,
              value: payload.value
            }, { logging: console.log })
            break
          default:
        }


      }
      await consumerManager.add(name, callback, events.length)

      // add event listeners and producers
      for (let eventType of c.events) {
        const producer = await producerManager.add(name)
        switch (eventType) {
          case "Transfer":
            contract.on(eventType, async (from, to, value, event) => {
              const amount: string = BigNumber.from(value).div(10 * 18).toString()
              const transactionHash: string = event.transactionHash
              const blockNumber: number = event.blockNumber
                producer.send(
                  JSON.stringify({
                    eventType,
                    contractAddress: address,
                    fromAddress: from,
                    toAddress: to,
                    amount,
                    transactionHash,
                    blockNumber,
                    eventData: event
                  })
                )
            })
            break;
          case "Approval":
            contract.on(eventType, async (owner, spender, value) => {
              const amount: string = BigNumber.from(value).div(10 * 18).toString()
                producer.send(
                  JSON.stringify({
                    eventType,
                    contractAddress: address,
                    owner,
                    spender,
                    value: amount
                  })
                )
            })
            break;
          default:
        }

        this.consumerManager = consumerManager
        this.producerManager = producerManager
      }
    }
  }
}

export default SvEvent;