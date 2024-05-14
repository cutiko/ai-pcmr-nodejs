import { server } from '../server/ServerProvider'
import express, {Express, Request, Response} from 'express'

export interface HomeRoutes {
    home(): any
    startRoutes(): any
}

export class ExpressHomeRoutes implements HomeRoutes {
    
    private server: Express

    constructor(server: Express) {
        this.server = server
    }

    static builder = (): HomeRoutes => {
        return new ExpressHomeRoutes(server)
    }

    home() {
        this.server.get("/", (request: Request, response: Response) => {
            response.send("SERVER IS RUNNING")
        })
    }

    startRoutes() {
        this.home()
    }

}