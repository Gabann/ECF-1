# API Documentation

## Description

This API is used to manage accounts and projects CRUD

Base URL
The base URL for all API requests is:

http://localhost:3000/api/

------------

## Open Endpoints

### POST /verifyToken

Body

- token: the jwt token generated on successful login

#### Response

- Message: Return true if the token is valid, false otherwise

### POST /signup

Body

- username: User username (must be unique in the db)
- email: User email (must be unique in the db)
- password: User password, will get hashed before insertion in the db

#### Response

- Message: Returns message and code status based on the success of the request

### POST /logIn

Body

- username: User username
- email: User email

#### Response

- Message: Returns message and code status based on the success of the request
- Token: Return a jwt token used for log validation

----------------------------------------------------

## Endpoints that require Authentication

### POST /addTask

Body

- taskName: The name of the task
- taskDescription: A description of the task
- taskPriority: (Enum) The task priority level, must be 'High', 'Normal' or 'Low'

#### Response

- Message: Returns message and code status based on the success of the request

### POST /addProject

Body

- projectName: The name of the project
- projectDescription: A description of the project

#### Response

- Message: Returns message and code status based on the success of the request

----------------------------------------------------

## Example

Request:

    POST /logIn

    Body:
    {
    "username": "username",
    "password": "password"
    }

Response:

```{
{
    "message": "Successfully logged in, redirecting...",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNzM5NjE2OSwiZXhwIjoxNzA5OTg4MTY5fQ.QMOpWsJg3jgzcTa9GbiP9cBH2pFDvscQ2yx1bpIXorc",
}
```

--------------

## Errors

This API uses the following error codes:

- 200 OK
- 201 Created
- 401 Unauthorized
- 404 Not Found
- 500 Internal Server Error