
# 0x04. Files Manager

## Project Overview

This project is a culmination of the back-end trimester, focusing on authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The objective is to build a simple platform for uploading and viewing files. The key features include user authentication via a token, listing all files, uploading new files, changing file permissions, viewing files, and generating thumbnails for images.

### Project Details

- **Backend Technologies:**
  - JavaScript (ES6)
  - NodeJS
  - ExpressJS
  - MongoDB
  - Redis
  - Kue

- **Project Timeline:**
  - Start: Nov 30, 2023, 6:00 AM
  - End: Dec 7, 2023, 6:00 AM
  - Checker Released: Dec 2, 2023, 12:00 AM

- **Project Team:**
  - CTO: Guillaume
  - Team: Tonny Kirwa

## Learning Objectives

By the end of this project, you should be able to:

- Explain how to create an API with Express.
- Understand the process of user authentication.
- Store and retrieve data in MongoDB.
- Utilize Redis for temporary data storage.
- Set up and use a background worker for asynchronous tasks.

## Requirements

- **Allowed Editors:**
  - vi, vim, emacs, Visual Studio Code

- **Node Environment:**
  - Interpreted/compiled on Ubuntu 18.04 LTS using Node (version 12.x.x)

- **File Conventions:**
  - All files should end with a new line
  - Code should use the .js extension

- **Linting:**
  - Code will be verified against lint using ESLint
  - Provided `.eslintrc.js` for ESLint configuration

- **Package Management:**
  - Run `$ npm install` to install project dependencies (package.json provided)

## Project Structure

- **Files:**
  - `package.json`
  - `.eslintrc.js`
  - `babel.config.js`
  - (Add additional files as per your project structure)

## Setup Instructions

1. Clone the repository.
2. Navigate to the project folder.
3. Run `npm install` to install dependencies.

## Implementation Steps

1. **Authentication:**
   - Implement user authentication using tokens.

2. **File Management:**
   - Create routes and controllers for listing all files, uploading new files, changing file permissions, and viewing files.

3. **MongoDB Integration:**
   - Set up MongoDB and connect the application.
   - Create models for user data and file data.

4. **Redis Integration:**
   - Integrate Redis for temporary data storage.

5. **Background Processing:**
   - Set up Kue for background processing.

6. **Thumbnail Generation:**
   - Implement a feature to generate thumbnails for images.

7. **Testing:**
   - Write tests using Mocha to ensure endpoint and background process functionality.

8. **Linting:**
   - Ensure code adheres to ESLint rules.

9. **Documentation:**
   - Create a comprehensive README.md explaining project setup, running instructions, API endpoints, and authentication details.

10. **Review:**
    - Request a manual QA review.

11. **Submission:**
    - Ensure submission by the specified deadline.

## Conclusion

This project provides a practical opportunity to apply back-end development concepts learned throughout the trimester. Have fun building the Files Manager platform!
