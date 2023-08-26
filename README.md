# gRPC-Based Online Voting System

The gRPC-Based Online Voting System is a web application that allows users to securely participate in elections and cast their votes online. This project utilizes gRPC technology to enable real-time communication between voters, administrators, and the backend services.

## Features

- **Voter Registration:** Users can register as voters by providing required details and authentication.
- **Candidate Listings:** Display a list of candidates with their profiles and campaign information.
- **Secure Voting:** Implement secure voting mechanisms to ensure the integrity and confidentiality of votes.
- **Real-Time Results:** Provide real-time updates on the current vote count using gRPC streaming.
- **Admin Dashboard:** Administrators can manage candidates, voters, and election settings through a user-friendly dashboard.
- **Voter Authentication:** Ensure secure user authentication to prevent unauthorized access to voting.
- **Vote Tracking:** Allow voters to track their submitted votes and verify their authenticity.
- **Audit Trail:** Store an audit trail of all casted votes for transparency and verification.

## Technologies Used

- **TypeScript:** The project is built using TypeScript for both frontend and backend development.
- **gRPC:** Utilize gRPC technology for efficient and secure communication between different components.
- **Node.js:** Use Node.js for the backend server implementation.
- **Database:** Store voter profiles, candidate information, and election data in a suitable database.
- **Authentication:** Implement user authentication using secure tokens to protect voter data.
- **Real-Time Updates:** Utilize gRPC streaming for real-time vote count updates and notifications.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/BaseMax/grpc-voting-system-ts.git
   cd grpc-voting-system-ts
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   
   cd ../backend
   npm install
   ```

3. Start the frontend and backend servers:
   
   ```bash
   # Inside the frontend directory
   npm start
   
   # Inside the backend directory
   npm start
   ```

4. Access the application in your web browser at `http://localhost:3000`.

## Process

- **User Authentication and Registration:** Users should be able to register with their information securely. Implement user authentication to ensure that only registered users can access the system.
- **Candidate Management:** Admins should be able to add, edit, and remove candidate profiles. Display candidate information including their name, photo, party affiliation, and campaign details.
- **Voter Dashboard:** Voters should have access to a dashboard with information about upcoming elections, candidates, and voting instructions.
- **Voting Process:** Implement a secure and user-friendly process for casting votes. Allow voters to select their preferred candidate from the available options.
- **Real-Time Updates:** Utilize gRPC streaming to provide real-time updates on the current vote count and election progress.
- **Admin Console:** Create an admin console/dashboard for election administrators to manage elections and candidates. Admins should have the ability to start, pause, and end elections.
- **Vote Tracking:** Voters should be able to view their submitted votes and verify their authenticity.
- **Audit Trail:** Store an audit trail of all votes casted for transparency and verification purposes.
- **Results Display:** Display election results in real time or after the election concludes. Show detailed breakdowns of votes for each candidate.
- **Security Measures:** Implement encryption and security protocols to protect voter data and ensure vote integrity. Prevent duplicate voting and ensure that each voter can only vote once.
- **User Notifications:** Send notifications to voters about upcoming elections, voting deadlines, and results.
- **User Profiles:** Allow users to create profiles, track their voting history, and manage their information.
- **User Support:** Provide user support channels for voters who may have questions or face issues.
- **Documentation and Help:** Include detailed documentation on how to use the platform for both voters and administrators.
- **Testing and Debugging:** Ensure thorough testing of the system's functionality and security measures.

## Commands

1- `protoc`:
The Protocol Buffer compiler, protoc, is a core tool in gRPC for generating code from .proto service definitions. You use it to compile your service definition files into source code in various programming languages. For example, to generate TypeScript code, you'd use a command like:

```css
protoc --proto_path=proto_dir --js_out=import_style=commonjs,binary:output_dir --grpc_out=output_dir --plugin=protoc-gen-grpc=path/to/grpc_ts_plugin proto_file.proto
```

2- `grpc_tools_node_protoc`:

This is a Node.js plugin for the Protocol Buffer compiler. It simplifies the process of generating gRPC service and client code in Node.js. It works seamlessly with the protoc command and adds Node.js-specific code generation options.

```bash
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:output_dir --grpc_out=output_dir --plugin=protoc-gen-grpc=node_modules/.bin/grpc_tools_node_protoc_plugin proto_file.proto
```

3- `grpc_tools_ruby_protoc`:

Similar to grpc_tools_node_protoc, this is a Ruby plugin for the Protocol Buffer compiler. It facilitates generating gRPC-related code for Ruby-based applications.

4- `grpcurl`:

This is a command-line tool for interacting with gRPC servers. It allows you to make requests to gRPC services, inspect service definitions, and more. It's especially useful for testing and debugging gRPC services without writing a client application.

```
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext -d '{"message": "Hello"}' localhost:50051 helloworld.Greeter/SayHello
```

5- `openssl`:

While not a gRPC-specific command, OpenSSL is often used to manage certificates for secure gRPC communication. You can generate key pairs, create self-signed certificates, and manage certificate chains using OpenSSL.

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
