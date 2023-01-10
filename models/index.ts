import { Sequelize } from "sequelize";
import config from "../datasource";

const { database, user, password, port, host, dialect } = config
export const sequelize = new Sequelize(database, user, password, { dialect, host, port })

sequelize.authenticate()
  .then(() => { console.log('Connection has been established successfully.') })
  .catch((error) => { console.error('Unable to connect to the database:', error); })
