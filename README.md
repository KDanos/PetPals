# 🐾 PetPals 🐾

A social network platform for pet owners. 

#  Overview

PetPals is a social network designed around pet lovers. Owners can: 
- show case their pets, with photos and descriptions,
- find minders-individuals who offer services to take care of their pets when help is needed,
- offer their own services as minders, such as as: 
    * dog walkers,
    * house or pet sitters,
    * pet hosting,
    * pet feeding.

The source code is available on the public gitHub repository <https://github.com/KDanos/PetPals>.
# Features

PetPals offers full CRUD functionality: 
- Create new users or pets
- Read the information stored in users and pets, including minding serices, links betweent oweners, pets and minders.
- Update the information or services of users or pets
- Delete users or pets

# :alembic: Technology Stack

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

The application loads in a landing page, welcoming the user. The following views are available to users, without logging in: 
 * pets index page
 * individual pet page (see future functionality)
 * minder index page
 * individual minder page

 After users sign up they can log-in and then have options to: 
 * update their own information
 * add pets and update their information
 * link their pets to a minder

## Wireframes

A list of the initial design wireframes are included here, to help with understanding the application evolution. The screeshots later on correspond to the originally design wireframes. 

![Landing Page, Sign-in, Sign-up](/public/images/README%20images/3.0%20Landing,%20Sign-in%20and%20Sign-up%20page%20wireframe.png)

![User profile, Pet Index, Minder Index](/public/images/README%20images/4.0%20User%20Profile,%20Pet%20Index%20and%20Carer%20Index%20wireframe.png)

![Edit and Show Services and Pets](/public/images/README%20images/5.0%20Edit%20and%20Show%20Services%20and%20Pets%20wireframe.png)
## Screenshots

# :play_button: Getting started

The application is run online live with no requirements from the user, other than creating a password protected account and logging in. 

To make changes to the code, please clone the github repository. To succesfully load the application locally, the user is required to: 
- create am .env file with the following information: 
    * MONGODB_URI: a string to be used as the link to the mongose data base.
    * SESSION_SECRET: a string to be used by express-session to create the session variable
    * PORT: an optional value for the localhost port. If none is provided, the program defaults to localhost = 3000.

# :hammer_and_wrench: Future enhancements

## Known bugs


## Additional functionality

Potential upgrades and further development of the application include: 

### Tool functionality
- filter available minders based on location (post code).
- add a profile photo for the user
- add photo of the pet
- currently all flash messages, both error and success appear in red. It will be useful to have succesful messages appear in a different color
- users should be able to attach a cost to the services they provide

### Carers
- when a user is adding a new serice to their profile, they are offered all the available serviceTypes defined in the model. That list should be filtered to exclude the services the user is already adding

### Pet owners
- update stories with pictures of their activities.
- chose whether the pet's index page is visible to users that are not logged-in

