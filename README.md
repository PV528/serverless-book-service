# serverless-book-service

Projekt omogoča osnovne crud operacije:
- POST (/local/books)
- GET (/local/books)
- GET (/local/books/{id})
- PUT (/local/books/{id})
- DELETE (/local/books/{id})

Za delo z bazo in delovanje uporablja serverless framework in Localstack (localstack CLI in AWS CLI).

## Uporaba
- Zagon Localstack (localstack start).

- Ustvarjanje tabele v aws CLI: aws dynamodb create-table --table-name <TABLE_NAME> --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=1, WriteCapacityUnits=1 --endpoint-url <ENPOINT_URL> --<REGION>

- Testiranje v POSTMAN-u.
