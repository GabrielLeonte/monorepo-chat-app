## monorepo-chat-app

A simple chat app using `React`,`NestJS`,`PostgresSQL` and `SocketIO`

### Minimum Requirements

- Docker minimum v4.0.0
- NodeJS v16
- Yarn

### Run

1. Create .env in `apps/server` (environment variables can be found in the server readme.md file)
2. Run `yarn` to install all the dependencies across the workspaces (You might get an error from yarn, please make sure it is using yarn v3 (`yarn set version stable`)
3. Run `yarn start` in the monorepo root. You should start seeing logs from docker, NestJS Server and the React framework. Note: You might need to refresh the page as react boots up faster than NestJS.
4. Open `http://localhost:3000/`

### Swagger

The NestJS Server comes with Swagger built in, you can access it via `http://localhost:3003/swagger`

### Register users

User registration is done using the following swagger endpoint: `http://localhost:3003/swagger#/users/UsersController_register`

##### Note: The username field is case sensitive.

### Create global channels

Creating a global channel is done using the following swagger endpoint `http://localhost:3003/swagger#/admin/AdminController_createGlobalChannel`

## Next steps:

1. Create a decorator to prevent a user from sending a message to a channel he is not a part of
2. Prepare the code for deployment and setup the pipelines
3. Add support for a user to create his own channels and join
4. WebRTC, password protected channels and more features
5. Improve the client folder structuring and API management
6. Add Redis to manage the sessions in a more secure manner
7. Move to CassandraDB/ScyllaDB (NoSQL, design for large data amounts, same API, more efficient) in order to store channels and the messages related to them and improve relationships between the Postgres entities.
8. Add database indexes to increase query performance
9. Secure SocketIo Communications (Redis token, SSL certificate, etc.)
10. Refactor, there is always space for refactoring
11. Add error handling on frontend
