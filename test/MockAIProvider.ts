import { AIProvider, AIResult, AIResultType, AISuccess } from "../src/ai/AIProvider";

export class MockAIProvider implements AIProvider {

    requestComponents(centralComponent: string): Promise<AIResult> {
        const success: AISuccess = {
            type: AIResultType.Success,
            solution: "AI SOLUTION"
        }
        return Promise.resolve(success)
    }

}