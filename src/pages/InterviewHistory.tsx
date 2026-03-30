import { useEffect, useState } from "react";
import { getUserTests } from "../services/api";
import HistoryCard from "../components/HistoryCard";

export default function InterviewHistory() {

  const [tests, setTests] = useState([]);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    const data = await getUserTests();

    if (data.success) {
      setTests(data.tests);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-black">

      <h1 className="text-3xl font-bold mb-6">
        Mock Interview History
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {tests.map((test) => (
          <HistoryCard key={test.id} test={test} />
        ))}

      </div>

    </div>
  );
}