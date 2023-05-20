import swgDocs from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerDocs = swgDocs({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cars NETPP API Docs",
      version: "1.0.0",
      contact: {
        email: "andreicomanescuonline@gmail.com",
        name: "axense234",
        url: "https://github.com/axense234",
      },
      description:
        "The documentation for the Cars NETTP API using swagger-ui-express and swagger-jsdoc.",
      license: {
        name: "GNU",
        url: "https://github.com/axense234/Cars-NETPP-API/blob/master/LICENSE.md",
      },
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 4000}` },
      { url: "https://cars-netpp-api-ca.onrender.com" },
    ],
    components: {
      schemas: {
        Owner: {
          properties: {
            first_name: {
              type: "string",
            },
            last_name: {
              type: "string",
            },
            password: {
              type: "string",
            },
            email: {
              type: "string",
            },
            owned_car_uid: {
              type: "string",
            },
          },
        },
        Car: {
          properties: {
            make: {
              type: "string",
            },
            model: {
              type: "string",
            },
            model_year: {
              type: "integer",
            },
            price: {
              type: "string",
            },
            age: {
              type: "integer",
            },
            car_owner_uid: {
              type: "string",
            },
          },
        },
        Authorization: {
          properties: {
            username: {
              type: "strign",
            },
            password: {
              type: "string",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        in: "header",
        name: "Authorization",
      },
    },
  },
  apis: ["./src/routers/*.ts"],
});

export default swaggerDocs;
