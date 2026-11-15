# WEBD 172 — homework10-mongoose-course-api

This project demonstrates:

**Schema → Model → Documents → CRUD → Express API**

## Setup

1. Make sure MongoDB is running locally.
2. Copy `.env.example` to `.env`.
3. Run `npm install`.
4. Run `npm run seed`.
5. Run `npm run dev`.

Open:

`http://localhost:3000`

## Layout Structure

```text
homework10-mongoose-course-api/
├── .env
├── package.json
├── package-lock.json
├── README.md
├── server.js
├── seed.js
└── models/
  └── Course.js
```

- [server.js](server.js): Express app, MongoDB connection, and CRUD routes
- [models/Course.js](models/Course.js): Mongoose schema and model definition
- [seed.js](seed.js): starting course data and database seeding script
- [.env](.env): environment variables (`MONGODB_URI`, `PORT`)

## API Endpoints

### GET /api/courses

Returns all courses.

### GET /api/courses/:id

Returns one course by MongoDB `_id`.

### POST /api/courses

Creates a course.

Example body:

```json
{
  "title": "Kris' awesome course",
  "department": "WEBD",
  "units": 4,
  "delivery": "Hybrid",
  "description": "lerning the Kris way."
}
```

### PUT /api/courses/:id

Updates a course.

### DELETE /api/courses/:id

Deletes a course.

## Test the API

After starting the server, test each route in Postman.

- `GET http://localhost:3000/api/courses` → returns an array of courses
- `POST http://localhost:3000/api/courses` → creates a course (expect `201`)
- `GET http://localhost:3000/api/courses/<courseId>` → returns one course by `_id`
- `PUT http://localhost:3000/api/courses/<courseId>` → updates and returns the course
- `DELETE http://localhost:3000/api/courses/<courseId>` → deletes and returns success message

Expected status codes:

- `200` for successful GET/PUT/DELETE
- `201` for successful POST
- `400` for invalid IDs or invalid input
- `404` when a course is not found

## Core Mongoose Methods

- `Course.create()`
- `Course.find()`
- `Course.findById()`
- `Course.findByIdAndUpdate()`
- `Course.findByIdAndDelete()`

## Create the Course Schema and Model

1. Create [models/Course.js](models/Course.js)
2. Define a `courseSchema` with required fields
3. Create the `Course` model from the schema
4. Export the model for use in routes and seed scripts

```javascript
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  units: { type: Number, required: true, min: 1, max: 6 },
  delivery: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
```

## Create Starting Data

Add starter course records in [seed.js](seed.js), then run the seed script.

```javascript
const courses = [
  {
    title: "HTML and CSS",
    department: "WEBD",
    units: 3,
    delivery: "In-Person",
    description: "Beginning web page development.",
  },
  {
    title: "JavaScript for Web Development",
    department: "WEBD",
    units: 3,
    delivery: "Online",
    description: "Client-side JavaScript fundamentals.",
  },
  {
    title: "Full Stack JavaScript",
    department: "WEBD",
    units: 3,
    delivery: "Hybrid",
    description: "Node, Express, React, MongoDB, and full-stack development.",
  },
];
```

Seed command:

```bash
npm run seed
```

## Read Course Data

Use these routes to read course documents from MongoDB:

- `GET /api/courses` → returns all course records
- `GET /api/courses/:id` → returns one course by MongoDB `_id`

Mongoose methods used in [server.js](server.js):

```javascript
// Read all courses
const courses = await Course.find();

// Read one course by id
const course = await Course.findById(req.params.id);
```

Example request URLs:

- `http://localhost:3000/api/courses`
- `http://localhost:3000/api/courses/<courseId>`

## Update a Course

Use this route to update an existing course document:

- `PUT /api/courses/:id`

Mongoose method used in [server.js](server.js):

```javascript
const updatedCourse = await Course.findByIdAndUpdate(
  req.params.id,
  {
    title: req.body.title,
    department: req.body.department,
    units: req.body.units,
    delivery: req.body.delivery,
    description: req.body.description,
  },
  {
    new: true,
    runValidators: true,
  },
);
```

Example request URL:

- `http://localhost:3000/api/courses/<courseId>`

Example request body:

```json
{
  "title": "Full Stack JavaScript II",
  "department": "WEBD",
  "units": 4,
  "delivery": "Hybrid",
  "description": "Advanced full-stack JavaScript topics."
}
```

## Delete a Course

Use this route to delete an existing course document:

- `DELETE /api/courses/:id`

Mongoose method used in [server.js](server.js):

```javascript
const deletedCourse = await Course.findByIdAndDelete(req.params.id);
```

Example request URL:

- `http://localhost:3000/api/courses/<courseId>`

Example success response:

```json
{
  "message": "Course deleted successfully",
  "course": {
    "_id": "<courseId>",
    "title": "Full Stack JavaScript",
    "department": "WEBD",
    "units": 3,
    "delivery": "Hybrid",
    "description": "Node, Express, React, MongoDB, and full-stack development."
  }
}
```

## Course Schema Fields

The `Course` model currently includes these fields:

- `title` (String, required)
- `department` (String, required)
- `units` (Number, required)
- `delivery` (String, required)
- `description` (String, optional)

## Relationship: Schema, Model, Documents, Routes

- **Schema** ([models/Course.js](models/Course.js)): defines the structure and validation rules.
- **Model** (`Course`): created from the schema and provides Mongoose CRUD methods.
- **Documents**: actual course records stored in MongoDB.
- **Express routes** ([server.js](server.js)): call model methods to create/read/update/delete documents.

Route-to-method mapping:

- `GET /api/courses` → `Course.find()`
- `GET /api/courses/:id` → `Course.findById()`
- `POST /api/courses` → `Course.create()`
- `PUT /api/courses/:id` → `Course.findByIdAndUpdate()`
- `DELETE /api/courses/:id` → `Course.findByIdAndDelete()`

## Suggested Demo Flow

1. Open `models/Course.js`.
2. Explain the schema.
3. Explain the model.
4. Seed the database.
5. Test GET all.
6. Copy one `_id`.
7. Test GET one.
8. POST a new course.
9. PUT an update.
10. DELETE the course.

## Mental Model

```text
Schema defines it
      ↓
Model works with it
      ↓
MongoDB stores it
      ↓
Express exposes it
```

The project stays intentionally small so the focus remains on Mongoose.

## Verification Checklist

- ✅ Express server is running from [server.js](server.js)
- ✅ MongoDB connection uses `MONGODB_URI` from [.env](.env)
- ✅ Mongoose schema/model are defined in [models/Course.js](models/Course.js)
- ✅ CRUD routes use Mongoose methods in [server.js](server.js)
- ✅ Seed data is loaded from [seed.js](seed.js) with `npm run seed`
- ✅ Course records are persisted in MongoDB (data remains after reconnect)
- ✅ API routes return JSON responses with appropriate HTTP status codes

Quick check commands:

```bash
npm run seed
npm run dev
```

Sample successful seed output:

```text
> homework10-mongoose-course-api@1.0.0 seed
> node seed.js

◇ injected env (2) from .env // tip: ⌘ custom filepath { path: '/custom/path/.env' }
Database seeded successfully
```

## Proof of MongoDB Connection (Verified)

Connection test was executed using Mongoose and `.env` configuration.

Findings:

- `MongoDB connected: true`
- `Database name: mongooseCourseDemo`
- `Course documents: 3`

Recorded command output:

```text
MongoDB connected: true
Database name: mongooseCourseDemo
Course documents: 3
```
