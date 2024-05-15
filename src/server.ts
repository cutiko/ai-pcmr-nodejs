import express, {Express, Request, Response} from 'express'
import { registerDependencies, injectHomeRoutes } from './di/DependencyInjection'
import { startServer } from './server/ServerProvider'
import { HomeRoutes } from './routes/HomeRoutes'

function startRoutes() {
    const homeRoutes: HomeRoutes = injectHomeRoutes()
    homeRoutes.startRoutes()
}

registerDependencies()
startRoutes()
startServer()