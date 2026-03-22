import LoginForm from "./components/LoginForm";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold tracking-tight">
        My Github Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your GitHub activity in one place
      </p>

      <LoginForm />
    </main>
  );
}
