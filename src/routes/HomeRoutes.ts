import {Express, Request, Response} from 'express'
import { AIProvider, AISuccess, AIError, AIResultType } from '../ai/AIProvider'

export interface HomeRoutes {
    home(): any
    components(): any
    startRoutes(): any
}

export class ExpressHomeRoutes implements HomeRoutes {
    
    private server: Express
    private aiProvider: AIProvider

    constructor(server: Express, aiProvider: AIProvider) {
        this.server = server
        this.aiProvider = aiProvider
    }

    home() {
        this.server.get("/", (request: Request, response: Response) => {
            response.send("SERVER IS RUNNING please navigate by writting your component in the url bar. For example /AMD RYZEN 5 4500")
        })
    }

    components() {
        this.server.get("/*", (request: Request, response: Response) => {
            const encodedComponent: string = request.path.replace("/", "")
            const component: string = decodeURIComponent(encodedComponent)
            this.aiProvider.requestComponents(component).then(result => {
                if (result.type == AIResultType.Success) {
                    const success = result as AISuccess
                    const formattedText = `You searched: ${component} ${success.solution}`
                    response.send(formattedText)
                } else {
                    const error = result as AIError
                    response.send(error.error)
                }
            })
        })
    }

    startRoutes() {
        this.home()
        this.components()
    }

}