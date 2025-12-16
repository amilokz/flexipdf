import { motion } from "framer-motion";

export default function ConverterCard({ title, description, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 bg-white shadow-xl rounded-2xl border-t-4 ${color}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Open Tool
      </button>
    </motion.div>
  );
}
