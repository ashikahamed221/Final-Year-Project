import { useNavigate } from "react-router-dom";

export default function HistoryCard({ test }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow">

      <h2 className="text-xl font-semibold">
        {test.domain} Interview
      </h2>

      <p className="mt-2">
        Score: {test.score} / {test.total}
      </p>

      <p>
        Performance: {test.performance}
      </p>

      <p>
        Avg Time: {test.avgTime}s
      </p>

      <p className="text-gray-500 text-sm">
        {new Date(test.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => navigate(`/history/${test.id}`)}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Details
      </button>

    </div>
  );
}