"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


type Activity = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
};


export default function ActivityEditForm({
  activity,
}: {
  activity: Activity;
}) {

  const router = useRouter();


  const [title, setTitle] = useState(activity.title);

  const [description, setDescription] = useState(
    activity.description ?? ""
  );

  const [status, setStatus] = useState(
    activity.status
  );


  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    await fetch("/api/activities", {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        id: activity.id,

        title,

        description,

        status,

      }),

    });


    router.push(
      `/activities/${activity.id}`
    );

    router.refresh();

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl"
    >

      <div>

        <label className="block font-medium">
          Activity Title
        </label>


        <input

          value={title}

          onChange={(e) =>
            setTitle(e.target.value)
          }

          className="border rounded p-2 w-full"

        />

      </div>



      <div>

        <label className="block font-medium">
          Description
        </label>


        <textarea

          value={description}

          onChange={(e) =>
            setDescription(e.target.value)
          }

          className="border rounded p-2 w-full"

          rows={5}

        />

      </div>



      <div>

        <label className="block font-medium">
          Status
        </label>


        <select

          value={status}

          onChange={(e) =>
            setStatus(e.target.value)
          }

          className="border rounded p-2 w-full"

        >

          <option value="Planned">
            Planned
          </option>

          <option value="Ongoing">
            Ongoing
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>

      </div>



      <button

        type="submit"

        className="bg-green-600 text-white px-5 py-2 rounded"

      >

        Save Changes

      </button>


    </form>

  );

}