import * as dotenv from 'dotenv'
import { GoogleGenerativeAI, GenerativeModel, GenerateContentResult } from "@google/generative-ai";
import { error } from 'console';

export interface AIProvider {
    requestComponents(centralComponent: string): Promise<AIResult>
}

export interface AIResult {
    type: AIResultType
}

export enum AIResultType {
    Success,
    Error
}

export interface AISuccess extends AIResult {
    type: AIResultType.Success
    solution: string
}

export interface AIError extends AIResult {
    type: AIResultType.Error
    error: any
}

export class GeminiAIProvider implements AIProvider {

    private generativeService: GoogleGenerativeAI
    private model: GenerativeModel

    constructor() {
        dotenv.config()
        const key: string = process.env.GEMINI_API_KEY || (
            () =>  {
                throw new Error("Gemini key not found in .env")
            }
        )()
        this.generativeService = new GoogleGenerativeAI(key)
        this.model = this.generativeService.getGenerativeModel({ model: "gemini-pro"})
    }

    async requestComponents(centralComponent: string): Promise<AIResult> {
        const prompt = `Tell me other compatible components with ${centralComponent}`
        try  {
            const result: GenerateContentResult = await this.model.generateContent(prompt)
            const text = result.response.text()
            const success: AISuccess = {
                type: AIResultType.Success,
                solution: text
            }
            return success
            
        } catch(error) {
            const aiError: AIError = {
                type: AIResultType.Error,
                error: error
            }
            return aiError
        }  
    }
    
}