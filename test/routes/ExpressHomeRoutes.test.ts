import {server, startServer} from '../../src/server/ServerProvider'
import {ExpressHomeRoutes} from '../../src/routes/HomeRoutes'
import request from 'supertest'

let homeRoutes: ExpressHomeRoutes

beforeEach(()=> {
    homeRoutes = new ExpressHomeRoutes(server)
    homeRoutes.startRoutes()
})

describe("ExpressHomeRoutes GET /", ()=> {
    it("Should return SERVER IS RUNNING", async () => {
        const response = await request(server).get("/")
        expect("SERVER IS RUNNING").toEqual(response.text)
    })
})