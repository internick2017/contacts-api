const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'My contacts API for CSE341 - Complete CRUD operations for managing contacts',
    version: '1.0.0'
  },
  host: 'contacts-api-eb09.onrender.com',
  schemes: ['https'],
  definitions: {
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        _id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        },
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com'
        },
        favoriteColor: {
          type: 'string',
          example: 'Blue'
        },
        birthday: {
          type: 'string',
          example: '1990-01-01'
        }
      }
    },
    CreateContact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: {
          type: 'string',
          example: 'John'
        },
        lastName: {
          type: 'string',
          example: 'Doe'
        },
        email: {
          type: 'string',
          example: 'john.doe@example.com'
        },
        favoriteColor: {
          type: 'string',
          example: 'Blue'
        },
        birthday: {
          type: 'string',
          example: '1990-01-01'
        }
      }
    },
    CreateContactResponse: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '507f1f77bcf86cd799439011'
        }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Error message'
        }
      }
    },
    SuccessResponse: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Operation successful'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);