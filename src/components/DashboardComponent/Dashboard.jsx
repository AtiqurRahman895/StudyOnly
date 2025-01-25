import TitleSection from "../CommonComponent/TitleSection";
import useGetUserRole from "../../Hooks/useGetUserRole";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useSecureAxios from "../../Hooks/useSecureAxios";
import Loading from "../AuthenticationComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate=useNavigate()
    const secureAxios=useSecureAxios()
    const { role } = useGetUserRole();
    const COLORS = ['#e8092e', '#ffffff', '#797979'];
    
    const fetchsessionAndMaterialCount=async()=>{
      if(role==="student"){
        navigate(`/dashboard/booked_session`)
        return {}
      }else if(role==="tutor"){
        navigate(`/dashboard/my_sessions`)
        return {}
      }
        const res=await secureAxios.get("/sessionAndMaterial-counts")
        return res.data
    }
    const {isLoading:loading, data:sessionAndMaterial={},isError,error}=useQuery(
            ['sessionAndMaterial'],
            fetchsessionAndMaterialCount,
    )

    const fetchUserRoleCount=async()=>{
      if(role==="student"){
        navigate(`/dashboard/booked_session`)
        return {}
      }else if(role==="tutor"){
        navigate(`/dashboard/my_sessions`)
        return {}
      }
      const res=await secureAxios.get("/userRole-counts")
      return res.data
    }
    const {isLoading:loading2, data:userRole={},isError2,error2}=useQuery(
            ['userRole'],
            fetchUserRoleCount,
    )
    let revarseRole
    
    if(userRole.roleCounts){
      revarseRole =userRole.roleCounts.map(data=>{
        return {name:data.role, value:data.count}
      })
      console.log(revarseRole)

    }

    if (isError ) {
        console.error(error);
        // throw error;
    }
    if (isError2 ) {
      console.error(error2);
      // throw error;
  }

    

  return (
    <main className="">
      <TitleSection title={"Dashboard"} />
      {
        (loading || loading2) ? (<Loading/>) :(
            (userRole || sessionAndMaterial)&&
            (
              <section>
                <div className="place-items-center space-y-10 pt-12">

                  <div className="stats stats-vertical xs:stats-horizontal shadow bg-white">

                    <div className="stat place-items-center">
                      <div className="stat-title text-black">Total Users</div>
                      <div className="stat-value text-custom-primary">{userRole.totalUsers}</div>
                    </div>

                    <div className="stat place-items-center">
                      <div className="stat-value text-black !order-2 ">{sessionAndMaterial.sessionCount}</div>
                      <div className="stat-title text-custom-primary">Total Sessions</div>
                    </div>

                    <div className="stat place-items-center">
                      <div className="stat-title text-black">Total Materials</div>
                      <div className="stat-value text-custom-primary">{sessionAndMaterial.materialCount}</div>
                    </div>

                  </div>

                  <div className="flex flex-col md:flex-row gap-6 w-full">

                    <div className="w-full md:w-[35%] aspect-[2/1]">
                      <ResponsiveContainer  width="100%" height="100%">
                        <PieChart>
                          <Pie
                           data={revarseRole}
                           cx="50%"
                           cy="50%"
                           labelLine={false}
                           label={revarseRole}
                          //  outerRadius={80}
                           fill="#000000"
                           dataKey="value"
                          >
                            {userRole.roleCounts.map((roleCount, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend></Legend>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="w-full md:w-[65%] aspect-[2/1]">
                      <ResponsiveContainer  width="100%" height="100%">
                        <LineChart data={sessionAndMaterial.statusCount} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                          <Line type="monotone" dataKey="count" stroke="#e8092e" />
                          <CartesianGrid stroke="#e8092e" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                  </div>


                </div>

                {/* <div className="flex flex-wrap gap-8"> */}

                {/* </div> */}
              </section>
            )
        )    
      }

    </main>
  );
};

export default Dashboard;
