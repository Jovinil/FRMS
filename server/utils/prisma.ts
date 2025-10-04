// use this for production
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'

// export const prisma = new PrismaClient().$extends(withAccelerate())


// use this for developement
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

