// import fastify from 'fastify'
// import fastifyCors from '@fastify/cors'
// biome-ignore lint/style/useImportType: <explanation>
import express, { Request, Response } from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import { createGoalRoute } from './http/routes/create-goal'
import { createGoalCompletionRoute } from './http/routes/create-goal-completion'
import { getWeekSummaryRoute } from './http/routes/get-week-summary'
import { getWeekPendingGoalsRoute } from './http/routes/get-week-pending-goals'
import { viewGoals } from './http/routes/get-goals'
import { getGoals } from './functions/create-goal'
import { getWeekSummary } from './app/get-week-summary'
import { createGoal } from './app/create-goal'
import { getWeekPendingGoals } from './app/get-week-pending-goals'
import { createGoalCompletion } from './functions/create-goal-completion'
import { db } from './db'
import { goalCompletions, goals } from './db/schema'
// import { createGoalCompletion } from './app/create-goal-completion'
// import { client, db } from '../db'
// import { goals } from './schema'
// import { fakerPT_BR as faker } from '@faker-js/faker'
// import { goalCompletions } from './schema/goal-completions'

dotenv.config()

const app = express()

const { PORT } = process.env

app.use(
  cors({
    origin: ['*', 'http://localhost:5173', 'https://nlw-in-orbit.netlify.app'],
  })
)
app.use(express.json())

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
}

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ msg: 'Api Running Fine!!' })
})
// app.setValidatorCompiler(validatorCompiler)
// app.setSerializerCompiler(serializerCompiler)
app.get('/get-goals', async (request, response) => {
  const { result } = await getGoals()
  return response.status(201).send({ msg: result })
})

app.get(
  '/summary',

  async (req: Request, res: Response) => {
    const { summary } = await getWeekSummary()

    return res.send({ summary })
  }
)

app.post(
  '/goals',

  //  (req: Request, res: Response) => {
  // const { title, desiredWeeklyFrequency } = req.body

  createGoal

  // }
)

app.get(
  '/pending-goals',
  cors({
    origin: ['http://localhost:5173', 'https://nlw-in-orbit.netlify.app'],
  }),
  async (req: Request, res: Response) => {
    const { pendingGoals } = await getWeekPendingGoals()

    return res.send({ pendingGoals })
  }
)

app.post(
  '/completions',

  async (req: Request, res: Response) => {
    const { goalId } = req.body

    const { goalCompletion } = await createGoalCompletion({
      goalId,
    })

    return { goalCompletionId: goalCompletion.id }
  }
)

// app.route(createGoalRoute)
// app.route(createGoalCompletionRoute)
// app.route(getWeekSummaryRoute)
// app.route(getWeekPendingGoalsRoute)
// app.route(viewGoals)

app.listen(PORT as string, () => {
  console.log(`💪 HTTP server running!!!: ${PORT}`)
})

export default app
