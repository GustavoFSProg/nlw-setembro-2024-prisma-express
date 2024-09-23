// biome-ignore lint/style/useImportType: <explanation>
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createGoals(req: Request, res: Response) {
  try {
    const goals = await prisma.goals.create({
      data: {
        title: req.body.title,
        desiredWeeklyFrequency: Number(req.body.desiredWeeklyFrequency),
      },
    })

    return res.status(201).send({ msg: 'Sucesso!', goals })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

async function getGoals(req: Request, res: Response) {
  try {
    const goals = await prisma.goals.findMany()

    console.log(` Goals: ${goals.length}`)

    return res.status(201).send(goals)
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!', error })
  }
}

export default { createGoals, getGoals }
