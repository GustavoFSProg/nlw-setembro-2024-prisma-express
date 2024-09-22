// biome-ignore lint/style/useImportType: <explanation>
import { Request, Response } from 'express'
import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

// export async function createGoal({
//   title,
//   desiredWeeklyFrequency,
// }: CreateGoalRequest) {
//   const [goal] = await db
//     .insert(goals)
//     .values({
//       title,
//       desiredWeeklyFrequency,
//     })
//     .returning()

//   return { goal }
// }

export async function createGoal(req: Request, res: Response) {
  const [goal] = await db
    .insert(goals)
    .values({
      title: req.body.title,
      desiredWeeklyFrequency: req.body.desiredWeeklyFrequency,
    })
    .returning()
  return res.send({ goalId: goal.id })
  // return { goal }
}
