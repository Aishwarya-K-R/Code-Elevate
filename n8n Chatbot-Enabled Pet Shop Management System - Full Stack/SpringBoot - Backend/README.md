************************* **Pet Shop Management System - SpringBoot Backend** *************************

Pet Shop Management System Backend developed using SpringBoot and MySQL database, provides RESTful APIs for user registration, authentication, protection routing and role-based access control using JWT.

Below is the list of REST API endpoints implemented in the Spring Boot backend with role-based access, tested in **POSTMAN**:  
**a. Admin-specific endpoints:**  
1. POST /admin/add/category : Allows admin to create a new product category.
2. PUT /admin/update/category/{cid} : Modifies details of an existing category with the categoryId(cid).
3. DELETE admin/delete/category/{cid} : Removes a category from the system with the categoryId(cid).
4. POST /admin/add/product : Allows admin to add a new product.
5. PUT /admin/update/product/{pid} : Updates product details such as name, price, or stock with the productId(pid).
6. DELETE /admin/delete/product/{pid} : Deletes a product from the catalog with the productId(pid).
7. GET /admin/users : Displays all registered users.
8. GET /admin/orders : Lists all orders placed by users.

**b. User-specific endpoints:**  
1. POST /user/register : Registers a new user into the system.
2. POST /user/{uid}/add/cart/{pid} : Adds a selected product with the productId(pid) to the user’s cart with the userId(uid).
3. PUT /user/{uid}/update/cart/{cid} : Updates quantity or details of an item in the cart with the cartItemId(cid) and userId(uid).
4. DELETE /user/{uid}/delete/cart/{cid} : Removes a product with the cartItemId(cid) from the user’s cart with the userId(uid).
5. GET /user/{uid}/cart : Displays all items in the user’s cart with the userId(uid).
6. GET /user/{uid}/cart/checkout : Proceeds to checkout and places an order for a user with the userId(uid).
7. GET /confirm/order/{oid} : Confirms the placed order for an orderId(oid).
8. GET /cancel/order/{oid} : Cancels the placed order for an orderId(oid).
9. GET /user/orders/{uid} : Fetches all orders made by the logged-in user with the userId(uid).

**c. Common endpoints (for both Admin and User):**  
1. POST /login : Authenticates user credentials and generates a JWT token.
2. POST /forgotPassword : Updates user password when forgotten.
3. GET /user/{uid} : Retrieves the logged-in user’s profile details with the userId(uid).
4. PUT /user/{uid} : Updates user information such as name, email, or password with the userId(uid).
5. GET /categories : Fetches all available product categories.
6. GET /products/category?category= : Retrieves all products belonging to a specific category.
7. GET /product/{pid} : Fetches detailed information for a specific product with the productId(pid).
8. POST /chat : Handles chatbot queries and responses for admin and customer support.

**Tools and Technologies Used:**  
1. Language : Java
2. Framework : SpringBoot
3. Database : MySQL
4. IDE : Eclipse

**Steps for Implementation:**
1. Clone the repository and import it into Eclipse IDE.
2. Ensure that all the required Spring dependencies are installed.
3. Configure the database and enter the configurations in application.properties.
4. Open the terminal and build the project using 'mvn clean install'.
5. Run the project and hit the APIs in POSTMAN, which are accessible at http://localhost:8080.

