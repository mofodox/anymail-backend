# AnyMail Backend

This is a the backend server for AnyMail. One stop solution for forms.

## Get Started

1. Clone the project
2. `npm install` all the dependencies
3. Rename `.env.sample` to `.env` and replace the content in the file
4. Run `npx prisma migrate dev`
5. Run `npx prisma generate`
6. Run the server `npm run dev`

## Stack

1. Typescript
2. Express
3. Prisma
4. Docker

## Available Endpoints

| Method | URL Pattern                       | Action                        |
| ------ | --------------------------------- | ----------------------------- |
| POST   | /api/v1/projects                  | Create a Project              |
| GET    | /api/v1/projects                  | Fetch all Projects            |
| GET    | /api/v1/projects/:projectId       | Fetch a Project By ID         |
| POST   | /api/v1/projects/:projectId/forms | Create a Form By Project ID   |
| GET    | /api/v1/projects/:projectId/forms | Fetch all Forms By Project ID |
| GET    | /api/v1/forms/:formId             | Fetch Form By Form ID         |

## Contributor

1. [Khairul Akmal](https://twitter.com/mofodox)
