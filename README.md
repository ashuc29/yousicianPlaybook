# Yousician Playbook

A web application to browse, search, and filter songs from the Yousician library. Users can view song details, filter by level, and mark their favorite songs.

## Features

-   **Song Discovery**: Browse a list of songs with infinite scrolling.
-   **Favorites**: Mark and unmark songs as favorites.
-   **Responsive UI**: A clean interface that works on different screen sizes.

## New Features added 
-   **Search**: Instantly search for songs by title, with an option to clear the search query.
-   **Level Filtering**: Filter songs by one or more difficulty levels (1-15), with an option to clear all selected filters.

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

This project uses `json-server` to provide a mock API. The API setup is located in the `/api` directory.

1.  **Navigate to the API directory:**
    
To start it, you must go inside the api folder, install the dependencies `npm install` and run:

`npm run start-api`

Now if you go to http://localhost:3004 you should see the default json server page.

### Frontend Setup (Mock API)

1. Unzip the Project: First, unzip the project's ZIP file to a location on your computer.

2. Navigate to the project's root directory: Open your terminal or command prompt and move into the folder you just unzipped. This is the directory that contains the package.json file.

# Replace 'yousicianPlaybook' with the actual name of the unzipped folder
cd path/to/yousicianPlaybook

3. Install all dependencies: The below command reads your package.json file and installs all the necessary packages from dependencies (like React, Lucide) and devDependencies (like Tailwind, Playwright).

`npm install`

4. Run the React application: This will start the development server.
`npm start`

5. View the app: Open http://localhost:3000 to view it in your browser. The page will reload automatically as you make changes to the code.

# Configuration - API Connection
The React application is configured to connect to the mock API.

Default URL: By default, the app attempts to connect to http://localhost:3004. This matches the Backend Setup instructions and should work without any changes.

This project uses a central file called `constants` for managing application-wide settings, making it easy to adjust key values.

# Constants File (src/config/constants.js)
A dedicated file, src/config/constants.js, has been created to store and export all important global constants. This includes:

API_URL: The base URL for the json-server backend.

SONGS_PER_PAGE: How many songs to load at a time for infinite scrolling.

DEBOUNCE_DELAY: The time (in milliseconds) to wait after a user stops typing before sending a search request.

# custom API URL and global constants
If you need to change these values (for example, if you run your backend API on a different port), the recommended way is to create a .env file:

# Create a .env file
Create a file named .env in the root of the project (the same directory as package.json).

# Add the variables you want to override. For example:
# Changes the API endpoint
REACT_APP_API_URL=http://localhost:8080

# Changes the number of songs loaded per page
REACT_APP_SONGS_PER_PAGE=15

# Changes the search delay
REACT_APP_DEBOUNCE_DELAY=300

# Re-run the project
After creating or changing the .env file, you must restart the React development server (stop npm start and run npm start again) for the new values to be loaded.

# Cutsom Favicon
The project uses a custom SVG icon (the green Yin Yang symbol) as its favicon. This is the icon you see in the browser tab.

# File Location: 
The icon file is located at public/favicon.svg.

# HTML Link: 
This file is linked in the public/index.html file with the following line:
<link rel="icon" href="%PUBLIC_URL%/favicon.svg" alt="favicon" />

# To replace icon in future 
Get your new icon file (e.g., my-new-icon.png) and place it inside the public/ folder.

update the href link to point to your new image the index.html file





    