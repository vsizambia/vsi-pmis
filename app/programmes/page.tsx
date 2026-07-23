"use client";


import {useEffect,useState} from "react";
import Link from "next/link";


export default function Programmes(){


const [programmes,setProgrammes]=useState<any[]>([]);



useEffect(()=>{

fetch("/api/programmes")
.then(res=>res.json())
.then(data=>setProgrammes(data));


},[]);



return (

<main className="p-8">


<div className="flex justify-between mb-8">


<h1 className="text-3xl font-bold">
Programmes
</h1>


<Link
href="/programmes/register"
className="bg-black text-white px-5 py-3 rounded"
>
Register Programme
</Link>


</div>



<div className="grid gap-5">


{programmes.map(programme=>(

<div
key={programme.id}
className="border rounded-lg p-5 bg-white"
>


<h2 className="text-xl font-semibold">
{programme.name}
</h2>


<p className="text-gray-600 mt-2">
{programme.description}
</p>


<p className="mt-3 text-sm">
Directorate:
<strong>
{programme.directorate.name}
</strong>
</p>


<p className="text-sm">
Period:
{programme.startYear} - {programme.endYear}
</p>


</div>


))}


</div>


</main>

)

}