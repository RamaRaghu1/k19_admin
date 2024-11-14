import React from "react";
import { Modal, Box } from "@mui/material";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const CustomModel = ({
  open,
  setOpen,
  img,

}) => {
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)} className="!bg-transparent">
        <Box 
        className="absolute   top-[50%] left-[50%] h-[500px] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[40%]  bg-transparent  rounded-[8px] outline-none shadow p-4 "
      
        >
          <Lightbox image={img} />
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModel;
