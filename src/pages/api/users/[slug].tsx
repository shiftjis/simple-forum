import { NextApiRequest, NextApiResponse } from "next"
import { middleware, withMethods, withServerSession } from "next-pipe"

import { authOptions } from "../auth/[...nextauth]"
import { userToObject, wrapStyle } from "@/server/mapping"
import { prisma } from "@/server/database"

export default middleware<NextApiRequest, NextApiResponse>()
    .pipe(withServerSession(authOptions, true))
    .pipe(withMethods(({ get }) => {
        get().pipe(async (request, response, next, session) => {
            const uniqueId = request.query.slug as string
            const user = await prisma.user.findUnique({ where: { uniqueId: uniqueId } })
            if (user === null) {
                response.status(404).json(wrapStyle(404, "invalid request", null))
                return
            }

            const object = await userToObject(user)
            response.status(200).json(wrapStyle(200, "", object))
        })
    }))
