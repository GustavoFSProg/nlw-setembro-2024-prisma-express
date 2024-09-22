// import fastify from 'fastify'
// import fastifyCors from '@fastify/cors'
// biome-ignore lint/style/useImportType: <explanation>
import express, { Request, Response } from 'express'
import cors from 'cors'

import dotenv from 'dotenv'

// import { getGoals } from './functions/create-goal'
// import { getWeekSummary } from './app/get-week-summary'
// import { createGoal } from './app/create-goal'
// import { getWeekPendingGoals } from './app/get-week-pending-goals'
// import { createGoalCompletion } from './app/create-goal-completion'
import { getGoals } from './src/functions/create-goal'
import { getWeekSummary } from './src/app/get-week-summary'
import { createGoal } from './src/app/create-goal'
import { getWeekPendingGoals } from './src/app/get-week-pending-goals'
import { createGoalCompletion } from './src/app/create-goal-completion'

dotenv.config()

const app = express()

const { PORT } = process.env

app.use(
  cors({
    origin: ['*', 'http://localhost:5173', 'https://nlw-in-orbit.netlify.app'],
  })
)
app.use(express.json())

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
