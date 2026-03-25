import SearchForm from "../../components/SearchForm";

export default function Page() {
   return (

      <div className="max-w-5xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Find a Github User</h1>
          <p className="text-base-content/60 mt-2">
            Search to view a user's profile, repos and activity
          </p>
        </div>
        <SearchForm />

      </div>
  )
}
