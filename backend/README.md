# townTaste-app BACKEND

<!-- COMMAND INSTRUCTIONS FOR DEVs -->

# initialize TypeScript project and add the Prisma CLI as a development dependency to it:

npm init -y
npm install prisma typescript ts-node @types/node --save-dev

<!-- This creates a package.json with an initial setup for your TypeScript app.
Next, initialize TypeScript: -->

npx tsc --init

<!-- You can now invoke the Prisma CLI by prefixing it with npx: -->

npx prisma

<!-- Next, set up your Prisma ORM project by creating your Prisma schema file with the following command: -->

npx prisma init

<!-- This command does two things:
creates a new directory called prisma that contains a file called schema.prisma, which contains the Prisma schema with your database connection variable and schema models
creates the .env file in the root directory of the project, which is used for defining environment variables (such as your database connection) -->

# To map your data model to the database schema, you need to use the prisma migrate CLI commands:

npx prisma migrate dev --name name-of-update

<!-- This command does two things:
It creates a new SQL migration file for this migration
It runs the SQL migration file against the database
NOTE: generate is called under the hood by default, after running prisma migrate dev. If the prisma-client-js generator is defined in your schema, this will check if @prisma/client is installed and install it if it's missing. -->

# Install and generate Prisma Client:

npm install @prisma/client

<!-- The install command invokes prisma generate for you which reads your Prisma schema and generates a version of Prisma Client that is tailored to your models.
Whenever you update your Prisma schema, you will have to update your database schema using either prisma migrate dev or prisma db push. This will keep your database schema in sync with your Prisma schema. The commands will also regenerate Prisma Client. -->

# run backend in localhost:

npm start

# manage database (run prisma on localhost web):

npx prisma studio (run this command line)
pgadmin tool

# bugs fixed during development:

not being able to login (authentication with redux):
needed to install cors
npm i cors
pm i --save-dev @types/cors (to validate in Typescript)

Also I changed the baseURL (instead of localhost, to my IP machine)

# Features to do:

OAuth
Two factor Auth (2FA)?
Cach service?
Configure CORS properly
Change send Email feature to sendGrid (security in production)