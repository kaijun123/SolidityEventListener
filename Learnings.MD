### Sequelize

##### Connecting to db:
- Create a sequelize instance using `database`, `user`, `password`, `port`, `host`, `dialect`
- Run the `sequelize.authenticate()` function to attempt to connect to the database

##### Schema:
- Docs: <https://sequelize.org/docs/v6/core-concepts/model-basics/>
- Each table is a class. They can be extended from the Sequelize `Model` class 
- Run the `init()` function, to specify the columns and their data types
- Another way, is to run the `define()` function

##### Migration:
- Docs: <https://sequelize.org/docs/v6/other-topics/migrations>
- To run the migration scripts, you need to install `sequelize-cli`
- To run the migration, the following files must be present:
  - `config`, contains config file, which tells CLI how to connect with database
  - `models`, contains all models for your project
  - `migrations`, contains all migration files
  - `seeders`, contains all seed files
  - If the files are not at the default file location, create a `.sequelizerc` file and specify the location of the files
- Each migration script contains the `up` and `down` function. And uses the Sequelize `QueryInterface` to interact with the database tables
- Note: The ./config/config.json file can actually contain config for multiple environments, instead of just one here. The `ENVIRONMENT` variable under .env file will then tell sequelize which config to use

Note: sequlize-cli actually has functions to create models and migration scripts by running the `model:generate` command. But, it is not used here as we are using TypeScript. Hence, models must be written by hand. The migration script was written to automate the generation of the migration template

### pgtools
- pgtools is a npm package that allows us to connect to the db
- In our case, scripts are written to create and drop the db
- However, `sequelize-cli` also has a command to do so. But I have not tried them yet

### PostgreSQL
- `template0` and `template1` are template tables provided by postgres when installed
- DO NOT delete them, if not you will not be able to create new db
- To connect to your db, run the `psql -d <DATABASE_NAME> -U <USER_NAME`. By default, postgres should create a postgres user and db. Hence, running `psql -d postgres -U postgres` should allow you to enter the psql client via terminal