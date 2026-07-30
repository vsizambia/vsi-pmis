"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Project = {
  id: string;
  name: string;
};


type ActivityFormData = {
  title: string;
  description: string;
  status: string;
  projectId: string;
  startDate: string;
  endDate: string;
};


export default function ActivityForm() {

  const router = useRouter();


  const [projects, setProjects] = useState<Project[]>([]);


  const [formData, setFormData] = useState<ActivityFormData>({

    title: "",

    description: "",

    status: "Planned",

    projectId: "",

    startDate: "",

    endDate: "",

  });



  useEffect(() => {

    async function loadProjects() {

      const response = await fetch("/api/projects");

      const data = await response.json();

      setProjects(data);

    }


    loadProjects();

  }, []);




  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  }




  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    const response = await fetch(
      "/api/activities",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),

      }
    );



    if (response.ok) {

      router.push("/activities");

      router.refresh();

    }

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

          name="title"

          value={formData.title}

          onChange={handleChange}

          className="border p-2 w-full rounded"

          required

        />

      </div>




      <div>

        <label className="block font-medium">
          Description
        </label>


        <textarea

          name="description"

          value={formData.description}

          onChange={handleChange}

          className="border p-2 w-full rounded"

        />

      </div>




      <div>

        <label className="block font-medium">
          Project
        </label>


        <select

          name="projectId"

          value={formData.projectId}

          onChange={handleChange}

          className="border p-2 w-full rounded"

          required

        >

          <option value="">
            Select Project
          </option>



          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >

              {project.name}

            </option>

          ))}


        </select>


      </div>




      <div>

        <label className="block font-medium">
          Status
        </label>


        <select

          name="status"

          value={formData.status}

          onChange={handleChange}

          className="border p-2 w-full rounded"

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




      <div className="grid grid-cols-2 gap-4">


        <div>

          <label className="block font-medium">
            Start Date
          </label>


          <input

            type="date"

            name="startDate"

            value={formData.startDate}

            onChange={handleChange}

            className="border p-2 w-full rounded"

          />

        </div>




        <div>

          <label className="block font-medium">
            End Date
          </label>


          <input

            type="date"

            name="endDate"

            value={formData.endDate}

            onChange={handleChange}

            className="border p-2 w-full rounded"

          />

        </div>


      </div>




      <button

        type="submit"

        className="bg-blue-600 text-white px-5 py-2 rounded"

      >

        Save Activity

      </button>


    </form>

  );

}