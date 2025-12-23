import { FunctionTool, LlmAgent, InMemoryMemoryService, Runner } from '@google/adk'
import { Content } from '@google/genai'
import { z } from 'zod'
import * as dotenv from 'dotenv';
import { WeatherAPIResponseInterface } from "./types/response.interface";
dotenv.config();

const getCityWeather = new FunctionTool({
    name: 'get_current_weather',
    description: `Returns a JSON object containing weather information.
                    Includes a 'status' key ('success' or 'error').
                    If 'success' includes a 'report' key with weather details.
                    If 'error', includes an 'error_message' key.`,
    parameters: z.object({
        city: z.string().describe('The name of the city for which to retrieve the teperature')
    }) as any,
    execute: async ({ city }) => {
        const WEATHER_API_KEY = process.env.WEATHER_API_KEY
        const URL = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`
        const data: WeatherAPIResponseInterface = await fetch(URL).then(res => res.json());
        if (data?.current?.temp_c !== undefined)
            return {
                status: 'success',
                report: `The current temperature in ${city} is ${data.current.temp_c}°C`
            }
        return {
            status: 'error',
            report: `Could not retrieve temperature for ${city}`
        }
    }
})

export const rootAgent = new LlmAgent({
    name: 'weather_agent',
    model:'gemini-2.5-flash',
    description: 'An agent that provides current temperature information for a specified city.',
    instruction: `You are a helpful weather assistant.
        When the user asks for the weather in a specific city, use the get_current_weather tool to fetch the temperature information.
        If the tool returns an error, inform the user politely.
        If the tool is successful, present the weather report clearly to the user.`,
    tools: [getCityWeather],
})

