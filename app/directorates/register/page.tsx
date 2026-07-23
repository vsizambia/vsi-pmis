"use client";

import {useState} from "react";

export default function RegisterDirectorate(){

const [message,setMessage]=useState("");

async function submit(e:any){

e.preventDefault();

const form=new FormData(e.target);

const response=await fetch("/api/directorates",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:form.get("name"),
description:form.get("description")
})
});


if(response.ok){
setMessage("Directorate created successfully");
e.target.reset();
}

}


return (

<div className="p-8 max-w-xl">

<h1 className="text-3xl font-bold mb-6">
Register Directorate
</h1>


<form onSubmit={submit} className="space-y-4">

<input
name="name"
placeholder="Directorate Name"
className="border p-3 w-full"
/>


<textarea
name="description"
placeholder="Description"
className="border p-3 w-full"
/>


<button
className="bg-black text-white px-5 py-3 rounded"
>
Save Directorate
</button>

</form>


<p className="mt-4">
{message}
</p>


</div>

)

}