import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(auth)/_layout/login')({
  component: Login,
})

function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
