# WEBD 172 Week 6 User Directory

## Assignment Name

WEBD 172 - Homework 6: User Directory (React) via Completed React-only Task Manager example template.

## Features of the Project

- Displays a user directory with filters: `all`, `active`, `completed`
- Adds new users through a controlled form
- Generates a fictitious `email` and `company` for newly added users
- Uses a reusable `UserCard` component to display selected user details
- Auto-checks the selected user in the directory when user info is found
- Uses local users first, then API users for lookup

## Concepts demonstrated

- Function components
- JSX and props
- useState
- useEffect
- Controlled forms
- Event handling
- Lifting state
- Passing functions through props
- Add with spread syntax
- Update with map()
- Delete with filter()
- Derived data
- All / Active / Completed filtering
- Conditional rendering

## Available Routes

- `/` - Main single-page user directory application

## Data Routes

- `https://jsonplaceholder.typicode.com/users` - External users data source

## Example Route Output

Example object returned from `https://jsonplaceholder.typicode.com/users`:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "email": "Sincere@april.biz",
  "company": {
    "name": "Romaguera-Crona"
  }
}
```

## Front-End Behavior

- `useEffect()` loads API users on mount in `UserCard`
- `useState()` stores local users, API users, input state, and selected user state
- Search input uses controlled state with `value` and `onChange`
- Clicking **Get User Info** finds a matching user and shows Name, Email, and Company name
- Adding a user updates directory state immediately
- Refreshing the page resets locally added users

## Project Structure

- `index.html`
- `package.json`
- `README.md`
- `instructions.md`
- `vite.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/api.js`
- `src/styles.css`
- `src/components/Header.jsx`
- `src/components/UserForm.jsx`
- `src/components/UserSummary.jsx`
- `src/components/UserFilter.jsx`
- `src/components/UserList.jsx`
- `src/components/User.jsx`
- `src/components/UserCard.jsx`
- `dist/` (generated build output)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Author

WEBD 172 Student-Phyllis Ferguson

## Intentional limitation

All task data still lives only in React state. Refreshing the browser resets the application.

That limitation leads directly into Week 7, when React begins communicating with Express.
