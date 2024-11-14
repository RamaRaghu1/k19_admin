import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loader from "../assets/loader.json";
import { styles } from "../styles/style.js";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import {
  useGetAllEventsQuery,
  useDeleteEventMutation,
  eventApi,
} from "../redux/features/event/eventApi";
import toast from "react-hot-toast";

const Events = () => {
  const [eventId, setEventId]=useState(null);
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, isSuccess ,refetch } = useGetAllEventsQuery( {},
    { refetchOnMountOrArgChange: true });
  const [
    deleteEvent,
    {
      data:deleteData,
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteEventMutation();
 
  useEffect(()=>{
if(deleteSuccess && deleteData.message==="succesfully Deleted"){
  refetch();
  toast.success("Event deleted successfully!")
  setOpen(false);

}
  },[deleteSuccess])

  const columns = [
    { field: "id", headerName: "S.No", flex: 0.5, minWidth: 80 },
    { field: "title", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "price",
      headerName: "Registration Fee",
      flex: 0.75,
      minWidth: 120,
    },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      //   flex: 0.75,
      //   minWidth: 120,
      renderCell: (params) => {
        console.log(params.row, "bgh");
        return <img src={params.row.thumbnail} />;
      },
    },

    {
      field: "manage",
      headerName: "Manage",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              // const eventId = params.row.eventId;
              //   navigate(`/events/view-user/${id}`);
            }}
          >
            <FaEdit className={"text-black "} size={20} />
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              setOpen(!open);
              setEventId(params.row.eventId);
            }}
          >
            <AiOutlineDelete className={"text-black"} size={20} />
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
          eventId: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail,
        });
      });
  }

  const handleDelete = async () => {
    const id = eventId;
    console.log("hghvgh", id)
    await deleteEvent(id);
  };
  return (
    <div className="md:w-[80%] h-[100vh] mx-auto mt-10 text-md">
      <DataGrid rows={rows} columns={columns} />
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 outline-none w-[450px]  bg-white rounded-[8px] shadow p-4">
            <h1 className={`${styles.title}`}>
              Add you sure you want to delete this Event?
            </h1>
            <div className="flex w-full items-center justify-evenly mb-6 mt-4">
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-green-500`}
                onClick={() => setOpen(!open)}
              >
                Cancel
              </div>
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-red-500`}
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Events;
