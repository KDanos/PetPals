# PetPals

PetPals is a social network platform for pet owners. 

#  Overview

Owners can: 
- show case their pets, with photos and descriptions,
- find minders-individuals who offer services to take care of their pets when help is needed,
- offer their own services as minders, such as as: 
    * dog walkers,
    * house or pet sitters,
    * pet hosting,
    * pet feeding.

# Features

PetPals offers full CRUD functionality: 
- Create new users or pets
- Read the information stored in users and pets, including minding serices, links betweent oweners, pets and minders.
- Update the information or services of users or pets
- Delete users or pets

# Technology Stack

The application has been built on the RESTful principles in javascript, using the MEN stack: 
- MongoseDB, for data storage
- EJS for html rendering
- Node for js framework

# Data Model
There are 2 main models in the application: 
1. Users
2. Pets

The ERD below show capture the attributes of the objects, as well as the relationships between them, both for an MVP application, as well as for one with additional enhancements. 

![MVP ERD](/public/images/README%20images/1.0%20MVP%20ERD.png)

![Stretch ERD](/public/images/README%20images/2.0%20STRETCH%20ERD.png)


# UI
## Wireframes
## Screenshots

# Getting started

The application is run online live with no requirements from the user, other than creating a password protected account and logging in. 

To make changes to the code, please clone the github repository. To succesfully load the application locally, the user is required to: 
- create am .env file with the following information: 
    * MONGODB_URI: a string to be used as the link to the mongose data base.
    * SESSION_SECRET: a string to be used by express-session to create the session variable
    * PORT: an optional value for the localhost port. If none is provided, the program defaults to localhost = 3000.

# Future enhancements

## Known bugs

## Additional functionality

Potential upgrades and further develooment of the application include: 

### Tool functionality
- filter available minders based on location (post code).
- add a profile photo for the user
### Pet owners
- update stories with pictures of their activities.

