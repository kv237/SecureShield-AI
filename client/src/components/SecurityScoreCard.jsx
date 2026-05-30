import { FaShieldAlt } from "react-icons/fa";

export default function SecurityScoreCard({ score }) {
  let color = "text-green-500";

  if (score < 80) color = "text-yellow-500";
  if (score < 60) color = "text-orange-500";
  if (score < 40) color = "text-red-500";

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <FaShieldAlt className="text-blue-400 text-2xl" />
        <h2 className="text-xl font-bold text-white">
          Security Score
        </h2>
      </div>

      <div className={`text-5xl font-bold ${color}`}>
        {score}/100
      </div>

      <p className="text-gray-400 mt-2">
        Overall security assessment
      </p>
    </div>
  );
}