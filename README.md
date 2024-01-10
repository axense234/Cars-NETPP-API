# **Cars NETPP API**

A node, express, typescript, postgresql, prisma api project made for practicing/enjoyment purposes.

## Description

A node, express, typescript, postgresql, prisma api project made for practicing/enjoyment purposes.The project revoles around owners who have cars.Documentation made using Swagger.

## Getting Started

### Dependencies

- Git installed on your machine
- Docker installed on your machine(optional)
- A Postgres DB(cloud, local or container)
- Check package.json for other dependencies

### Installing

- Install using git clone then migrate to your db using npx prisma migrate

```
git clone https://github.com/axense234/Cars-NETPP-API.git
cd Users-PSQL-API
npm install
```

- rename **.env.sample** to **.env** and put your own environment variables respectively:
  - **PGUSER** = your postgres db user
  - **PGPASSWORD** = your postgres db user password
  - **PGHOST** = the host of your postgres db
  - **PGPORT** = the port which the server will listen on
  - **PGDATABASE** = the database you want to connect to
  - **SWAGGER_AUTH_USERNAME** = your own swagger username for authorization purposes
  - **SWAGGER_AUTH_PASSWORD** = your own swagger password for authorization purposes
  - **SECRET_JWT_KEY** = your jwt secret key(complex string)
  - **PORT** = the port you want the api to run on
  - **DATABASE_URL** = the url of your postgres db(composed of other postgres env vars)

### Executing program

- Test the api through using nodemon

```
npm test
```

- Test the api through docker-compose

```
docker build -t cars-netpp-api .
docker compose up
```

## Authors

- axense234(me)

## Version History

- 1.1.0
  - Changed a few things around, added an authorization route for swagger docs, added swagger docs, improved README.md, created LICENSE.md
  - See [commit change](https://github.com/axense234/Cars-NETPP-API/commits/master) or See [release history](https://github.com/axense234/Cars-NETPP-API/releases)
- 1.0.0
  - Initial Release

## License

This project is licensed under the GNU License - see the LICENSE.md file for details
