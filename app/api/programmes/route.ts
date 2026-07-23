import prisma from "@/lib/prisma";


export async function GET(){

try{

const programmes = await prisma.programme.findMany({

include:{
directorate:true
},

orderBy:{
createdAt:"desc"
}

});


return Response.json(programmes);


}catch(error){

console.error(error);

return Response.json(
{
error:"Failed to fetch programmes"
},
{
status:500
}
);

}

}



export async function POST(request:Request){

try{


const body = await request.json();


const programme = await prisma.programme.create({

data:{

name:body.name,

description:body.description,

startYear:Number(body.startYear),

endYear:Number(body.endYear),

directorateId:body.directorateId

}

});


return Response.json(programme);


}catch(error){

console.error(error);


return Response.json(
{
error:"Failed to create programme"
},
{
status:500
}
);


}

}