# **Cars NETPP API**

A node, express, typescript, postgresql, prisma api project made for practicing/enjoyment purposes.

## Description

A node, express, typescript, postgresql, prisma api project made for practicing/enjoyment purposes.The project revoles around owners who have cars.Documentation made using Swagger.

## Getting Started

### Dependencies

- check package.json for details
- you might also want your own postgresql database
- also have git installed on your platform

### Installing

- first clone the repo

```
git clone https://github.com/axense234/Cars-NETPP-API.git
```

- then install the required packages

```
cd Users-PSQL-API
npm install
```

- migrate prisma to your dev postgresql db:

```
npx prisma migrate dev
```

- rename **.env.sample** to **.env** and put your own environment variables respectively:
  - **DATABASE_URL** = the url of your pg db
  - **SECRET_JWT_KEY** = your jwt secret key(complex string)
  - **PORT** = the port you want the api to run on
  - **SWAGGER_AUTH_USERNAME** = your own swagger username for authorization purposes
  - **SWAGGER_AUTH_PASSWORD** = your own swagger password for authorization purposes

### Executing program

- test the api with nodemon

```
npm test
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
