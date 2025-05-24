import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import { MdEditNotifications } from "react-icons/md";
import Navbar from "../components/Navbar";
import { FaEdit } from "react-icons/fa";

const MyHobby = () => {
  const { user } = useContext(AuthContext);
  const [myHobbies, setMyHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHobbies = () => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/my-groups?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyHobbies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my hobbies:", err);
        Swal.fire("Error", "Failed to fetch your hobbies.", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHobbies();
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/all-group/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your group has been deleted.", "success");
              fetchHobbies();
            } else {
              Swal.fire("Error", "Something went wrong.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the group.", "error");
          });
      }
    });
  };

  if (loading) return <div className="p-4">Loading your hobbies...</div>;

  return (
    <>
      <Navbar />
      <div className="p-4 w-10/12 mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Hobbies</h2>
        {myHobbies.length === 0 ? (
          <p>No hobbies created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myHobbies.map((hobby) => (
              <div key={hobby._id} className="p-4 border rounded shadow">
                <h3 className="text-xl font-semibold">{hobby.groupName}</h3>
                <p>{hobby.description}</p>
                <p className="text-sm text-gray-500">
                  Created: {hobby.userEmail}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() =>
                      Swal.fire({
                        title: hobby.groupName,
                        text: hobby.description,
                        icon: "info",
                      })
                    }
                  >
                    View
                  </button>
                  <Link to={`/update-group/${hobby._id}`}>
                    <button className="btn btn-sm btn-outline"><FaEdit/></button>
                  </Link>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(hobby._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyHobby;
