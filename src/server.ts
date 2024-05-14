import express, {Express, Request, Response} from 'express'
import { server, startServer } from './server/ServerProvider'
import { HomeRoutes, ExpressHomeRoutes } from './routes/HomeRoutes'

function startRoutes() {
    const homeRoutes: HomeRoutes = ExpressHomeRoutes.builder()
    homeRoutes.startRoutes()
}

startRoutes()
startServer()