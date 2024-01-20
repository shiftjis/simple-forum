import { logger } from "@/server/logging"

export async function fetchWithStyle(input: string | URL | globalThis.Request, init?: RequestInit) {
    return await fetch(input, init).then((response) => {
        return response.json().then((body) => {
            if (response.status >= 400) {
                logger.error(body.header)
                return undefined
            }
            return body.payload
        }).catch((reason) => {
            logger.error(reason)
            return undefined
        })
    }).catch((reason) => {
        logger.error(reason)
        return undefined
    })
}
