import {server, startServer} from '../../src/server/ServerProvider'
import { AIProvider } from '../../src/ai/AIProvider'
import {ExpressHomeRoutes} from '../../src/routes/HomeRoutes'
import { MockAIProvider } from '../MockAIProvider'
import request from 'supertest'

let homeRoutes: ExpressHomeRoutes
let aiProvider: AIProvider

beforeEach(()=> {
    aiProvider = new MockAIProvider()
    homeRoutes = new ExpressHomeRoutes(server, aiProvider)
    homeRoutes.startRoutes()
})

describe("ExpressHomeRoutes GET /", ()=> {
    it("Should return SERVER IS RUNNING", async () => {
        const response = await request(server).get("/")
        expect("SERVER IS RUNNING please navigate by writting your component in the url bar. For example /AMD RYZEN 5 4500").toEqual(response.text)
    })
})

describe("ExpressHomeRoutes GET / plus any search", ()=> {
    it("Should return search plus solution", async () => {
        const response = await request(server).get("/AMD%20RYZEN%205%204500")
        expect("You searched: AMD RYZEN 5 4500 AI SOLUTION").toEqual(response.text)
    })
})