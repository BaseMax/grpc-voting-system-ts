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
- **React:** Develop the frontend interfaces and user interactions using the React framework.
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

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
