import express, { json } from "express"
// import ABI from "./utils/abi.json"
import cors from "cors"
import router from "./routes/index"
import SvEvent from "./services/SvEvent"
import config from "./setup"

  ;
(async () => {
  config.__configure("./config")

  const app = express()

  const port = config.app.port || 3000
  const svEvent = new SvEvent(config.app.url)
  await svEvent.init()

  app.use(router)
  app.use(json())
  app.use(cors())
  app.listen(port, async () => {
    console.log(`Listening to port ${port}`)
  })
})()

