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

1. Prepare the code for deployment and setup the pipelines
2. Add support for a user to create his own channels and join
3. WebRTC, password protected channels and more features
4. Improve the client folder structuring
5. Add Redis to manage the sessions in a more secure manner
6. Move to CassandraDB/ScyllaDB (NoSQL, design for large data amounts, same API, more efficient) in order to store channels and the messages related to them
7. Secure SocketIO Communications
8. Refactor, there is always space for refactoring
