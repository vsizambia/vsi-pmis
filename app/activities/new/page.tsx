import ActivityForm from "./ActivityForm";

export default function NewActivityPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">New Activity</h1>

      <ActivityForm />
    </main>
  );
}