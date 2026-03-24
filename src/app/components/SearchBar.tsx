export default function SearchBar() {
    return (
                <div>
                    <label className="label font-bold mx-3">Github Username </label>
                    <div className="join">
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="input join-item flex-1"
                        />

                        <button type="submit" className="btn bg-black text-white join-item">
                            Search
                        </button>
                    </div>
                </div>
    )
}