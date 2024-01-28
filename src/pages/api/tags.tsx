import { NextApiRequest, NextApiResponse } from "next"
import { middleware, withMethods, withServerSession } from "next-pipe"

import { authOptions } from "./auth/[...nextauth]"
import { tagsToObjects, wrapStyle } from "@/server/mapping"
import { prisma } from "@/server/database"

export default middleware<NextApiRequest, NextApiResponse>()
    .pipe(withServerSession(authOptions, true))
    .pipe(withMethods(({ get, post }) => {
        get().pipe(async (request, response, next, session) => {
            const tags = await prisma.tag.findMany()
            if (tags.length === 0) {
                response.status(200).json(wrapStyle(404, "No tags found", null))
                return
            }

            const objects = tagsToObjects(tags)
            response.status(200).json(wrapStyle(200, "", objects))
        })

        post().pipe(async (request, response, next, session) => {
            if (request.body === undefined) {
                response.status(400).json(wrapStyle(400, "invalid request body", null))
                return
            }

            response.status(200).json(wrapStyle(200, "", null))
        })
    }))
