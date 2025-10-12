************************* Pet Shop Management System - n8n Workflow *************************

The n8n workflow is designed to function as a chatbot for the Pet Shop Management System, automating responses and tasks for both admins and users. 
It acts as an intelligent automation tool that handles queries, providing quick and accurate answers while streamlining routine operations.

Steps for Implementation :
1. Clone the repository.
2. Open the n8n instance and upload the downloaded JSON file.
3. Create an new Groq API key and add it to the application.properties file of SprinBoot project to connect n8n with the Pet Shop backend.
4. Replace the Groq API key in the HTTP Response Node of the workflow before execution.
5. Trigger the workflow manually to ensure it connects correctly to the backend.
6. After successful testing, activate the workflow to run automatically when triggered.
7. Test the chatbot functionality by hitting /chat endpoint in POSTMAN, which is accessible at http://localhost:8080. 
