import { NextApiRequest, NextApiResponse } from "next"
import { middleware, withMethods, withServerSession } from "next-pipe"

import { authOptions } from "./auth/[...nextauth]"
import { wrapStyle } from "@/server/mapping"

export default middleware<NextApiRequest, NextApiResponse>()
    .pipe(withServerSession(authOptions, true))
    .pipe(withMethods(({ get, post }) => {
        get().pipe(async (request, response, next, session) => {
            response.status(200).json(wrapStyle(200, "", null))
        })

        post().pipe(async (request, response, next, session) => {
            if (request.body === undefined) {
                response.status(400).json(wrapStyle(400, "無効なリクエストボディー", null))
                return
            }

            response.status(200).json(wrapStyle(200, "", null))
        })
    }))
