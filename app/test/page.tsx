import { testAction } from "./actions";

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">
        Server Action Test
      </h1>

      <form action={testAction}>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Test Server Action
        </button>
      </form>
    </div>
  );
}