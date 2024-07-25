const pgtools = require('pgtools');
import config from "../config/config"
import * as dotenv from "dotenv"
dotenv.config()

export { } // what is going on here?

// https://www.npmjs.com/package/pgtools
(() => {
  const env = process.env.ENVIRONMENT || "development"
  const { database, user, password, port, host } = config[env]
  pgtools.dropdb({ user, password, port, host }, database, (err: any, res: any) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log("database dropped", database);
  })
})()
