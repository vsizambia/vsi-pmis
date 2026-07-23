"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterProgramme() {

  const [form, setForm] = useState({
    name:"",
    description:"",
    startYear:"2026",
    endYear:"2029",
    directorateId:""
  });


  async function submitProgramme(e:any){

    e.preventDefault();


    await fetch("/api/programmes",{

      method:"POST",

      body:JSON.stringify(form)

    });


    alert("Programme registered successfully");

  }


  return (

    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Register New Programme
      </h1>


      <form
        onSubmit={submitProgramme}
        className="space-y-5"
      >

        <input
          className="border p-3 w-full rounded"
          placeholder="Programme Name"
          onChange={(e)=>
            setForm({...form,name:e.target.value})
          }
        />


        <textarea
          className="border p-3 w-full rounded"
          placeholder="Description"
          onChange={(e)=>
            setForm({...form,description:e.target.value})
          }
        />


        <input
          className="border p-3 w-full rounded"
          value="2026"
          readOnly
        />


        <input
          className="border p-3 w-full rounded"
          value="2029"
          readOnly
        />


        <input
          className="border p-3 w-full rounded"
          placeholder="Directorate ID"
          onChange={(e)=>
            setForm({...form,directorateId:e.target.value})
          }
        />


        <Button>
          Save Programme
        </Button>


      </form>

    </main>

  );

}