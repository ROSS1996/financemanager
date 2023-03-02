export default function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        action="/send-data-here"
        method="post"
        className="flex flex-col gap-2 items-center w-min border justify-center p-4 border-gray-600 rounded"
      >
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="font-medium cursor-pointer text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-400 px-2 py-1 rounded-sm"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="password"
            className="font-medium cursor-pointer text-sm"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-400 px-2 py-1 rounded-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-2 py-1 rounded active:bg-blue-700 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
