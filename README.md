# Destino - Simple Planning

[![Build Status](https://travis-ci.org/Aaron-Lathrop/destination-node.svg?branch=master)](https://travis-ci.org/Aaron-Lathrop/destination-node)

A fullstack JavaScript & React application that helps travelers plan trips. Users create trips, add & edit plans, and can keep themselves organized with day to day planning.

## Demo

- [Live Demo](https://destino-simple-planning.herokuapp.com/)

## Client

Client and API were deployed separately and stored in separate GitHub repos.* 
- [Destino Client Repo](https://github.com/Aaron-Lathrop/destination-client)

## Requirements

* Do something interesting or useful
* Be a fullstack app using HTML, CSS, React, Node, Express, and Mongoose
* Client and API should be deployed separately and stored in separate GitHub repos. 
* Client- and server-side code should be tested use TravisCI for continuous integration and deployment.
* App should be responsive, and should work just as well on mobile devices as it does on desktop devices.
* Code should be high quality, error free, commented as necessary, and clean.
* Styling on the client should be polished.
* Use vanilla CSS for styling capstones. Frameworks like Bootstrap are not permitted. 
* Have a comprehensive README file.
* Have a landing page that explains what the app does and how to get started, and the pages required to deliver functionality.
* Deploy a live, publicly-accessible version of the app.
* A demo user account and indicate on the landing page how to use it.

## Using the API

### Authentication / Login
##### POST: /auth/login

* Bearer Authentication with JSON Web Token
* Must provide valid Username and Password in request header
* If authentication succeeds, a valid 7d expiry JWT will be provided in response body

### Register and Login New User
##### POST: /users 

* Must provide Username and Password in request body
* If successful, a valid 7d expiry JWT will be provided in response body

### Get Trips
##### GET: /trips 

* This endpoint returns trips from the Destino database, Trips collection
* Must provide valid JWT via Bearer Authentication
* If authentication succeeds, all trips created by the user will be returned

### Get Trip
##### GET: /trips/:tripId

* This endpoint returns a trip by id from the Destino database, Trips collection
* Must provide valid JWT via Bearer Authentication
* If authentication succeeds, the trip with the corresponding id will be returned

### Add Trip
##### POST: /trips 

* This endpoint adds a trip to the Destino database/Trips collection
* Must provide trip object including: destination, start date, end date, and starter plancards (automatically generated on the client-side)
* Must provide valid JWT via Bearer Authentication

### Update Trip
##### PUT: /trips/:tripId

* This endpoint updates a trip in the Destino database/Trips collection
* Must provide a trip object and trip id as a parameter
* Must provide valid JWT via Bearer Authentication

### Delete Trip
##### DELETE: /trips/delete/:tripId

* This endpoint deletes a trip in the Destino database/Trips collection
* Must provide a trip id as a parameter
* Must provide valid JWT via Bearer Authentication

### Update Plan
##### PUT: /trips/updateplan/:tripId

* This endpoint updates a plan card with new plans array in the Destino database/Trips collection
* Must provide a plan card object and trip id as a parameter
* Must provide valid JWT via Bearer Authentication

### Delete Plan
##### PATCH: /trips/deleteplan/:tripId

* This endpoint replaces the plan card in the Destino database/Trips collection with specified plans filtered out
* Must provide a plan card object and trip id as a parameter
* Must provide valid JWT via Bearer Authentication

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