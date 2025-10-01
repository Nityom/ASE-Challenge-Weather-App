☁️ Responsive Weather App

Live Demo: [Weather App Demo](https://aseweatherapp.netlify.app)

This is a clean, single-page application built with React and styled with Tailwind CSS to fetch and display current weather data and a 5-day forecast for any city worldwide using the OpenWeatherMap API.

The application features a modern, responsive design that looks great on both mobile and desktop screens, leveraging a "frosted glass" effect for aesthetics.

✨ Features
Core Functionality
City Search: Users can enter any city name to retrieve current weather conditions.

Real-time Data: Fetches the current temperature (in Celsius), weather condition (e.g., "Clear Sky," "Rain"), and an accompanying weather icon.

Detailed Metrics: Displays current Humidity and Wind Speed.

State Management: Uses React's built-in hooks (useState, useEffect) for efficient state management (data, loading, error).

Error Handling: Provides a clear, user-friendly error message if a city is not found or the API request fails.

Fully Responsive Design: The layout is built using a mobile-first approach with Tailwind CSS, ensuring optimal display on all devices.

Bonus Features
5-Day Forecast: Displays a concise 5-day temperature and condition outlook.

Persistent Search: Utilizes localStorage to save the last successfully searched city, which is loaded automatically when the application starts.

🛠️ Technologies Used
Framework: React (Functional Components and Hooks)

Styling: Tailwind CSS (for all responsive and aesthetic styling)

Data Source: OpenWeatherMap API

🚀 Setup and Usage
Prerequisites
A React environment where the single App.jsx file can be executed.

Installation & Run
Clone or Copy: Copy the contents of the App.jsx file into your local React project's App.jsx.

API Key: The application uses a hardcoded API key for demonstration purposes. In a production environment, this should be moved to environment variables for security.

Run: Start your React development server.

# Example for a typical React setup
npm install 
npm start

How to Use
Search: Use the input field at the top of the card to type the name of a city (e.g., Tokyo, Paris, New York).

Submit: Click the Search button or press Enter.

View Results: The current weather conditions and the 5-day forecast will be displayed in the card.

Persistence: If you refresh the page, the weather for the last successfully searched city will be displayed automatically.

🔑 Security Note
Important: The OpenWeatherMap API key is currently hardcoded in App.jsx. For any real-world deployment, you should always handle API keys securely using environment variables (process.env.REACT_APP_API_KEY) and server-side fetching where applicable.