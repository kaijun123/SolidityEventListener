const pgtools = require('pgtools')
import config from "../datasource"

export { } // what is going on here?

// https://www.npmjs.com/package/pgtools
(() => {
  const { database, user, password, port, host } = config
  pgtools.dropdb({ user, password, port, host }, database, (err: any, res: any) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log("database dropped", database);
  })
})()
