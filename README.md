# Pro 2

Pro2, is a fullstack application deplpyed on Google Cloud Platform. The service will keeps track of user information and has a UI built in React for users to interact with. The website was deployed in Cloud Storage, the server running on a managed instance group on Compute Engine with access behind a Cloud Load balancer. Data stored in a Cloud SQL postgresql databaseRequirementsArchitecture

● Website deployed in an Cloud Storage bucket acting as a web server.

● Server built with express and deployed on Google Compute Engine.

● Server in a managed instance group with elastic scaling based on user demand

● Access to the server through Cloud Load balancing, with https.

● Express server connects to Cloud Pub Sub to send asynchronous messages to relevant services

● Cloud Function used for extraneous operations.Content

● The website allows a user to access the functionality of the server

● The server sends important updates through Cloud Pub Sub for other services

● Cloud Function sends email to users to confirm sign up

● Supports the user having at least one image related to them (profile picture) with images stored in Cloud StorageFunctionality

● As a User, I can:
  ● Make a new Account with the Website
  ● Login to through the website
  ● I can see and change my own user information
  ● See and update my profile picture.
  ● Email user notification of sign up.
  
  
  Technologies
    ● Compute Engine
    ● Cloud Load balancing
    ● Cloud Storage
    ● Persistent Disk
    ● VPC
    ● Cloud Pub Sub
    ● Cloud Function
    ● Express
    ● React
    ● Postgresql
    ● pg or Knex ( for queries )
    ● Redux is optionalGuidelines and Deadlines
