☁️ Responsive Weather App

Live Demo: [Weather App Demo](https://aseweatherapp.netlify.app)

This is a clean, single-page application built with React and styled with Tailwind CSS to fetch and display current weather data and a 5-day forecast for any city worldwide using the OpenWeatherMap API.

The application features a modern, responsive design that looks great on both mobile and desktop screens, leveraging a "frosted glass" effect for aesthetics.

## ✨ Features
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

## 🛠️ Technologies Used
Framework: React (Functional Components and Hooks)

Styling: Tailwind CSS (for all responsive and aesthetic styling)

Data Source: OpenWeatherMap API

## 🚀 Setup and Usage
Prerequisites
A React environment where the single App.jsx file can be executed.

Installation & Run
Clone or Copy: Copy the contents of the App.jsx file into your local React project's App.jsx.

API Key: The application uses environment variables for security.

Run: Start your React development server.

# Example for a typical React setup
npm install 
npm run dev

How to Use
Search: Use the input field at the top of the card to type the name of a city (e.g., Tokyo, Paris, New York).

Submit: Click the Search button or press Enter.

View Results: The current weather conditions and the 5-day forecast will be displayed in the card.

Persistence: If you refresh the page, the weather for the last successfully searched city will be displayed automatically.

## 🔑 Security Note
Important: The OpenWeatherMap API key is currently hardcoded in App.jsx. For any real-world deployment, you should always handle API keys securely using environment variables (process.env.REACT_APP_API_KEY) and server-side fetching where applicable.

## 💡 Assumptions and Design Choices
Design Choices
Styling Paradigm (Tailwind CSS): All CSS styling was migrated from embedded <style> blocks to Tailwind utility classes directly in the JSX. This ensures maximum responsiveness and makes the component fully portable and themeable.

Aesthetics: A "frosted glass" design approach (bg-white/20 backdrop-blur-lg) was used, sitting on a colorful indigo gradient background, providing a modern and appealing look.

Units: Temperature is displayed in Celsius (°C), and Wind Speed is converted to km/h (based on the units=metric API setting) for clarity.

Technical Assumptions
API Key Handling: The OpenWeatherMap API key is hardcoded into App.jsx for the single-file Canvas demonstration. Assumption: This is purely for demonstration, and a production environment would use environment variables or a secure backend proxy.

Forecast Filtering: The 5-day forecast data is returned in 3-hour intervals (40 total entries). Assumption: The filtering logic (index % 8 === 0) correctly selects one entry per day for a clean, daily forecast view.


