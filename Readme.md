# Sports Facility Booking Platform

This project is a backend implementation for a sports facility booking platform, developed using TypeScript, Express.js, and Mongoose for MongoDB. The platform provides key functionalities such as Error Handling, CRUD operations, Authentication & Authorization, and Transaction & Rollback.

## Live link: https://sports-facility-booking-platform-be.vercel.app/

## Features
- **Authentication & Role-based Authorization**: The user can sign up and log in and can set his role to 'Admin' or 'User'.
- **Secured authentication with JWT**: Used JWT for secured authentication.
- **Admin roles**: can create a facility, update, and delete it. Admin can view all bookings
- **Soft delete**: Delete will be soft delete
- **User roles**: can book a facility, cancel, and see his bookings only
- **Check availability of bookings**: Anyone can check the availability of time slots for bookings on a specific date.
- **Search query by date**: Anyone can check the availability by searching by date
- **Unavailable time slot**: If the facility is unavailable during the requested time slot, an error response is returned.
- **Not found**: When retrieving data, if the database collection is empty or no matching data is found, this message will be retured: "No data found."
- **Global error handling**: Implemented proper error handling throughout the application. Used global error handling middleware to catch and handle errors, providing appropriate error responses with error messages.
- **Authentication Middleware**: Implemented an Authentication Middleware to authenticate the application. Ensures that only user and admin can access their own accessible routes.
- **Zod Validation**: The API employs Zod for input validation, ensuring data consistency. When validation fails, a 400 Bad Request status code is returned, accompanied by detailed error messages specifying the erroneous fields and reasons.

## Technology used:
- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **ODM & Validation Library**: Mongoose for MongoDB
- **Other Libraries**: Bcrypt, JWT, Cors, Dotenv and Zod


## How to set up and use the application

- **Installation**
Clone the repository
```javascript
git clone https://github.com/Raiyan109/sports-facility-booking-platform.git

```
 - **Usage**: 
Install all dependencies by npm install.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)