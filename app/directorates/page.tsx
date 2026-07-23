"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Directorates(){

const [directorates,setDirectorates] = useState<any[]>([]);


useEffect(()=>{

fetch("/api/directorates")
.then(res=>res.json())
.then(data=>setDirectorates(data));

},[]);



return (

<main className="p-8">

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">
Directorates
</h1>


<Link
href="/directorates/register"
className="bg-black text-white px-5 py-3 rounded"
>
Register Directorate
</Link>

</div>



<div className="grid gap-5">


{directorates.map((item)=>(

<div
key={item.id}
className="border rounded-lg p-5 bg-white"
>

<h2 className="text-xl font-semibold">
{item.name}
</h2>


<p className="text-gray-600 mt-2">
{item.description}
</p>


<p className="text-sm mt-3 text-gray-500">
Created:
{new Date(item.createdAt).toLocaleDateString()}
</p>


</div>

))}


</div>


</main>

)

}