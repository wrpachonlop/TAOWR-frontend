export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="mb-6 text-lg text-gray-600">
        You do not have permission to view this page.
      </p>
      <a
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Return to Login
      </a>
    </div>
  );
}
