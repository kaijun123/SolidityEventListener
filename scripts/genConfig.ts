import config from "../datasource";
import fs from "fs"

  ;
(async () => {
  const nodeEnv = process.env.environment || "development"
  const config2 = config
  delete config2.port
  const configJson = JSON.stringify({
    [nodeEnv]: config2
  }, null, 2)
  console.log(configJson)
  await fs.writeFile("./config/config.json", configJson, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log("Migration config written")
    }
  })
})()



