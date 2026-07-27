import { createBeneficiary } from "../actions";

export default async function NewBeneficiaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  async function submitBeneficiary(formData: FormData) {
    "use server";

    await createBeneficiary(id, formData);
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-vsi-navy mb-6">
        Add Beneficiary
      </h1>

      <form
        action={submitBeneficiary}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >

        <div>
          <label className="block font-semibold mb-2">
            Gender
          </label>

          <select
            name="gender"
            className="border rounded p-3 w-full"
            required
          >
            <option value="Female">
              Female
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Other">
              Other
            </option>

          </select>
        </div>


        <div>
          <label className="block font-semibold mb-2">
            Age
          </label>

          <input
            type="number"
            name="age"
            min="0"
            className="border rounded p-3 w-full"
            required
          />

        </div>


        <div>
          <label className="block font-semibold mb-2">
            Number of Beneficiaries
          </label>

          <input
            type="number"
            name="number"
            min="1"
            defaultValue="1"
            className="border rounded p-3 w-full"
            required
          />

        </div>


        <button
          type="submit"
          className="bg-vsi-navy text-white px-6 py-3 rounded"
        >
          Save Beneficiary
        </button>

      </form>

    </div>
  );
}