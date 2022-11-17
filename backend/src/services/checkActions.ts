import { Application } from 'express'

// ─── Loop Through Actions And Check If They Were Triggered ───────────────────

export default async (app: Application) => {
  try {
    const areas = app.get('areas')

    for (const area of areas) {
      await area.action.service(area)
    }
  } catch (err: unknown) {
    console.error(err)
  }
}
