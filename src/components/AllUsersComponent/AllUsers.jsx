import Loading from "../AuthenticationComponent/Loading";
import NotFound from "../CommonComponent/NotFound";
import TitleSection from "../CommonComponent/TitleSection";
import UseUrlQuery from "../../Hooks/UseUrlQuery";
import UseGetAllUsers from "../../Hooks/UseGetAllUsers";
import AllUsersTopScrollBar from "../CommonComponent/AllUsersTopScrollBar";
import ChangeUserRoleModal from "./ChangeUserRoleModal";
import { MdEditSquare } from "react-icons/md";

const AllUsers = () => {
  const { loading, users, refetch, isError, error } = UseGetAllUsers();
  const { searchQuery } = UseUrlQuery();

  if (isError) {
    console.error(error);
    // throw error;
  }

  return (
    <main className=" mt-8">
      <TitleSection title={"All users"} />

      <section className="">
        <div className="space-y-12">
          <div className="space-y-10">
            <AllUsersTopScrollBar />
          </div>
          {loading ? (
            <Loading />
          ) : users?.length === 0 ? (
            <NotFound
              NotFoundText={
                searchQuery === "All"
                  ? "Unable to load users for some reasion!"
                  : "No user found!"
              }
            />
          ) : (
            <div className="overflow-x-auto max-h-[60svh]">
              <table className="table table-sm table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <td className="flex items-center gap-1">
                      Role <MdEditSquare className={``} />
                    </td>
                    <td>Name</td>
                    <td>Email</td>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="">
                      <th>{index + 1}</th>
                      <td className="duration-500 hover:bg-custom-primary border-x border-black">
                        <ChangeUserRoleModal user={user} refetch={refetch} />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <th>{index + 1}</th>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <td className="flex items-center gap-1">
                      Role <MdEditSquare className={``} />
                    </td>
                    <td>Name</td>
                    <td>Email</td>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllUsers;
