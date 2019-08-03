REST APIs Homework Assignment
This assignment is made up of two sections. The sections can be completed in any order. If you get stuck on one section, take a break and try another. Complete as many steps from each section as you can.

Note: Codaisseur uses the results of this homework assignment for a formal evaluation. You must write all of the code yourself. No collaboration or external help is allowed. Plagiarism is a violation of the Academy contract and is not in your best interest. Do not discuss the contents of the assignment with your fellow students.

How to submit your work
Push your code to a GitHub repository.
Send a link to the repository to teachers@codaisseur.com before Saturday 22:00
Setup
Create a new local directory for this assignment.
cd into that directory and create a new git repository. All files for this homework must be tracked in this repository.
Initialize a Node.JS project in the repository directory so you can install and use packages.
Sections
1. Create an Express app with a single end-point.
Create a new JS file named messages-api.js.

Create an Express app in that file. The app should listen for requests on port 3000. Make sure you add the required dependency.

Add a single endpoint to the app responds to POST requests to the /messages URI.

When a request is sent to the endpoint, it should log the text property of the body to the console, and it should respond with a JSON object:

{
   "message": "Message received loud and clear"
}
In order to parse the JSON body of the request, you will need to add the middleware for it. Make sure you add the required dependency.

Perform the following validation: if the body does NOT have a text property or the string is empty, then send a "Bad Request" HTTP status code to the client.

The API should only log the message five times.

After receiving five messages, sixth request should be sent a response that indicates the HTTP status for "Too Many Requests".

Make sure the correct HTTP status code is sent (Google it if you haven't seen this status message before).

Although there are libraries to implement such limits, do not use them! Implement the logic yourself.

Put the message limit logic from the previous step into a middleware function. It should behave the same.

2. Use Sequelize to build a REST API.
Create a new JavaScript file named sequelize-rest.js.

Install the dependency sequelize@5.8.6

In the JavaScript file, initialize the database connection with Sequelize.

Using Sequelize, define a model called Movie with the following properties (in addition to an ID):

title (text)
yearOfRelease (number)
synopsis (text)
Make sure the model is synched with the database upon startup.

Use the model create() method to insert 3 rows of example data. This logic should happen after the model synchronization completes. The data should persist. Restarting the API should not cause any data to be lost.

Create an express app with routes that support the following RESTful actions on the "movies" resources.

create a new movie resource
read all movies (the collections resource)
read a single movie resource
update a single movie resource
delete a single movie resource
You don't need any special logic. A standard REST implementation is ok.

Implement pagination on the "read all" collections resource end-point.

The user must be able to pass limit and offset as query parameters to correctly control what results they receive. You can access query parameters on the req.query object. Sequelize supports pagination through the findAndCountAll query method.

The response should, in addition to the array of resources, also contain a number indicating how many results there are in total. So, it should look like this:

{
   data: [
      { ... },
      { ... },
      ...
   ],
   total: 12
}
Make sure that all endpoints handle database errors in the promise chain. Errors should be handled by Express' built-in error handler.