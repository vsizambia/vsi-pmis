<div className="mt-10">

  <div className="flex justify-between items-center mb-6">

    <div>
      <h2 className="text-2xl font-bold">
        Project Activities ({project.activities.length})
      </h2>

      <p className="text-gray-500">
        Monitor implementation progress for this project.
      </p>
    </div>

    <Link
      href={`/projects/${project.id}/activities/new`}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      + Add Activity
    </Link>

  </div>

  {project.activities.length === 0 ? (

    <div className="border rounded-lg p-8 text-center text-gray-500">
      No activities have been created for this project.
    </div>

  ) : (

    <div className="space-y-4">

      {project.activities.map((activity) => (

        <div
          key={activity.id}
          className="border rounded-lg p-5 bg-white shadow-sm"
        >

          <div className="flex justify-between items-start">

            <div>

              <h3 className="text-lg font-semibold">
                {activity.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {activity.description}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activity.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : activity.status === "Active"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {activity.status}
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">

            <div>
              <strong>Start Date</strong>
              <br />
              {activity.startDate
                ? activity.startDate.toLocaleDateString()
                : "Not set"}
            </div>

            <div>
              <strong>End Date</strong>
              <br />
              {activity.endDate
                ? activity.endDate.toLocaleDateString()
                : "Not set"}
            </div>

          </div>

          <div className="flex gap-3 mt-6">

            <button
              className="px-4 py-2 rounded border hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              className="px-4 py-2 rounded border text-red-600 hover:bg-red-50"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>