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

#### Tutorials:
- Best guide for setting up postgres, sequelize: <https://medium.com/bb-tutorials-and-thoughts/how-to-build-nodejs-rest-api-with-express-and-postgresql-674d96d5cb8f>
- Postgres commands: <https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#what-express>
- sequelize: 
  - <https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9>
  - <https://blog.devgenius.io/use-sequelize-orm-with-postgresql-in-your-express-project-3c277b289522>
- AWS RDS:
  - <https://aws.amazon.com/getting-started/hands-on/create-connect-postgresql-db/>
  - <https://ruddha2001.medium.com/working-with-aws-rds-postgresql-a415ea21b338>
  - <https://medium.com/@unnipbvr/hosting-a-postgres-database-in-aws-b63d8c2c56ae>
- AWS EC2: <https://betterprogramming.pub/deploying-a-basic-express-api-on-amazon-ec2-eea0b54a825>
- Others:
  - <https://www.enterprisedb.com/postgres-tutorials/connecting-postgresql-using-psql-and-pgadmin>
  - <https://www.prisma.io/dataguide/postgresql/connecting-to-postgresql-databases>
  - <https://www.digitalocean.com/community/tutorials/typescript-running-typescript-ts-node#step-4-using-the-typescript-repl>
  - <https://www.digitalocean.com/community/tutorials/typescript-new-project>

#### TODO:
- Remove config/config.json. Change .sequelizerc to use config.js, then use .env file to specify environment when running migrate files
- Test sequelize-cli for create and drop db, and get rid of create and drop scripts
- Connect to AWS RDS and host DB on AWS
- Deply ecpress server on AWS EC2 instance