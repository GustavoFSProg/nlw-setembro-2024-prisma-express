import { getWeekPendingGoals } from '../../app/get-week-pending-goals'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import cors from 'cors'

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', {}, async () => {
    const { pendingGoals } = await getWeekPendingGoals()

    return { pendingGoals }
  })
}
