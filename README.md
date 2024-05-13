# NoSQL: Social Network API

## Your Task

As the world continues to advance in terms of technology, so does our ability to advance our back-end application. MongoDB is utilised to handles large amounts of unstructured Data which is heavily utilised in a full-stack application and various other platforms.

In this project, I set out to show how MongoDB works alongside with Insomnia to showcase API Routing.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)



## Technology Used
- Javascript
- Express
- MongoDB
- Insomnia

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Usage
- Upon retreiving the data, you must run the commanc 'npm i' to install the required applications for the files to fun.
- Once the above command is completed, you are able to run the code through 'npm run start'.
- It will allow the localhost to work, in which you can test out the routes.