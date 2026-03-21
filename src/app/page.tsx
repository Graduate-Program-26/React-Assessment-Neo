import LoginForm from "./components/login-form";

export default function Page() {
    return (
        <main className="pt-10">
            <h1 className="text-2xl text-center">
                Github Personal Dashboard
            </h1>
            
            <LoginForm />
        </main>
    )
}