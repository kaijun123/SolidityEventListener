### SolidityEventListener

#### About
This repo contains code that listens to `Transfer` events from the USDT contract on Ethereum chain and saves the events into a PosgreSQL database.

#### Technology
- TypeScript: Provide typing support
- Ether.js: Connects to websocket and listen for the `Transfer` event
- PostgreSQL: Database used to save the event details
- Sequelize: ORM used to connect and interact with the PostgreSQL database
- Sequelize CLI: To run the migrate files
- ts-node: Run TS scripts by compiing on the fly

#### Necessary Files
- .env file in root directory; variables to include
  - `ENVIRONMENT`
  - `WEBSOCKET`

#### Quick Start:
```bash
# This generates the config json file which is required when you migrate the schemas to the database
npm run script ./scripts/genConfig

# Compile typescript code into javascript
npm run build

# Create the database
npm run db:create

# Migrate schema
npm run db:migrate

# Start the server
npm run start
```

#### TODO:
- Remove config/config.json. Change .sequelizerc to use config.js, then use .env file to specify environment when running migrate files
- Test sequelize-cli for create and drop db, and get rid of create and drop scripts
- Connect to AWS RDB and host DB on AWS