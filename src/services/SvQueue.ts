import amqlib, { Channel, Connection } from "amqplib"

const connect = async (url: string): Promise<Connection> => {
  const connection = await amqlib.connect(url)
  return connection
}

const createChannel = async (connection: Connection): Promise<Channel> => {
  const channel = await connection.createChannel()
  return channel
}


export class QueueManager {
  public url: string;
  public producerManager?: ProducerManager;
  public consumerManager?: ConsumerManager;

  public constructor(url: string) {
    this.url = url
  }

  public async init(): Promise<{ producerManager: ProducerManager, consumerManager: ConsumerManager }> {
    this.producerManager = new ProducerManager(this.url!)
    await this.producerManager.init()
    this.consumerManager = new ConsumerManager(this.url!)
    await this.consumerManager.init()
    return { producerManager: this.producerManager, consumerManager: this.consumerManager }
  }
}

export class ProducerManager {
  public connection?: Connection;
  public url: string;

  public constructor(url: string) {
    this.url = url
    console.log("creating an instance of ProducerManager")
  }

  public async init() {
    this.connection = await connect(this.url!)
    console.log("creating a connection for ProducerManager")
  }

  public async add(queueName: string): Promise<Producer> {
    const producer = new Producer(queueName, this.connection!)
    await producer.init()
    return producer
  }
}

export class ConsumerManager {
  public connection?: Connection;
  public url: string;

  public constructor(url: string) {
    this.url = url
    console.log("creating an instance of ConsumerManager")
  }

  public async init() {
    this.connection = await connect(this.url!)
    console.log("creating a connection for ConsumerManager")
  }

  public async add(queueName: string, number: number = 1) {
    for (let i = 0; i < number; i++) {
      const consumer = new Consumer(queueName, this.connection!)
      await consumer.init()
      await consumer.consume()
    }
  }
}



export class Producer {
  public queueName: string = ""
  // public exchangeType: string = ""
  // public exchangeName: string = ""
  public connection: Connection;
  public channel?: Channel;

  // public constructor(queueName: string, exchangeType: string, connection: Connection) {
  public constructor(queueName: string, connection: Connection) {
    this.queueName = queueName
    // this.exchangeType = exchangeType

    this.connection = connection
    console.log("creating an instance of Producer")
  }

  public async init() {
    const channel = await createChannel(this.connection!)
    await channel.assertQueue(this.queueName!, { durable: true })
    this.channel = channel
  }

  public async send(payload: any) {
    const payloadBytes = Buffer.from(payload)
    await this.channel!.sendToQueue(this.queueName, payloadBytes, { persistent: true })
  }
}

export class Consumer {
  public queueName: string = ""
  // public exchangeType: string = ""
  // public exchangeName: string = ""
  public connection: Connection;
  public channel?: Channel;

  // public constructor(queueName: string, exchangeType: string, connection: Connection) {
  public constructor(queueName: string, connection: Connection) {
    this.queueName = queueName
    // this.exchangeType = exchangeType

    this.connection = connection
    console.log("creating an instance of Consumer")
  }

  public async init() {
    const channel = await createChannel(this.connection!)
    await channel.assertQueue(this.queueName!, { durable: true })
    await channel.prefetch(1)
    this.channel = channel
  }

  public async consume() {
    await this.channel!.consume(this.queueName, (msg) => {
      if (msg !== null) {
        console.log('Received:', msg.content.toString());

        // console.log('Received:', msg.content.toString());
        this.channel!.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    }, { noAck: false })
  }
}

