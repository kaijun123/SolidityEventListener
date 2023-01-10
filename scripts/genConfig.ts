import config from "../config/config";
import fs from "fs"

  ;
(async () => {
  const nodeEnv = process.env.ENVIRONMENT || "development"
  const configJson = JSON.stringify({
    [nodeEnv]: config[nodeEnv]
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



