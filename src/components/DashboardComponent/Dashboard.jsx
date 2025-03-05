import TitleSection from "../CommonComponent/TitleSection";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSecureAxios from "../../Hooks/useSecureAxios";
import Loading from "../AuthenticationComponent/Loading";
import { useQueries } from "@tanstack/react-query";
import AllUsers from "./AllUsers";

const Dashboard = () => {
    const secureAxios = useSecureAxios();
    const COLORS = ['#7c3ff2', '#4580ff', '#43caff', '#b33ff2', '#3ff2d4'];
    
    const fetchSessionAndMaterialCount = async () => {
        const res = await secureAxios.get("/sessionAndMaterial-counts");
        return res.data;
    };

    const fetchUserRoleCount = async () => {
        const res = await secureAxios.get("/userRole-counts");
        return res.data;
    };

    // Fetch both queries in parallel using useQueries
    const [sessionQuery, userQuery] = useQueries({
        queries: [
            { queryKey: ['sessionAndMaterial'], queryFn: fetchSessionAndMaterialCount },
            { queryKey: ['userRole'], queryFn: fetchUserRoleCount },
        ],
    });

    const isLoading = sessionQuery.isLoading || userQuery.isLoading;
    const isError = sessionQuery.isError || userQuery.isError;

    if (isError) {
        console.error(sessionQuery.error || userQuery.error);
        return <p className="text-red-400 text-center">Error fetching data. Please try again.</p>;
    }

    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
    };
    
    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;
    
      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

  return (
        <main className="space-y-10 pt-12">
            <TitleSection title={"Dashboard"} />
            {isLoading ? (
                <Loading />
            ) : (
              <>
                <section className="text-center">

                  <div className="stats stats-vertical xs:stats-horizontal shadow bg-custom-metalic-gray">
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Users</div>
                      <div className="stat-value">{userQuery.data?.totalUsers}</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title !text-custom-primary !order-2">Total Sessions</div>
                      <div className="stat-value !text-black dark:!text-white ">{sessionQuery.data?.sessionCount}</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Materials</div>
                      <div className="stat-value">{sessionQuery.data?.materialCount}</div>
                    </div>
                  </div>

                </section>

                <section>
                  <div className="flex flex-col xl:flex-row gap-6 w-full py-5">
                    <div className="w-full xl:w-[35%] aspect-[2/1]">

                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userQuery.data?.roleCounts}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ value }) => `${value}`}
                            fill="#000000"
                            dataKey="value"
                          >
                            {userQuery.data?.roleCounts.map((roleCount, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>

                    </div>

                    <div className="w-full xl:w-[65%] aspect-[2/1]">

                      <ResponsiveContainer width="100%" height="100%" >
                          <BarChart
                            data={sessionQuery.data.statusCount}
                            margin={{
                              top: 20,
                              right: 35,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid stroke="#80808039" strokeDasharray="none" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                              {sessionQuery.data.statusCount.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                              ))}
                            </Bar>
                          </BarChart>
                      </ResponsiveContainer>

                    </div>
                  </div>
                </section>
              </>
            )}

            <AllUsers />
    </main>
  );
};

export default Dashboard;
