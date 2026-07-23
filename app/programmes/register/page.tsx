"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterProgramme() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    startYear: "2026",
    endYear: "2029",
    directorateId: ""
  });

  const [message, setMessage] = useState("");

  async function submitProgramme(e: any) {
    e.preventDefault();

    const response = await fetch("/api/programmes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setMessage("Programme registered successfully");

      setForm({
        name: "",
        description: "",
        startYear: "2026",
        endYear: "2029",
        directorateId: ""
      });

    } else {
      setMessage("Failed to register programme");
    }
  }


  return (

    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Register New Programme
      </h1>


      <form
        onSubmit={submitProgramme}
        className="space-y-5 max-w-xl"
      >

        <input
          className="border p-3 w-full rounded"
          placeholder="Programme Name"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />


        <textarea
          className="border p-3 w-full rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e)=>
            setForm({
              ...form,
              description:e.target.value
            })
          }
        />


        <input
          className="border p-3 w-full rounded"
          value={form.startYear}
          readOnly
        />


        <input
          className="border p-3 w-full rounded"
          value={form.endYear}
          readOnly
        />


        <input
          className="border p-3 w-full rounded"
          placeholder="Directorate ID"
          value={form.directorateId}
          onChange={(e)=>
            setForm({
              ...form,
              directorateId:e.target.value
            })
          }
        />


        <Button type="submit">
          Save Programme
        </Button>


      </form>


      {message && (
        <p className="mt-5">
          {message}
        </p>
      )}

    </main>

  );
}