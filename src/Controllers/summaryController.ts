// biome-ignore lint/style/useImportType: <explanation>
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import getGoalsCompletions from './GoalCompletionsController'

const prisma = new PrismaClient()

async function Summary(req: Request, res: Response) {
  try {
    const goals_completion = await prisma.goal_Completions.findMany()

    console.log(` Total: ${goals_completion.length}`)

    const goals_total = await prisma.goals.findMany()

    console.log(` Goals: ${goals_total.length}`)

    return res.status(201).send({ goals_completion, goals_total })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

export default { Summary }
