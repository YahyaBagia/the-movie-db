# **Movie App Solution**

This repository contains the source code for a **Movie App** built using modern technologies, tools, and best practices. The app is designed to provide an excellent user experience for exploring movies, fetching reviews, managing watchlists, and submitting ratings.

---

## **Features**

- **Trending Movies Dashboard**: Displays the latest trending movies.
- **Movie Details**: Includes movie descriptions, trailers, and reviews.
- **Watchlist Management**: Add or remove movies from a personal watchlist.
- **User Ratings**: Submit and view ratings for movies.
- **Responsive Design**: Fully functional on web, Android, and iOS platforms.

---

## **Technologies**

This project leverages the following technologies to provide a seamless and high-performance user experience:

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## **Packages**

Key packages used in the project include:

- [Expo Router](https://expo.github.io/router/docs) - Declarative navigation for React Native apps.
- [React Native Paper](https://callstack.github.io/react-native-paper/) - Material Design components for building polished UI.
- [Axios](https://axios-http.com/) - HTTP client for making API requests.
- [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist) - For global state management with persistence.
- [Luxon](https://moment.github.io/luxon/#/) - A powerful library for managing and formatting dates.

---

## **Concepts**

This app implements the following advanced concepts:

1. **Global State with Persistence**:  
   State management is handled with Redux Toolkit, ensuring the global state persists across app sessions using Redux Persist.

2. **Custom Hooks**:  
   Modular, reusable logic encapsulated into custom hooks for functionalities like fetching data and managing user interactions.

3. **Web Platform Support**:  
   Full support for the web platform using [Expo's Web Compatibility](https://docs.expo.dev/workflow/web/).

---

## **Installation**

To get started with the app, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   yarn || npm install
   ```

3. Start the app:

   ```bash
   yarn start
   ```

4. Launch the app on your device or emulator.
   - iOS: Press i in the terminal.
   - Android: Press a in the terminal
   - Press w in the terminal

---

## **Usage**

Create a .env file in the root directory with the following variables:

```bash
EXPO_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
EXPO_PUBLIC_TMDB_API_KEY=<YOUR_API_KEY>
EXPO_PUBLIC_TMDB_API_TOKEN=<YOUR_API_TOKEN>
```

The app will use the values from the .env file to make API requests. Make sure to replace `<YOUR_API_KEY>` and `<YOUR_API_TOKEN>` with your actual values.

---

## **Key Features in Action**

1. Watchlist Management: Utilize Redux and Axios to handle paginated watchlist data. Users can add, view, and remove movies from their watchlists seamlessly.
2. Ratings Integration: Submit and fetch user ratings for movies with interactive UI components.
3. Date Formatting with Luxon: Luxon ensures robust date formatting, such as displaying review dates in a user-friendly format (MMMM d, yyyy).
