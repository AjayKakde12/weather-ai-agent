# Weather Agent

A simple AI agent built with Google ADK that provides current weather information for any city.

## What This Agent Does

This agent can tell you the current temperature in Celsius for any city you specify. It uses the WeatherAPI service to fetch real-time weather data and responds with the temperature information.

## Features

- Get current temperature for any city
- Built with Google ADK for AI agent functionality
- Uses WeatherAPI for accurate weather data
- Simple and easy-to-use interface

## Prerequisites

- Node.js (v20 or higher)
- npm
- WeatherAPI key (get one from [weatherapi.com](https://www.weatherapi.com/))
- Gemini API key (get one from https://aistudio.google.com/api-keys)

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your WeatherAPI key and Gemini API Key:
   ```
   GEMINI_API_KEY=your_api_key_here
   WEATHER_API_KEY=your_api_key_here
   ```

## Usage

### Build the Project

First, compile the TypeScript code:

```bash
npm run build
```

### Run the Agent

To run the agent in development mode:

```bash
npm run dev
```

### Open the Web UI

After building, open the web interface:

```bash
npm run web
```

This will launch a web-based UI where you can interact with the weather agent.

## Example Interaction

You can ask the agent: "What's the temperature in New York?" and it will respond with the current temperature.

## Project Structure

```
weather-agent/
├── agent.ts                     # Main agent implementation
├── agent.js                     # Compiled JavaScript file
├── agent.d.ts                   # TypeScript declaration file
├── types/
│   ├── response.interface.ts    # TypeScript interfaces for API responses
│   ├── response.interface.js    # Compiled JavaScript file
│   └── response.interface.d.ts  # TypeScript declaration file
├── .env                         # Environment variables (create this)
├── .env.example                 # Example environment file
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## API Used

- [WeatherAPI](https://www.weatherapi.com/) - For weather data
- [Google ADK](https://github.com/google/adk) - For AI agent framework