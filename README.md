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
## Database Schema

## User Table
- `id` (Primary Key, String): Unique identifier for the user.
- `username` (String): User's username for authentication.
- `password` (String): Encrypted password for user authentication.

## Candidate Table
- `id` (Primary Key, String): Unique identifier for the candidate.
- `name` (String): Name of the candidate.
- `party` (String): Affiliated political party.
- `campaign_details` (String): Campaign information and details.

## Election Table
- `id` (Primary Key, String): Unique identifier for the election.
- `title` (String): Title of the election.
- `start_date` (DateTime): Start date and time of the election.
- `end_date` (DateTime): End date and time of the election.
- `is_active` (Boolean): Flag indicating if the election is active.

## Vote Table
- `id` (Primary Key, String): Unique identifier for the vote.
- `user_id` (Foreign Key, String): References the user who casted the vote.
- `candidate_id` (Foreign Key, String): References the candidate for whom the vote was casted.

## Notification Table
- `id` (Primary Key, String): Unique identifier for the notification.
- `user_id` (Foreign Key, String): References the user to whom the notification is sent.
- `message` (String): Notification message.
- `timestamp` (DateTime): Timestamp of when the notification was sent.

## AuditTrail Table
- `id` (Primary Key, String): Unique identifier for the audit trail entry.
- `user_id` (Foreign Key, String): References the user who casted the vote.
- `candidate_id` (Foreign Key, String): References the candidate for whom the vote was casted.
- `timestamp` (DateTime): Timestamp of when the vote was casted.

## UserProfile Table
- `id` (Primary Key, String): Unique identifier for the user profile.
- `user_id` (Foreign Key, String): References the user associated with the profile.
- `vote_ids` (Array of Strings): References to the IDs of casted votes.

## Admin Table
- `id` (Primary Key, String): Unique identifier for the admin.
- `username` (String): Admin's username for authentication.
- `password` (String): Encrypted password for admin authentication.

## VerificationStatus Table
- `id` (Primary Key, String): Unique identifier for the verification status entry.
- `vote_id` (Foreign Key, String): References the ID of the vote to be verified.
- `verified` (Boolean): Indicates whether the vote has been verified.

## ElectionResult Table
- `id` (Primary Key, String): Unique identifier for the election result entry.
- `election_id` (Foreign Key, String): References the ID of the election.
- `candidate_id` (Foreign Key, String): References the ID of the candidate.
- `vote_count` (Integer): Number of votes received by the candidate.

## LeaderboardEntry Table
- `id` (Primary Key, String): Unique identifier for the leaderboard entry.
- `candidate_id` (Foreign Key, String): References the ID of the candidate.
- `vote_count` (Integer): Number of votes received by the candidate.

## DashboardNotification Table
- `id` (Primary Key, String): Unique identifier for the dashboard notification.
- `user_id` (Foreign Key, String): References the user to whom the notification is sent.
- `message` (String): Notification message.
- `timestamp` (DateTime): Timestamp of when the notification was sent.

## DashboardCandidate Table
- `id` (Primary Key, String): Unique identifier for the dashboard candidate.
- `candidate_id` (Foreign Key, String): References the ID of the candidate.
- `name` (String): Name of the candidate.
- `party` (String): Affiliated political party.

## DashboardElection Table
- `id` (Primary Key, String): Unique identifier for the dashboard election.
- `election_id` (Foreign Key, String): References the ID of the election.
- `title` (String): Title of the election.
- `start_date` (DateTime): Start date and time of the election.
- `end_date` (DateTime): End date and time of the election.

## VoteHistory Table
- `id` (Primary Key, String): Unique identifier for the vote history entry.
- `user_id` (Foreign Key, String): References the user who casted the vote.
- `candidate_id` (Foreign Key, String): References the candidate for whom the vote was casted.
- `timestamp` (DateTime): Timestamp of when the vote was casted.

## UserSession Table
- `id` (Primary Key, String): Unique identifier for the user session.
- `user_id` (Foreign Key, String): References the user associated with the session.
- `token` (String): Authentication token for the session.
- `expiration_time` (DateTime): Timestamp indicating when the session token will expire.

## AdminSession Table
- `id` (Primary Key, String): Unique identifier for the admin session.
- `admin_id` (Foreign Key, String): References the admin associated with the session.
- `token` (String): Authentication token for the session.
- `expiration_time` (DateTime): Timestamp indicating when the session token will expire.

## UserProfileHistory Table
- `id` (Primary Key, String): Unique identifier for the user profile history entry.
- `user_profile_id` (Foreign Key, String): References the user profile associated with the history.
- `change_type` (String): Indicates whether it's a profile creation, update, or deletion.
- `change_timestamp` (DateTime): Timestamp of when the profile change occurred.

## AdminActivityLog Table
- `id` (Primary Key, String): Unique identifier for the admin activity log entry.
- `admin_id` (Foreign Key, String): References the admin associated with the activity.
- `activity` (String): Description of the admin's activity.
- `timestamp` (DateTime): Timestamp of when the activity occurred.

## gRPC Schema

### User.proto - Defines messages for user authentication and registration:

```protobuf
syntax = "proto3";

message User {
  string id = 1;
  string username = 2;
  string password = 3;
}

service UserService {
  rpc RegisterUser(User) returns (User);
  rpc AuthenticateUser(User) returns (User);
}
```

### Candidate.proto - Defines messages for managing candidates:

```protobuf
syntax = "proto3";

message Candidate {
  string id = 1;
  string name = 2;
  string party = 3;
  string campaign_details = 4;
}

service CandidateService {
  rpc AddCandidate(Candidate) returns (Candidate);
  rpc GetCandidates() returns (stream Candidate);
}
```

### Election.proto - Defines messages for managing elections and votes:

```protobuf
syntax = "proto3";

message Election {
  string id = 1;
  string title = 2;
  string start_date = 3;
  string end_date = 4;
  bool is_active = 5;
}

message Vote {
  string id = 1;
  string user_id = 2;
  string candidate_id = 3;
}

service ElectionService {
  rpc CreateElection(Election) returns (Election);
  rpc GetActiveElections() returns (stream Election);
}

service VoteService {
  rpc CastVote(Vote) returns (Vote);
  rpc GetUserVotes(string) returns (stream Vote);
}
```

### Notification.proto - Defines messages for sending notifications to users:

```protobuf
syntax = "proto3";

message Notification {
  string id = 1;
  string user_id = 2;
  string message = 3;
  string timestamp = 4;
}

service NotificationService {
  rpc SendNotification(Notification) returns (Notification);
  rpc GetUserNotifications(string) returns (stream Notification);
}
```

### Admin.proto - Defines messages for administrative actions:

```protobuf
syntax = "proto3";

message Admin {
  string id = 1;
  string username = 2;
  string password = 3;
}

service AdminService {
  rpc AuthenticateAdmin(Admin) returns (Admin);
  rpc StartElection(string) returns (Election);
  rpc EndElection(string) returns (Election);
}
```

### Result.proto - Defines messages for election results:

```protobuf
syntax = "proto3";

message ElectionResult {
  string election_id = 1;
  string candidate_id = 2;
  int32 vote_count = 3;
}

service ResultService {
  rpc GetElectionResults(string) returns (stream ElectionResult);
}
```

### Profile.proto - Defines messages for user profiles:

```protobuf
syntax = "proto3";

message UserProfile {
  string id = 1;
  string username = 2;
  repeated string vote_ids = 3;
}

service ProfileService {
  rpc GetUserProfile(string) returns (UserProfile);
}
```

### AuditTrail.proto - Defines messages for audit trail and vote verification:

```protobuf
syntax = "proto3";

message AuditTrail {
  string id = 1;
  string user_id = 2;
  string candidate_id = 3;
  string timestamp = 4;
}

service AuditTrailService {
  rpc RecordAudit(AuditTrail) returns (AuditTrail);
  rpc GetUserAuditTrail(string) returns (stream AuditTrail);
}
```

### Dashboard.proto - Defines messages for user dashboards:

```protobuf
syntax = "proto3";

message VoterDashboard {
  repeated Election active_elections = 1;
  repeated Notification notifications = 2;
  UserProfile user_profile = 3;
}

message AdminDashboard {
  repeated Election active_elections = 1;
  repeated Candidate candidates = 2;
}

service DashboardService {
  rpc GetVoterDashboard(string) returns (VoterDashboard);
  rpc GetAdminDashboard(string) returns (AdminDashboard);
}
```

### VoteVerification.proto - Defines messages for verifying casted votes:

```protobuf
syntax = "proto3";

message VoteVerification {
  string vote_id = 1;
  bool verified = 2;
}

service VerificationService {
  rpc VerifyVote(VoteVerification) returns (VoteVerification);
  rpc GetVoteVerificationStatus(string) returns (VoteVerification);
}
```

### Leaderboard.proto - Defines messages for displaying election leaderboards:

```protobuf
syntax = "proto3";

message LeaderboardEntry {
  string candidate_id = 1;
  int32 vote_count = 2;
}

service LeaderboardService {
  rpc GetElectionLeaderboard(string) returns (stream LeaderboardEntry);
}
```

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
