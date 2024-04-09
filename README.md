# Software Design Document

## Project Overview:
The project aims to develop software allowing admins to register payers and providers on the platform. The platform needs to have secure access controls, data validation and follow compliance.

## User Flow
• SuperAdmin receives data/information about new users/entities (providers/payers) to be onboarded. 
• Admin creates a new user based on the information.
• New user gets notification on email.
• New user logs in and sets a custom Password.
• Super Admin can view all the logs which display data and status of each user/entity.

## Stack:
The software is built using the MERN(Postgres instead of MongoDB) stack:
•	Frontend: ReactJS
•	Backend: Node.js, Express
•	Database: Postgres
•	Styling: Tailwind CSS

## Tools used
• bcrypt - to encrypt and ensure secure storage and transmission.
• nodemailer - to send transactional or notification emails
• Ethereal email - email SMTP provider


## Deployment:
During development and testing, PostgresDB from AWS RDS was used for data storage. Both frontend and backend were developed and functionally tested on local machine.

## DEMO VIDEO
