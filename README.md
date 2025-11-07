# 🐾 PetPals 🐾

A social network platform for pet owners. 

#  Description

PetPals is a social network designed around pet lovers. Owners can: 
- show case their pets, with photos and descriptions,
- find minders-individuals who offer services to take care of their pets when help is needed,
- offer their own services as minders, such as as: 
    * dog walkers,
    * house or pet sitters,
    * pet hosting,
    * pet feeding.

The source code is available on the public gitHub repository <https://github.com/KDanos/PetPals>.
## Features

PetPals offers full CRUD functionality: 
- Create new users or pets
- Read the information stored in users and pets, including minding serices, links betweent oweners, pets and minders.
- Update the information or services of users or pets
- Delete users or pets

## :alembic: Technology Stack

The application has been built on the RESTful principles in **JavaScript**, using the MEN stack, employing session authentication. Key technologies used include:

- **MongoDB**, for data storage
- **Express** was used as the application framework
- **Node.js** is the JavaScript runtime environment to run the code

Key dependencies include: 
    * **EJS** for HTML rendering
    * **morgan** for HTTP request logging middleware
    * **bcrypt** for password hashing 
    * **Mongoose** for communication with the **MongoDB** database
    * **express-session** for session management
    * **connect-mongo** to store session information in the database
    * **dotenv** to store environment variables
    * **method-override** for RESTful routing
    * **Bootsrap 5.3** for responsive front end design. The library was not imported, rather it was linked in the HTML render .ejs files.
     


## Data Model
There are 2 main models in the application, with third supporting one: 
1. Users: authentication and and authorisation is based on the this model. 
2. Pets: A key resource for the application

3. ServiceTypes: Supporting model, to define types of services users can provide, rather than 

The interaction betweent the models is captured in the final **Entity Relationship Diagram** (ERD). 

![PetPals ERD](/public/images/README%20images/6.0%20%20PetPal%20ERD.png)

The README section of this documents highlights the desire to allow users to offer their services at personalised prices. A potential ERD for that development is illustrated. 
![Enhanced Application ERD](/public/images/README%20images/7.0%20Enhanced%20Application%20ERD.png)

The models evolved during th application build. The ERD below capture the initial ERD design for the MVP and stretch targets.

![MVP ERD](/public/images/README%20images/1.0%20MVP%20ERD.png)

![Stretch ERD](/public/images/README%20images/2.0%20STRETCH%20ERD.png)


# UI

The application loads in a landing page, welcoming the user. **Bootstrap 5.3** was employed to keep the landing page responsive. 

![Landing Page Full Screen](/public/images/README%20images/8.0%20Landing%20Page%20Full%20Screen.png)

![Landing Page iphone-14](/public/images/README%20images/9.0%20Landing%20Page%20iphone-14.png)


The following views are available to users, without logging in: 
 * pets index page
 * individual pet page (see future functionality)
 * carer index page
 * individual minder page

 After users sign up they can log-in and then have options to: 
 * update their own information
 * add pets and update their information
 * update the services they offer to other users
 * as a future enhancement, link users as carers to their pets

 These features are protected both on the client and server routes. 
 On the server side, the signed in user must match the resource (user, pet or service) for the route to activate. 
 On the client side, the buttons to initiate the routes are not available, as per examples below

![Authorised Pet Edit Page](/public/images/README%20images/10.0%20Authorised%20Edit%20Pet%20Page.png)
![Un-authorised Pet Edit Page](/public/images/README%20images/11.0%20Unauthorised%20Edit%20Pet%20Page.png)

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

- when a user deletes their profile, their pets are **NOT** deleted from the Pet model, leaving pets orphaned. Orphaned pets still have ObjectId on the owner property. The ObjectId is not in the User model anymore, throwing up errors. 


## Additional functionality

Potential upgrades and further development of the application include: 

### Tool functionality
- filter available minders based on location (post code).
- add a profile photo for the user
- add photo of the pet
- currently all flash messages, both error and success appear in red. It will be useful to have succesful messages appear in a different color
- users should be able to attach a cost to the services they provide
-make the **Owner**, under the **pet information page**a hyperlink to the users profile, consistent with other other places in the application.

### Carers
- when a user is adding a new serice to their profile, they are offered all the available serviceTypes defined in the model. That list should be filtered to exclude the services the user is already adding.

### Pet owners
- update stories with pictures of their activities.
- chose whether the pet's index page is visible to users that are not logged-in
- link to other users as minders for their pets

