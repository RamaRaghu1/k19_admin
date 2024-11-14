import React, { useEffect, useState } from "react";
import { useViewSingleUserQuery } from "../redux/features/user/userApi";
import { useParams } from "react-router-dom";
import CustomModel from "../utils/CustomModel";

const ViewUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const {
    data: userData,
    isError,
    isSuccess,
    isLoading,
  } = useViewSingleUserQuery({ id });

  const {
    country,
    city,
    address,
    gender,
    email,
    achievement,
    firstName,
    phone,
    ProfilePic,
    profession,
    dob,
    age,
    state,
    pincode,
  } = data || "";
  const { front, back, selfie, proofname, proofnumber } = data?.kyc || "";

  const fields = [
    {
      field: "Username",
      text: firstName,
    },
    {
      field: "Email",
      text: email,
    },
    {
      field: "Profession",
      text: profession,
    },
    {
      field: "Date of Birth",
      text: dob,
    },
    {
      field: "Age",
      text: age,
    },
    {
      field: "Gender",
      text: gender,
    },
    {
      field: "Phone Number",
      text: phone,
    },
    {
      field: "Address",
      text: address,
    },
    {
      field: "City",
      text: city,
    },
    {
      field: "State",
      text: state,
    },
    {
      field: "Country",
      text: country,
    },
    {
      field: "Pincode",
      text: pincode,
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      setData(userData.data);
    }
  }, [isSuccess]);
  return (
    <div className="w-[80vw] m-auto font-sans text-sm">
    <div className="bg-slate-100 flex  flex-col md:flex-row">
      <div className=" md:m-2 w-full  md:w-[50%]">
        <h2 className="font-bold text-lg p-2 text-start text-red-900">
          Personal Information
        </h2>
        <div className="flex bg-white p-2 items-center ">
          <p className="w-[50%] text-start">Profile Pic</p>

          <img
            src={ProfilePic}
            className="w-[100px] h-[100px] rounded-full object-contain"
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="w-full bg-white rounded-md border">
          {fields.map((item) => {
            return (
              <div className="flex h-10 p-2 items-center border-b-[1px]">
                <p className="w-[50%] text-start">{item.field}</p>
                {item.text ? (
                  <p>{item.text}</p>
                ) : (
                  <p className="text-red-500 ">Not Provided</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* kyc information */}
      <div className="md:m-2 md:ml-0 w-full md:w-[50%]">
        <h2 className="font-bold text-lg p-2 text-start text-red-900">
          Document Information
        </h2>
        <div className=" w-full bg-white border rounded-md">
          <div className="flex h-10 p-2 items-center border-b-[1px]">
            <p className="w-[50%] text-start">Proof Name</p>
            {proofname ? (
              <p>{proofname}</p>
            ) : (
              <p className="text-red-500  rounded-sm font-medium w-fit p-1 border-red-500">
                Not Provided
              </p>
            )}
          </div>
          <div className="flex h-10 p-2 items-center border-b-[1px]">
            <p className="w-[50%] text-start">Proof Number</p>
            <p>{proofnumber || "Not Provided"}</p>
          </div>

          <div className="flex h-fit p-2 items-center border-b-[1px]">
            <p className="w-[50%] text-start">Front</p>
            {front ? (
              <img
                src={front}
                className="w-[70px] h-[70px] rounded-full object-contain"
                onClick={() => setOpen(true)}
              />
            ) : (
              <p className="text-red-500 border-2 font-medium w-fit p-1 border-red-500">
                Not Provided
              </p>
            )}
          </div>
          {open && front && (
            <CustomModel img={front} setOpen={setOpen} open={open} />
          )}
          <div className="flex h-fit p-2 items-center border-b-[1px]">
            <p className="w-[50%] text-start">Back</p>
            {back ? (
              <img
                src={back}
                className="w-[70px] h-[70px] rounded-full object-contain"
                onClick={() => setOpen(true)}
              />
            ) : (
              <p className="text-red-500 border-2 font-medium w-fit p-1 border-red-500">
                Not Provided
              </p>
            )}
          </div>
          {open && back && (
            <CustomModel img={back} setOpen={setOpen} open={open} />
          )}

          <div className="flex h-fit p-2 items-center border-b-[1px]">
            <p className="w-[50%] text-start">Selfie</p>
            {selfie ? (
              <img
                src={selfie}
                className="w-[70px] h-[70px] rounded-full object-contain"
                onClick={() => setOpen(true)}
              />
            ) : (
              <p className="text-red-500 border-2 font-medium w-fit p-1 border-red-500">
                Not Provided
              </p>
            )}
          </div>
          {open && selfie && (
            <CustomModel img={selfie} setOpen={setOpen} open={open} />
          )}

          <div className="bg-gray-100  font-bold text-lg p-2  text-start text-red-900 h-10 ">
            Achivements
          </div>
          {achievement &&
            achievement.map((dt) => {
              return (
                <div className="flex flex-col  p-2  border-b-[1px]">
                  <div className="flex h-10 p-2 items-center border-b-[1px]">
                    <p className="w-[50%] text-start">Title</p>

                    <p>{dt?.title}</p>
                  </div>

                  <div className="flex h-10 p-2 items-center border-b-[1px] ">
                    <p className="w-[50%] text-start">Description</p>

                    <p>{dt?.description}</p>
                  </div>
                  <div className="flex h-full p-2 items-center ">
                    <p className="w-[50%] text-start">Image</p>

                    <img
                      src={dt?.image}
                      className="w-[70px] h-[70px] rounded-full object-contain"
                      onClick={() => setOpen(true)}
                    />
                    {open && dt?.img && (
                      <CustomModel img={dt.img} setOpen={setOpen} open={open} />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewUser;
