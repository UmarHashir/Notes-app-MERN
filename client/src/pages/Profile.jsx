import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-md">

        {/* Avatar */}
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {user?.name?.charAt(0)}
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold">
          {user?.name}
        </h2>

        {/* Email */}
        <p className="text-slate-400">
          {user?.email}
        </p>

      </div>
    </div>
  );
}

export default Profile;