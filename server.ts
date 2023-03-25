import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const prisma = new PrismaClient()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("ok")
})

/* Project endpoints */

app.post("/api/v1/projects", async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: {
        title: req.body.title
      }
    })

    res.status(201).json({
      status: 201,
      message: `successfully create project ${project.id}`
    })
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

app.get("/api/v1/projects", async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany()

    if (!projects) {
      return res.status(400).json({
        status: 400,
        message: `error fetching all projects`
      })
    }

    res.status(200).json({
      status: 200,
      message: "successfully fetch all projects",
      data: projects
    })
  } catch(error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

app.get("/api/v1/projects/:projectId", async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.projectId
      },
      include: {
        form: true
      }
    })

    if (!project) {
      return res.status(400).json({
        status: 400,
        message: `error fetching project by id ${req.params.projectId}`
      })
    }

    res.status(200).json({
      status: 200,
      message: `successfully fetch project by project id ${project?.id}`,
      data: project
    })
  } catch(error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

/* Forms endpoint */

app.post("/api/v1/projects/:projectId/forms", async (req: Request, res: Response) => {
  try {
    const form = await prisma.form.create({
      data: {
        title: req.body.title,
        emailTo: req.body.emailTo,
        projectId: req.params.projectId
      },
      include: {
        project: true
      }
    })

    res.status(201).json({
      status: 201,
      message: `successfully create form ${form.id}`
    })
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

app.get("/api/v1/projects/:projectId/forms", async (req: Request, res: Response) => {
  try {
    const forms = await prisma.form.findMany({
      where: {
        projectId: req.params.projectId
      },
      include: {
        project: true
      }
    })

    if (!forms) {
      return res.status(400).json({
        status: 400,
        message: `error fetching forms by project id ${req.params.projectId}`
      })
    }

    res.status(200).json({
      status: 200,
      message: `successfully fetch all forms by project id ${req.params.projectId}`,
      data: forms
    })
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

app.get("/api/v1/forms/:formId", async (req: Request, res: Response) => {
  try {
    const form = await prisma.form.findUnique({
      where: {
        id: req.params.formId,
      },
      include: {
        project: true
      }
    })

    if (!form) {
      return res.status(400).json({
        status: 400,
        message: `error fetching form with ${req.params.formId}`
      })
    }

    res.status(200).json({
      status: 200,
      message: `successfully fetch form ${form.id}`,
      data: form
    })
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
})

app.listen(8080, () => {
  console.log("server is running on port 8080")
})
