import { NextApiRequest, NextApiResponse } from "next"
import { middleware, withMethods, withServerSession } from "next-pipe"

import { authOptions } from "../auth/[...nextauth]"
import { prisma } from "@/server/database"
import { wrapStyle } from "@/server/mapping"

export default middleware<NextApiRequest, NextApiResponse>()
    .pipe(withServerSession(authOptions, true))
    .pipe(withMethods(({ get }) => {
        get().pipe(async (request, response, next, session) => {
            const uniqueId = request.query.slug as string
            const forum = await prisma.forum.findUnique({ where: { uniqueId: uniqueId } })
            response.status(200).json(wrapStyle(200, "", forum))
        })
    }))
