import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createGoalsCompletions(req: Request, res: Response) {
  try {
    const goals = await prisma.goal_Completions.create({
      data: {
        goalId: req.body.goalId,
      },
    })

    return res.status(201).send({ msg: 'Sucesso!', goals })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

async function getGoalsCompletions(req: Request, res: Response) {
  try {
    const goals = await prisma.goal_Completions.findMany()

    return res.status(201).send(goals)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

async function getOneGoal(req: Request, res: Response) {
  try {
    const goals = await prisma.goal_Completions.findMany({
      where: { goalId: req.params.id },
    })

    // // biome-ignore lint/correctness/noUnreachable: <explanation>
    // for (let x = 0; x <= 2; x++) {
    //   let count = 0
    //   count = count + 1
    //   return console.log(x)
    // }

    console.log(goals.length)

    return res.status(201).send(goals)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

export default { createGoalsCompletions, getOneGoal, getGoalsCompletions }
