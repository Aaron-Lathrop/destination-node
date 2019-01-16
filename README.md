# Destino - Simple Planning

The Destino app let's you plan trips with a minimal user interface. Users can create trips and then add plans for each day of the trip. Trips and plans can be edited or deleted as desired.

### Working Prototype

View working prototype here: [Destino - Simple Planning](https://destino-planning.herokuapp.com/)

View GitHub repo for client-side app here: [Destino GitHub - Client side](https://github.com/Aaron-Lathrop/destination-client)

This app was created using create-react-app.

This is the server repository for the Destino - Simple Planning client.

## Site Map: MVP

## UX & User Stories: MVP

**Landing Page**

As a user, I want to understand what the app is so that I can decide if I want to sign up

![Landing page design](/assets/Landing_page_1.png)

**Sign-up Form**

As a user, I want to sign up so I can save my trips and plans

![Sign-up form design](/assets/Sign_up_form.png)


**Login Form**

As a user, I want to log in so I can access my information

![Login form design](/assets/Login_form.png)

**Trips Page**

As a user, I want to see which trips I've created

![Trips page design](/assets/Trips_page.png)

**Create a new trip Form**

As a user, I want to create new trips to organize my plans

![Create a new trip form design](/assets/Create_a_new_trip_form.png)

**Update trip form**

As a user, I want to be able to update trips I've created

![Update trip form design](/assets/Update_trip_form.png)

**Trip Plans Page**

As a user, I want to see my plans for a trip organized by date, add new plans, edit plans, and delete plans

![Trip plans page design](/assets/Trip_plans_page.png)

**Edit plans form**

As a user, I want to add new plans, edit plans, and delete plans

![Edit plans form design](/assets/Edit_plans_form.png)

**Delete Trip Button**

As a user, I want to be able to delete trips so I can stay organized and handle trips that have been canceled

![Edit plans form design](/assets/Delete_trip.png)

**Log Out Page**

As a user, I want to log out so I can keep my account and information secure

## Technical

Destino - Simple Planning was bulit with:

#### Front End

* HTML5
* CSS3
* JavaScript 
* React.js
* Redux
* Enzyme for testing

#### Back End 

* Node.js 
* Express.js
* MongoDB
* Mongoose
* mLab database
* Mocha and Chai for testing


### Responsive
This app is built to be responsive to smaller screen sizes using css flexbox and grid, css and media screen width breakpoint of 600px for smaller screen sizes

## Development Road Map
Features for future iterations include:
- Add country flags to trip section
- Add research section with wikipedia api
- Add TripAdvisor api to easily find things to do
- Add drag and drop to rearrange plans on each day and between days
- Add Unsplash api and Google Places api support to show images of different locations
- Add share feature so users can collaborate with others on trips
- Add email verification on sign up
- Add social sharring feature (e.g. Facebook, Instagram, etc...)
- Add change password feature
- Add delete user feature
