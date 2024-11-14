import { useUserListQuery } from "../redux/features/user/userApi";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import loader from "../assets/loader.json";
import { useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";

const UsersList = () => {
  const { data: userData, isLoading, isError, isSuccess } = useUserListQuery();
  const [data, setData] = useState([]);
  const [active, setActive] = useState("all");
  const targetElement = useRef();


  const navigate=useNavigate();
  // setData(userData.data)
  useEffect(() => {
    if (isSuccess) {
      setData(userData?.data);
    }
  }, [isSuccess]);

  const ageAbove19 = data.filter((dt) => dt.age >= 19);

  const agebelow19 = data.filter((dt) => dt.age < 19);

  const maleUsers = data.filter((dt) => dt.gender === "Male");

  const femaleUsers = data.filter((dt) => dt.gender === "Female");

  const filteredData = () => {
    if (active === "all") return data;
    if (active === "ageAbove19") return ageAbove19;
    if (active === "agebelow19") return agebelow19;
    if (active === "maleUsers") return maleUsers;
    if (active === "femaleUsers") return femaleUsers;
  };

  const scrollingToTable = () => {
    targetElement.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  };

  const newUserList = filteredData();

  const columns = [
    { field: "id", headerName: "S.No", flex: 0.5, minWidth: 80 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "gender", headerName: "Gender", flex: 0.75, minWidth: 120 },
    {
      field: "profession",
      headerName: "Profession",
      flex: 0.75,
      minWidth: 120,
    },
    { field: "city", headerName: "City", flex: 0.75, minWidth: 120 },
    {
      field: "manage",
      headerName: "Manage",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const id = params.row.userId;
              navigate(`/view-user/${id}`);
             
            }}
          >
            <FaEdit className={"text-black"} size={20} />
          </button>
        );
      },
    },
  ];

  const rows = [];
  {
    data &&
      data.forEach((item, index) => {
     

        rows.push({
          id: index + 1,
          userId: item._id,
          email: item.email,
          name: item.firstName,
          gender: item.gender,
          profession: item.profession,
          city: item.city,
        });
      });
  }

  return (
    <div className="w-[100%] h-[100vh] mt-10 text-md">
        <div className="flex md:flex-row flex-col gap-4 pt-8">
        <div className="bg-white shadow-md shadow-gray-200 h-[200px] md:w-4/12 w-full rounded-lg flex flex-col p-2">
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl p-2 text-slate-500 ">Total Players</p>
            <p
              onClick={() => {
                
                setActive("all");
                scrollingToTable();
              }}
              className="font-bold text-5xl p-2 pt-0 text-blue-600 cursor-pointer"
            >
              {data.length}
            </p>
          </div>

          <div className="flex justify-around">
            <div className="px-2">
              <p className="font-bold text-md pt-2  text-slate-500">
              Under 19
              </p>
              <p
                onClick={() => {
                  setActive("agebelow19");
                  scrollingToTable();
              
                }}
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {agebelow19.length}
              </p>
            </div>
            <div className="px-2">
              <p className="font-bold text-md pt-2  text-slate-500">
               Above 19
              </p>
              <p
                onClick={() => {
                  setActive("ageAbove19");
                  scrollingToTable();
              
                }
                  
                }
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {ageAbove19.length}
              </p>
            </div>
          </div>
        </div>


        <div className="bg-white shadow-md shadow-gray-200 h-[200px] md:w-4/12 w-full rounded-lg flex flex-col p-2">
          <div className="flex flex-col items-center">
            <p className="font-bold text-xl p-2 text-slate-500">Total Units</p>
            <p
              onClick={() => {
                
                setActive("all");
                scrollingToTable();
              }}
              className="font-bold text-5xl p-2 pt-0 text-blue-600 cursor-pointer"
            >
              {0}
            </p>
          </div>

          <div className="flex justify-around">
            <div className="">
              <p className="font-bold text-md pt-2  text-slate-500">
              maleUsers
              </p>
              <p
                onClick={() => {
                  setActive("maleUsers");
                  scrollingToTable();
              
                }}
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {maleUsers.length}
              </p>
            </div>
            <div className="">
              <p className="font-bold text-md pt-2  text-slate-500">
              femaleUsers
              </p>
              <p
                onClick={() => {
                  setActive("femaleUsers");
                  scrollingToTable();
              
                }
                  
                }
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {femaleUsers.length}
              </p>
            </div>
          </div>
        </div>
       
        <div className="bg-white shadow-md shadow-gray-200 h-[200px] md:w-4/12 w-full rounded-lg flex flex-col p-2">
          <div className="flex flex-col items-center"> 
            <p className="font-bold text-xl p-2 text-slate-500">
             Total Events
            </p>
            <p
              onClick={() => {
                // setActive("all");
                scrollingToTable();
            
              }}
              className="font-bold text-5xl p-2 pt-0 text-blue-600 cursor-pointer"
            >
              {0}
            </p>
          </div>

          <div className="flex justify-around">
            <div className="px-2">
              <p className="font-bold text-md pt-2  text-slate-500">Verified</p>
              <p
                onClick={() => {
                  // setActive("kycVerified");
                  scrollingToTable();
              
                }}
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {0}
              </p>
            </div>
            <div className="px-2">
              <p className="font-bold text-md pt-2  text-slate-500">
                Not-Verified
              </p>
              <p
                onClick={() => {
                  // setActive("kycNotVerified");
                  scrollingToTable();
              
                }}
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                {0}
              </p>
            </div>
            <div className="px-2">
              <p className="font-bold text-md pt-2  text-slate-500">Pending</p>
              <p
                onClick={scrollingToTable}
                className="font-bold text-lg  text-blue-600 cursor-pointer"
              >
                0
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-4 my-12">
        <h1 className="font-bold text-3xl  text-blue-600">Users List</h1>
      </div>
      <DataGrid rows={rows} columns={columns} />
    
    </div>
  );
};

export default UsersList;
