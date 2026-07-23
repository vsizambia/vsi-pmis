"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function Directorates(){

const [directorates,setDirectorates]=useState<any[]>([]);

const [form,setForm]=useState({
name:"",
description:""
});


async function loadDirectorates(){

const response =
await fetch("/api/directorates");

const data =
await response.json();

setDirectorates(data);

}


async function saveDirectorate(e:any){

e.preventDefault();


await fetch("/api/directorates",{

method:"POST",

body:JSON.stringify(form)

});


setForm({
name:"",
description:""
});


loadDirectorates();

}


useEffect(()=>{

loadDirectorates();

},[]);



return (

<main className="p-8">


<h1 className="text-3xl font-bold mb-6">
Directorate Management
</h1>


<Card className="mb-8">

<CardHeader>

<CardTitle>
Register Directorate
</CardTitle>

</CardHeader>


<CardContent>


<form
onSubmit={saveDirectorate}
className="space-y-4"
>


<input

className="border rounded p-3 w-full"

placeholder="Directorate Name"

value={form.name}

onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}

/>



<textarea

className="border rounded p-3 w-full"

placeholder="Description"

value={form.description}

onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}

/>



<Button>
Save Directorate
</Button>


</form>


</CardContent>

</Card>



<Card>

<CardHeader>

<CardTitle>
Registered Directorates
</CardTitle>

</CardHeader>


<CardContent>


<div className="space-y-3">


{
directorates.map((item)=>(

<div
key={item.id}
className="border rounded p-4"
>

<h3 className="font-bold">
{item.name}
</h3>

<p>
{item.description}
</p>

<p className="text-sm text-gray-500 mt-2">
Programmes:
{item.programmes.length}
</p>


</div>

))
}


</div>


</CardContent>

</Card>


</main>

);

}