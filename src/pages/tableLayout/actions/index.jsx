import LocationSvg from "../../../assets/images/svg/location.svg";
import StatusSvg from "../../../assets/images/svg/status.svg";

const TableActions = ({
  status,
  setStatus,
  location,
  setLocation,
  cameraList,
  deletedCameras,
  setDeletedCameras,
  setSelectedCameras,
  selectedCameras,
}) => {
  const fetchedLocations = Array.from(
    new Set(cameraList.map((camera) => camera.location))
  );

  return (
    <div className="flex gap-4 items-center justify-between bg-white rounded-md flex-wrap">
      <div className="flex gap-4 bg-white rounded-md p-2 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <img src={LocationSvg} alt="Location" className="w-4 h-4" />
          <select
            className="border border-gray-300 rounded-md px-4 py-1 text-[0.8rem]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="All">
              {location === "All" ? "Select" : "Clear"} Location
            </option>
            {fetchedLocations.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <img src={StatusSvg} alt="Status" className="w-3 h-3" />
          <select
            className="border border-gray-300 rounded-md px-4 py-1 text-[0.8rem]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">
              {status === "All" ? "Select" : "Clear"} Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        {selectedCameras.length > 0 ? (
          <div className="flex gap-4 bg-white rounded-md p-2 items-center flex-wrap">
            <p className="text-sm text-gray-500">
              {selectedCameras.length} camera(s) selected
            </p>
            <button
              className="text-sm text-blue-600"
              onClick={() => {
                setDeletedCameras([
                  ...deletedCameras,
                  ...selectedCameras,
                ]);
                setSelectedCameras([]);
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          ""
        )}
        {deletedCameras.length > 0 ? (
          <div className="flex gap-4 bg-white rounded-md p-2 items-center flex-wrap">
            <p className="text-sm text-gray-500">
              {deletedCameras.length} camera(s) in trash
            </p>
            <button
              className="text-sm text-blue-600"
              onClick={() => setDeletedCameras([])}
            >
              Restore
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TableActions;
