import { useState } from "react";
import CameraTable from "./cameraTable";
import Navbar from "./navbar";
import TableActions from "./actions";
import { useCamerasQuery } from "../../lib/api/cameraApi";
import { useDispatch, useSelector } from "react-redux";
import { setRemovedCameras } from "../../lib/slices/cameraSlice";

const TableLaylout = () => {
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCameras, setSelectedCameras] = useState([]);

  const removedCameras = useSelector((state) => state.camera.removedCameras);
  const dispatch = useDispatch();

  const { data: cameras, isLoading } = useCamerasQuery();

  const cameraList = cameras?.data ?? [];

  console.log(selectedCameras);
  

  return (
    <div className="py-4 px-12">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <br />
      <div className="mb-4">
        <TableActions
          status={status}
          setStatus={setStatus}
          location={location}
          setLocation={setLocation}
          cameraList={cameraList}
          deletedCameras={removedCameras}
          setDeletedCameras={(cameras) => dispatch(setRemovedCameras(cameras))}
          setSelectedCameras={setSelectedCameras}
          selectedCameras={selectedCameras}
        />
      </div>
      <br />
      <CameraTable
        status={status}
        setStatus={setStatus}
        location={location}
        setLocation={setLocation}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cameraList={cameraList}
        isLoading={isLoading}
        deletedCameras={removedCameras}
        setDeletedCameras={(cameras) => dispatch(setRemovedCameras(cameras))}
        selectedCameras={selectedCameras}
        setSelectedCameras={setSelectedCameras}
      />
    </div>
  );
};

export default TableLaylout;
