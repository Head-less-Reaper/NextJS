export default async function UserProfilePage({params}:{params:Promise<{id:any}>}) {
    const {id} = await params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page
                <span className="p-2 rounded bg-amber-600">{id}</span>
            </p>
        </div>
    )
}