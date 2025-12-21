import { FunctionTool, LlmAgent } from '@google/adk'
import { z } from 'zod'
import * as dotenv from 'dotenv';
import { WeatherAPIResponseInterface } from "./types/response.interface";
dotenv.config();

const getCityWeather = new FunctionTool({
    name: 'get_current_weather',
    description: 'Returns the temperature of specified city in Celcius',
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
    instruction: 'You are a helpful agent that provides current temperature information for a specified city using the get_current_time function.',
    tools: [getCityWeather],
})

