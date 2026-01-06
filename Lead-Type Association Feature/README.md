************************* Lead-Type Association Feature - .NET Backend *************************

Lead-Type Association Feature Backend developed using .NET (ASP.NET Core) and MySQL database, provides RESTful APIs to manage leads and their association with different lead types.
The backend exposes secure and structured endpoints to perform CRUD operations and association logic.
All APIs were tested using Postman.  

This feature was implemented as part of my responsibilities at the company. 
Before integrating it into the production application, I independently designed and developed this backend module to gain deeper understanding and confidence in the implementation.

Below is the list of REST API endpoints implemented with role-based access, tested in POSTMAN : 
a. Admin-specific endpoints:
  1. POST /api/lead: Creates and stores a new lead in the system.
  2. PUT /api/lead: Updates existing lead details based on the provided information.
  3. DELETE /api/lead/{id}: Deletes a lead using the specified lead ID.
  4. POST /api/associations/create: Creates associations between the leads of different lead types.
  5. DELETE /api/associations/delete: Removes existing lead-type associations.

b. User-specific endpoints:
  1. POST /api/signup: Registers a new user into the application.

c. Common endpoints (for both Admin and User):
  1. POST /api/login: Authenticates user credentials and grants access to secured APIs.
  2. GET /api/leads: Retrieves the list of all available leads.
  3. GET /api/lead/{id}: Fetches detailed information of a specific lead using its ID.
  4. POST /api/associations/count: Returns the count of lead-type associations for a given lead.
  5. POST /api/associations/primary: Retrieves the primary lead-type associations.
  6. POST /api/associations/secondary: Retrieves the secondary lead-type associations.

Tools and Technologies Used:
1. Language: C#
2. Framework: ASP.NET Core (.NET)
3. Database: MySQL
4. IDE: Visual Studio Code
5. API Testing Tool: Postman
6. Version Control: Git & GitHub

Steps for Implementation:
1. Clone the repository: git clone https://github.com/Aishwarya-K-R/Code-Elevate.git
2. Open the project in Visual Studio Code.
3. Configure the MySQL database using the commands given in Database File and update the connection string in appsettings.json.
4. Restore dependencies: dotnet restore
5. Build the project: dotnet build
6. Run the application: dotnet run
7. Run the project and hit the APIs in POSTMAN, which are accessible at http://localhost:5248.

