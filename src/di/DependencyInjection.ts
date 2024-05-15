import * as awilix from 'awilix'
import {server} from '../server/ServerProvider'
import {Express} from 'express'
import { AIProvider, GeminiAIProvider } from '../ai/AIProvider'
import { ExpressHomeRoutes, HomeRoutes } from '../routes/HomeRoutes'

const dependenciesContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true
})

function provideServer(): Express {
    return server
}

function aiProvider(): AIProvider {
    return new GeminiAIProvider()
}

function homeRoutes(): HomeRoutes {
    const server: Express = dependenciesContainer.resolve('server')
    const aiProvider: AIProvider = dependenciesContainer.resolve('aiProvider')
    return new ExpressHomeRoutes(server, aiProvider)
}

export function injectHomeRoutes(): HomeRoutes {
    return dependenciesContainer.resolve('homeRoutes')
}

export const registerDependencies = () => {
    dependenciesContainer.register({
        server: awilix.asFunction(provideServer),
        aiProvider: awilix.asFunction(aiProvider),
        homeRoutes: awilix.asFunction(homeRoutes)
    })
}