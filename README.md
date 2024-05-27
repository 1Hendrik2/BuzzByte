# BuzzByte

Welcome to the official documentation for the BuzzByte. This document provides comprehensive information on how to integrate and use the BuzzByte.

## Overview

BuzzByte is a comprehensive news application designed to provide users with the latest news from across the newsapi.org api. With a user-friendly interface and intuitive design, BuzzByte offers a seamless news browsing experience. From breaking news to insightful analysis and trending stories, BuzzByte has you covered. The project is written using typescript and react library.

## Getting started

### Prerequisites

* Node https://nodejs.org/en/
* NPM

### Setup

To get started clone this repository to your computer. 

```bash
# Clone the project
$ git clone https://github.com/1Hendrik2/BuzzByte.git
```

```bash
# Move to project directory
$ cd BuzzByte
# Install the dependencies
$ npm install
# Run the app
$ npm start
```

## React frontend structure

| Name     | Description        |
|--------------|------------------|
| src      | This directory serves as the root of the frontend source code. It contains all the files and directories related to the React application.          |
| src/assets      | Within this directory, you'll find static assets such as images, fonts, or other media files used in the frontend application. These assets can be referenced and included in components or pages as needed.        |
| src/components      | This directory houses reusable UI components that are used across different parts of the application. Components encapsulate UI elements and functionality, promoting code reusability and maintainability.          |
| src/models      |  Here, you'll project models, that specify project data objects.         |
| src/hooks      | This directory contains custom React hooks, which are reusable functions that enable component logic to be shared across different components. Hooks allow for the encapsulation of stateful logic and side effects within functional components.         |
| src/pages      | Within this directory are individual page components representing different views or routes of the application. Each page component typically corresponds to a specific URL route and encapsulates the UI and logic for that particular page.          |
| src/redux      | Directory redux contains all of the folders and files related to the redux state management          |
| src/services     | This directory houses helper functions for interaction with the backend          |

## Documentation

### Homepage
#### /
The homepage serves as the entry point of the application. Homepage has a banner with a description. The section below it serves 2 different purposes, when logged in it shows Top Headlines, and while logged out it displays 3 marketing columns. The Top headlines all have one static image, this is because at the time of development all of the newsapi top headlines were missing an image url.

### Login page
#### /login
The login page is a form with 2 input fields: email and token. Also it includes a link to newsapi token acquirement. Because the news api does not include a login functionality, I had to solve it by making a dummy call to the api using the inserted token, and if the request succeeds the login is completed.

### Sources page
#### /sources
The sources page is a page that displays all of the available source with current selected language. It also has pagination and search funcionality.

### News page
#### /news/{sourceId}
The news page is only accessible through sources page, by selecting a source. The news page consists of a banner, filters, and pagination. The news themselves link to the offical page of the current news.

### Profile page
#### /my-profile
The profile page is a simple page with users data: email and token. It also has a Logout button.

### Header
The header is different for logged in user and logged out user. Logged in user header has links to: homepage, sources, profile. Logged out user header has links to homepage. Header also has a language selector dropdown menu and both log in and logout buttons, depending on if the user is logged in or not.

## Design

The project is designed using html and bootstrap api, it also uses lucide react icons. The design works well on both desktop view and mobile view.


## Dependencies

- **[@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)**: A library for managing form validation resolvers.
- **[@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)**: A toolkit for efficient Redux development, providing utilities for simplified Redux setup and usage.
- **[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)**: Utilities for testing React components with Jest.
- **[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)**: Utilities for testing React components.
- **[@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)**: Utilities for simulating user events in testing.
- **[@types/jest](https://www.npmjs.com/package/@types/jest)**: TypeScript type definitions for Jest.
- **[@types/node](https://www.npmjs.com/package/@types/node)**: TypeScript type definitions for Node.js.
- **[@types/react](https://www.npmjs.com/package/@types/react)**: TypeScript type definitions for React.
- **[@types/react-dom](https://www.npmjs.com/package/@types/react-dom)**: TypeScript type definitions for ReactDOM.
- **[axios](https://www.npmjs.com/package/axios)**: A promise-based HTTP client for making requests to external APIs.
- **[lucide-react](https://www.npmjs.com/package/lucide-react)**: A library of SVG icons for React, providing a collection of customizable icons.
- **[react](https://www.npmjs.com/package/react)**: A JavaScript library for building user interfaces.
- **[react-dom](https://www.npmjs.com/package/react-dom)**: A package providing DOM-specific methods for React.
- **[react-hook-form](https://www.npmjs.com/package/react-hook-form)**: A library for managing form state and validation in React applications.
- **[react-redux](https://www.npmjs.com/package/react-redux)**: Official React bindings for Redux, enabling React components to interact with the Redux store.
- **[react-router-dom](https://www.npmjs.com/package/react-router-dom)**: A library for routing in React applications.
- **[react-scripts](https://www.npmjs.com/package/react-scripts)**: Configuration and scripts for Create React App.
- **[react-toastify](https://www.npmjs.com/package/react-toastify)**: A React library for adding toast notifications to applications.
- **[typescript](https://www.npmjs.com/package/typescript)**: A superset of JavaScript that adds static typing to the language.
- **[web-vitals](https://www.npmjs.com/package/web-vitals)**: A library for tracking Web Vitals metrics.
- **[yup](https://www.npmjs.com/package/yup)**: A library for schema-based form validation.

## Conclusion

Overall I think the BuzzByte project turned out pretty well. If you have any questions feel free to send me a email: hendrik.metsallik@gmail.com

