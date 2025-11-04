# Yousician Playbook

A web application to browse, search, and filter songs from the Yousician library. Users can view song details, filter by level, and mark their favorite songs.

## Features

-   **Song Discovery**: Browse a list of songs with infinite scrolling.
-   **Favorites**: Mark and unmark songs as favorites.
-   **Responsive UI**: A clean interface that works on different screen sizes.
-   **Search**: Instantly search for songs by title.
-   **Level Filtering**: Filter songs by one or more difficulty levels (1-15).

## New Features

-   **Ligt Mode/Dark Mode**: A button in the top-right corner toggles between light and dark mode.
-   **ClearAll for Search**: Clear Search: Instantly clear the search field with a single tap, improving usability for mobile users.
-   **ClearAll for Filter**: Clear Search: Instantly clear the search field with a single tap.

## API retry handling

-  The mock API is intentionally "flaky" and will randomly fail to simulate real-world network issues. To manage this, the application automatically retries failed requests up to 4 times. This system uses "exponential backoff," waiting progressively longer between each attempt to ensure the app remains stable and resilient.

-  This retry logic is implemented within the API service functions (e.g., getSongs and handleRequest) located in `src/api` folder.

## Tech Stack

-   **Frontend**: React, Create React App
-   **Styling**: Tailwind CSS for utility-first styling, with global styles (`global.css`) and CSS variables for colors (`variable.css`).
-   **Icons**: Lucide React
-   **API**: Mock API using `json-server`
-   **Unit & Integration Testing**: Jest, React Testing Library

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v16 or later)
-   npm or yarn

### Backend Setup (Mock API)

-   This project uses `json-server` to provide a mock API. The API setup is located in the `/api` directory.

 **Navigate to the API directory:**
    
-   To start it, you must go inside the api folder, install the dependencies `npm install` and run:

`npm run start-api`

-   Now if you go to http://localhost:3004 you should see the default json server page.

### Frontend Setup 

-   Unzip the Project to a location on your computer.

-  Navigate to the project's root directory: Open your terminal or command prompt and move into the folder you just unzipped. This is the directory that contains the package.json file.

# Replace 'yousicianPlaybook' with the actual name of the unzipped folder
cd path/to/yousicianPlaybook

-   Install all dependencies: The below command reads your package.json file and installs all the necessary packages from dependencies (like React, Lucide) and devDependencies (like Tailwind).

`npm install`
-   Run the React application: This will start the development server.
`npm start`

-   This will launch the app in your default web browser, usually at:
http://localhost:3000/
The page will reload automatically as you make changes to the code.

**Configuration - API Connection**

-  The React application is configured to connect to the mock API.

-  Default URL: By default, the app attempts to connect to http://localhost:3004. This matches the Backend Setup instructions and should work without any changes.

-   This project uses a central file called `constants` for managing application-wide settings, making it easy to adjust key values.

 **Navigate to the constants file:**

-   A dedicated file, src/config/constants.js, has been created to store and export all important global constants. This includes:

-  API_URL: The base URL for the json-server backend.

-  SONGS_PER_PAGE: How many songs to load at a time for infinite scrolling.

-  DEBOUNCE_DELAY: The time (in milliseconds) to wait after a user stops typing before sending a search request.

# Customizing with a .env File - custom API URL and global constants

-  If you need to change these values (for example, if you run your backend API on a different port), the recommended way is to create a .env file:

**Create a .env file**

-  Create a file named .env in the root of the project (the same directory as package.json).
Add your overrides: Copy and paste the variables you want to change into this file, keeping the name the same but changing the value.

-  Example: To change the API port from 3004 to 8080, your .env file would look like this:

#The variable name (REACT_APP_API_URL) stays the same.
#Only change the value to match your port.
REACT_APP_API_URL=http://localhost:8080

**You can also override the other constants**

REACT_APP_API_URL=http://localhost:8080
REACT_APP_SONGS_PER_PAGE=15
REACT_APP_DEBOUNCE_DELAY=300

**Re-run the project**

-  After creating or changing the .env file, you must restart the React development server (stop npm start and run npm start again) for the new values to be loaded.

# Customization - Favicon

-  The project uses a custom SVG icon (the green Yin Yang symbol) as its favicon. This is the icon you see in the browser tab.

-  The icon file is located at `public/favicon.svg`

-  This file is linked in the `public/index.html` file with the following line:
   <link rel="icon" href="%PUBLIC_URL%/favicon.svg" alt="favicon" />

**To replace icon in future**

-  Get your new icon file (e.g., my-new-icon.png) and place it inside the `public/` folder
update the href link to point to your new image in the index.html

# Styling
-  This project uses Tailwind CSS for most of its styling, along with a few global stylesheets.

#### Global Colors (variable.css)
-  To ensure color consistency and use the colors from the project instructions, a dedicated variable.css file is used (located in the styles folder).

-  This file defines all the primary colors as CSS variables, which are then used throughout the application

# Testing
-  This project uses Jest and React Testing Library for unit and integration tests. These tests check individual components to ensure they work correctly.

# How to Run Tests:
-  To run the tests, use the following command in your terminal:
`npm test`

-  This command launches the test runner in interactive "watch mode." It will automatically re-run the tests every time you save a change to a file.

# Project Notes - Song Images

-  There was an issue loading images directly from the original API URLs. To fix this and ensure the application has a clean look, a single default placeholder image is used for all songs in the list.

-  This placeholder image is included directly in the React application at `src/assets/images/SongItem_2.png` and is loaded for every song item.
    