type ActivityStatsProps = {
  total: number;
  ongoing: number;
  planned: number;
  completed: number;
};


export default function ActivityStats({
  total,
  ongoing,
  planned,
  completed,
}: ActivityStatsProps) {

  const cards = [
    {
      title: "Total Activities",
      value: total,
    },
    {
      title: "Ongoing",
      value: ongoing,
    },
    {
      title: "Planned",
      value: planned,
    },
    {
      title: "Completed",
      value: completed,
    },
  ];


  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white shadow rounded-lg p-5"
        >

          <h3 className="text-gray-500 text-sm">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>

        </div>

      ))}

    </div>

  );
}