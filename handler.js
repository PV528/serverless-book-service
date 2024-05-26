'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-region'
});

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: 'http://localhost:4566', // Localstack DynamoDB endpoint
  region: 'us-east-1'
});

const TABLE_NAME = process.env.BOOKS_TABLE;

// ustvarjanje knjige
module.exports.createBook = async (event) => {
  const { title, author, genre, pages } = JSON.parse(event.body);
  const id = uuid.v4();
  const newBook = { id, title, author, genre, pages };
  await docClient.put({
    TableName: TABLE_NAME,
    Item: newBook
  }).promise();
  return {
    statusCode: 201,
    body: JSON.stringify(newBook)
  };
};

// pridobivanje vseh knjig
module.exports.getAllBooks = async () => {
  const data = await docClient.scan({ TableName: TABLE_NAME }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data.Items)
  };
};

// pridobivanje knjige po id
module.exports.getBookById = async (event) => {
  const { id } = event.pathParameters;
  const data = await docClient.get({
    TableName: TABLE_NAME,
    Key: { id }
  }).promise();
  if (!data.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Book not found' })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(data.Item)
  };
};

// posodabljanje knjige
module.exports.updateBook = async (event) => {
  const { id } = event.pathParameters;
  const { title, author, genre, pages } = JSON.parse(event.body);
  await docClient.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set title = :title, author = :author, genre = :genre, pages = :pages',
    ExpressionAttributeValues: {
      ':title': title,
      ':author': author,
      ':genre': genre,
      ':pages': pages
    }
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ id, title, author, genre, pages })
  };
};

// brisanje knjige
module.exports.deleteBook = async (event) => {
  const { id } = event.pathParameters;
  await docClient.delete({
    TableName: TABLE_NAME,
    Key: { id }
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Book deleted successfully' })
  };
};
