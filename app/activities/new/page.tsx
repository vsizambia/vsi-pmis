import ActivityForm from "./ActivityForm";

export default function NewActivityPage(){

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Create New Activity
      </h1>


      <ActivityForm />

    </div>

  );

}