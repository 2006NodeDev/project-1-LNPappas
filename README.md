# project-1-LNPappas
# Revature Pro 2

In this document, all requirements and required technologies pertaining to the first project are defined. In RevPro2, you will be building a fullstack application and deploying it on Google Cloud Platform. The service will be keeping track of user information and will have a UI built in React for users to interact with. The website will be deployed in Cloud Storage. The server will be running on a managed instance group on Compute Engine with access behind a Cloud Load balancer. The data will be stored in a Cloud SQL postgresql databaseRequirementsArchitecture

●The website must be deployed in an Cloud Storage bucket acting as a web server.
●The server will be built with express and deployed on Google Compute Engine.
●The server should be in a managed instance group with elastic scaling based on user demand
●Access to the server will be through Cloud Load balancing, with either http or https.
●Express server should connect to Cloud Pub Sub to send asynchronous messages to relevant services
●Cloud Function should be used for extraneous operations.Content
●The website should allow a user to access the functionality of the server
●The server should send important update through Cloud Pub Sub for other services
●You should have at least one Cloud Function that does something interesting
●You must support the user having at least one image related to them (profile picture) with images stored in Cloud StorageFunctionalityAs a User, I can:
  ●Make a new Account with the Website
  ●Login to through the website
  ●I can see and change my own user information
  ●See and update my profile picture.
  ●Do something of your choice.
  Mandatory Technologies
    ●Compute Engine
    ●Cloud Load balancing
    ●Cloud Storage
    ●Persistent Disk
    ●VPC
    ●Cloud Pub Sub
    ●Cloud Function
    ●Express
    ●React
    ●Postgresql
    ●pg or Knex ( for queries )
    ●Redux is optionalGuidelines and Deadlines
  All requirements must be completed.
  
It’s important to add your own flavor into your work, but don’t go outside of the box if mandatory requirements are not completed yet.oWhen adding additional requirements, always document yourself into its pricing and don’t go overboard.
