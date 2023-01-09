import { DatabaseConfig } from "utils/types";

const config: DatabaseConfig = {
  database: "solidity-db",
  user: "postgres",
  password: "",
  port: 5432,
  host: "localhost",
  dialect: "postgres"
}

export default config;