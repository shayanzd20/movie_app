# React Native - Movie App

The movie app is a movie browsing app that builds completely on [**React Native**](https://reactnative.dev/) and [**Expo**](https://expo.io).

## Setup instructions

### 1. Clone Repository

```sh
# Clone the movie app
git clone https://github.com/shayanzd20/movie_app.git
```

### 2. Install all dependencies

```sh
# navigate to app directory
cd the_movie_app

npm install
```

### 3. Start the app

```sh
# using expo-cli
expo start

# using npm
npm start
```

## building structure

-   I used Expo beacause it's very fast for testing and debuging
-   the application has two screen (Home and Movie)
-   components and constants and screens are in a src folder
-   redux files are in redux folder to store list of movies
-   for apis we have a file named MovieServices in services folder (it's appropriate for creating any other third-part services)
-   we can store constants like font and color and images in constants folder to aggregate all togather
