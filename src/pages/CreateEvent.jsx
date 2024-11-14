import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles/style.js";
import toast from "react-hot-toast";
import { useCreateEventMutation } from "../redux/features/event/eventApi";
const CreateEvent = () => {
 
  const [createEvent, { isLoading, data, isError, isSuccess }] =
    useCreateEventMutation();
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (isSuccess && data.status==true) {
      toast.success("Event created successfully!");
      navigate("/events");
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", eventInfo.title);
    data.append("description", eventInfo.description);
    data.append("price", eventInfo.price);
    data.append("thumbnail", eventInfo.thumbnail);
 
    await createEvent(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
 
    setEventInfo({ ...eventInfo, thumbnail: file });
   
  };



  return (
    <div className=" w-[70%] mx-auto my-10">
      <h2 className="font-bold text-3xl  text-blue-600 my-5">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className={`${styles.label} text-start`}>
            Event Name
          </label>
          <input
            type="text"
            id="title"
            required
            name=""
            placeholder="Enter event name"
            value={eventInfo.title}
            className={`${styles.input}`}
            onChange={(e) =>
              setEventInfo({ ...eventInfo, title: e.target.value })
            }
          />
        </div>
        <br />

        <div className="">
          <label htmlFor="desc" className={`${styles.label}`}>
            Event Description
          </label>
          <textarea
            name=""
            id="desc"
            cols={30}
            rows={8}
            placeholder="Enter event description"
            className={`${styles.input} !h-min-24 py-2 `}
            value={eventInfo.description}
            onChange={(e) =>
              setEventInfo({ ...eventInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />

        <div>
          <label htmlFor="price" className={`${styles.label}`}>
            Registration Fee
          </label>
          <input
            type="number"
            id="price"
            required
            name=""
            placeholder="Enter registration fee"
            value={eventInfo.price}
            className={`${styles.input}`}
            onChange={(e) =>
              setEventInfo({ ...eventInfo, price: e.target.value })
            }
          />
        </div>
        <br />
        <div className="w-full ">
          <input
            type="file"
            accept="image/*"
            id="file"
            // className="hidden"
            onChange={handleFileChange}
          />
        
        </div>

        <br />

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Create event"
            className="w-fit px-3 h-[40px] font-bold bg-blue-500 text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
