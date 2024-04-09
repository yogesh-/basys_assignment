# Software Design Document

## Project Overview:
The project aims to develop software allowing admins to register payers and providers on the platform. The platform needs to have secure access controls, data validation and follow compliance.

## User Flow
- SuperAdmin receives data/information about new users/entities (providers/payers) to be onboarded. 
- Admin creates a new user based on the information.
- New user gets notification on email.
- New user logs in and sets a custom Password.
- Super Admin can view all the logs which display data and status of each user/entity.

## Stack:
The software is built using the MERN(Postgres instead of MongoDB) stack:
-	Frontend: ReactJS
-	Backend: Node.js, Express
-	Database: Postgres
-	Styling: Tailwind CSS

## Other Tools/Packages used
- bcrypt - to encrypt and ensure secure storage and transmission.
- nodemailer - to send transactional or notification emails
- Ethereal email - email SMTP provider


## Deployment:
PostgresDB from AWS RDS was used for data storage during development and testing. Both frontend and backend were developed and functionally tested on local machine.

## How to run this locally

Clone the repository to your local machine and:

For Frontend:  
`cd basys_frontend`  
`npm run dev`

For Backend:  
`cd basys_backend`  
`npm start`

  

## DEMO VIDEO
https://github.com/yogesh-/basys_assignment/assets/7193961/4440af58-08f1-4f54-a839-7abc13ca1647



