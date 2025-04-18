import { useEffect, useState } from "react";
import { Mail, Trophy } from "lucide-react"; // Import only necessary icons
import { motion } from "framer-motion"; // Import Framer Motion

const Leaderboard = () => {
  const [employees, setEmployees] = useState([]);
  const apiUrl =  import.meta.env.VITE_DOMIN
  console.log(apiUrl)
  useEffect(() => {
    const fetchTopEmployees = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/target/topThree`);
        const data = await response.json();
        setEmployees(data);
        console.log("Top Employees:", data);
      } catch (error) {
        console.error("❌ Error fetching top employees:", error);
      }
    };

    fetchTopEmployees();
  }, []);

  return (
    <motion.div
      className="max-w-4xl mt-20 mx-auto bg-white rounded-xl p-8 border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-3xl font-semibold text-center text-red-700 mb-8 border-b-2 pb-2 border-red-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Trophy className="inline-block mr-2" size={30} /> Top Performers
      </motion.h2>
      <ul className="space-y-6">
        {employees.length > 0 ? (
          employees.map((emp, index) => (
            <motion.li
              key={emp.email}
              className="flex justify-start items-center p-6 rounded-lg bg-white text-gray-900 border border-gray-300 transition-all hover:bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }} // Stagger animation
            >
              <div className="flex items-center space-x-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center">
                  {emp.profileImg ? (
                    <img
                      src={`${apiUrl}/uploads/${emp.profileImg}`}
                      alt={emp.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-semibold text-gray-800">
                      {emp.name[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Name and Email */}
              <div className="flex flex-col md:flex-row md:ml-6 md:items-center w-full">
                <span className="font-medium text-xl mb-3 md:mb-0">{emp.name}</span>
                <div className="flex items-center space-x-2 mt-3 md:mt-0 md:ml-4">
                  <Mail className="text-red-700" size={20} />
                  <span className="text-sm text-gray-500">{emp.email}</span>
                </div>
              </div>
            </motion.li>
          ))
        ) : (
          <p className="text-center text-gray-500">⏳ Loading...</p>
        )}
      </ul>
    </motion.div>
  );
};

export default Leaderboard;
