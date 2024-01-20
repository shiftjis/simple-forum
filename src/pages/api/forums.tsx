import { NextApiRequest, NextApiResponse } from "next"
import { middleware, withMethods, withServerSession } from "next-pipe"

import { authOptions } from "./auth/[...nextauth]"
import { forumsToObjects, wrapStyle } from "@/server/mapping"
import { prisma } from "@/server/database"

export default middleware<NextApiRequest, NextApiResponse>()
    .pipe(withServerSession(authOptions, true))
    .pipe(withMethods(({ get, post }) => {
        get().pipe(async (request, response, next, session) => {
            const forums = await prisma.forum.findMany({
                orderBy: { createdAt: "desc" }
            })

            if (forums.length === 0) {
                response.status(200).json(wrapStyle(404, "フォーラムが一つも見つかりませんでした", null))
                return
            }

            const objects = await forumsToObjects(forums)
            response.status(200).json(wrapStyle(200, "", objects))
        })

        post().pipe(async (request, response, next, session) => {
            if (request.body === undefined) {
                response.status(400).json(wrapStyle(400, "無効なリクエストボディー", null))
                return
            }

            response.status(200).json(wrapStyle(200, "", null))
        })
    }))
