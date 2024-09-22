
import express, { Request, Response } from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import GoalController from './Controllers/GoalController'
import GoalCompletionsControllerCopy from './Controllers/GoalCompletionsController copy'

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


app.get('/get-goals', GoalController.getGoals)
app.post('/goals', GoalController.createGoals)


app.get('/get-goals-completions', GoalCompletionsControllerCopy.getGoalsCompletions)
app.get('/get-one-goal/:id', GoalCompletionsControllerCopy.getOneGoal)
app.post('/completions', GoalCompletionsControllerCopy.createGoalsCompletions)



app.listen(PORT as string, () => {
  console.log(`💪 HTTP server running!!!: ${PORT}`)
})

export default app
