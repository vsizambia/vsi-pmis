import { createDirectorate } from "../actions";


export default function NewDirectoratePage() {


  return (

    <div className="max-w-xl">


      <h1 className="text-3xl font-bold text-vsi-navy mb-6">

        Create Directorate

      </h1>



      <form

        action={createDirectorate}

        className="
        bg-white
        rounded-xl
        shadow
        p-8
        space-y-6
        "

      >


        <div>


          <label className="block font-semibold mb-2">

            Directorate Name

          </label>


          <input

            name="name"

            required

            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            "

            placeholder="e.g. Programmes Directorate"

          />

        </div>





        <div>


          <label className="block font-semibold mb-2">

            Description

          </label>


          <textarea

            name="description"

            rows={4}

            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            "

            placeholder="Describe the directorate role"

          />

        </div>





        <button

          type="submit"

          className="
          bg-vsi-navy
          text-white
          px-6
          py-3
          rounded-lg
          font-semibold
          hover:bg-vsi-blue
          "

        >

          Save Directorate

        </button>



      </form>


    </div>

  );

}