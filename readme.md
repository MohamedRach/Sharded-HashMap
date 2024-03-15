# Sharded HashMap

This project implements a simple HTTP API that mimics the functionalities of a HashMap. It allows for storing, retrieving, and deleting key-value pairs across multiple database servers.

## Design Overview

The design of this system follows a distributed architecture where data is distributed across multiple database servers. Here's an overview of the design:

- **Hashing for Shard Allocation**: Keys are hashed using SHA-1 hashing algorithm to determine which shard (database server) should store the data. This ensures even distribution of data among the available servers.

- **Multiple Database Servers**: The system supports multiple database servers (defined by the `M` constant) to achieve horizontal scalability and fault tolerance. Each server is represented as a separate JSON file on the filesystem.

- **Express.js API**: The system provides a RESTful API implemented using Express.js framework. It exposes endpoints for storing, retrieving, and deleting key-value pairs.

- **Basic CRUD Operations**: The API supports basic CRUD (Create, Read, Update, Delete) operations:
    - **POST**: Stores a key-value pair in the appropriate shard.
    - **GET**: Retrieves the value associated with a given key from the appropriate shard.
    - **DELETE**: Deletes the key-value pair associated with a given key from the appropriate shard.

## Tradeoffs and Considerations

- **File-Based Storage**: Using JSON files for storage simplifies the implementation but may not be suitable for high-throughput or large-scale applications due to potential performance limitations and lack of features such as indexing and query optimization.
- **Simplicity vs. Complexity**: The design prioritizes simplicity for ease of understanding and implementation. However, this simplicity comes with tradeoffs in terms of scalability and robustness.

## Dependencies

Before running this project, ensure you have the following dependencies installed:

- Node.js (v14.x or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/MohamedRach/Sharded-HashMap.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Sharded-HashMap
    ```

3. Install project dependencies:

    ```bash
    npm install
    ```

## Configuration

- **Number of Database Servers (M)**: You can configure the number of database servers in the `M` constant within `index.js`.
- **Database Paths**: Update the `databaseServers` array in `index.js` to point to the correct database files for each server.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server will start running on port 3000 by default. You can access the API endpoints using tools like curl or Postman.

## API Endpoints

- **GET /api/:key**: Retrieve data associated with the provided key.
- **POST /api**: Store a key-value pair.
- **DELETE /api/:key**: Delete data associated with the provided key.

## Example Usage

### Storing Data

```bash
curl -X POST -H "Content-Type: application/json" -d '{"key": "example_key", "value": "example_value"}' http://localhost:3000/api
```

### Retrieving Data
```bash
curl http://localhost:3000/api/example_key
```
### Deleting Data
```bash
curl -X DELETE http://localhost:3000/api/example_key
```