import { useEffect, useMemo, useState } from "react";
import CloudSvg from "../../../assets/images/svg/cloud.svg";
import DeviceSvg from "../../../assets/images/svg/device.svg";
import NotInterestedSvg from "../../../assets/images/svg/delete.svg";
import WarningSvg from "../../../assets/images/svg/warning.svg";
import ArrowLeftLeft from "../../../assets/images/svg/arrowLeftLeft.svg";
import ArrowLeft from "../../../assets/images/svg/arrowLeft.svg";
import StatusChange from "../../../assets/images/svg/statusChange.svg";
import { useUpdateStatusMutation } from "../../../lib/api/cameraApi";

const statusColor = {
  Online: "bg-emerald-500",
  Offline: "bg-red-500",
};

const badgeColor = {
  A: "border-emerald-500 text-emerald-600", // Excellent
  B: "border-lime-500 text-lime-600", // Good
  C: "border-yellow-500 text-yellow-600", // Warning
  D: "border-orange-500 text-orange-600", // Degraded
  E: "border-red-500 text-red-600", // Critical
  F: "border-rose-600 text-rose-700", // Failed
  "-": "border-gray-400 text-gray-400", // Unknown
};

const columnWidth = {
  checkbox: "min-w-[50px]",
  name: "min-w-[220px]",
  health: "min-w-[130px]",
  location: "min-w-[140px]",
  recorder: "min-w-[140px]",
  tasks: "min-w-[50px]",
  status: "min-w-[110px]",
  actions: "min-w-[90px]",
};

function HealthBadge({ value }) {
  return (
    <span
      className={`w-5 h-5 rounded-full border text-xs flex items-center justify-center font-semibold ${badgeColor[value]}`}
    >
      {value}
    </span>
  );
}

export default function CameraTable({
  status,
  location,
  searchTerm,
  setSearchTerm,
  setLocation,
  setStatus,
  cameraList,
  isLoading,
  deletedCameras,
  setDeletedCameras,
  selectedCameras,
  setSelectedCameras,
}) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [updateStatus] = useUpdateStatusMutation();

  const filteredCameras = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return cameraList.filter((camera) => {
      const statusMatch = status === "All" || camera.status === status;

      const locationMatch = location === "All" || camera.location === location;

      const searchMatch =
        !search ||
        camera.name?.toLowerCase().includes(search) ||
        camera.email?.toLowerCase().includes(search) ||
        camera.health.device?.toLowerCase().includes(search) ||
        camera.health.cloud?.toLowerCase().includes(search) ||
        camera.tasks?.toLowerCase().includes(search) ||
        camera?.recorder?.toLowerCase().includes(search) ||
        camera?._id?.toLowerCase().includes(search) ||
        camera.location?.toLowerCase().includes(search);

      return (
        statusMatch &&
        locationMatch &&
        searchMatch &&
        !deletedCameras.includes(camera._id)
      );
    });
  }, [cameraList, status, location, searchTerm, deletedCameras]);

  const paginatedCameras = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredCameras.slice(start, end);
  }, [filteredCameras, page, perPage]);

  const totalPages = Math.ceil(filteredCameras.length / perPage);

  useEffect(() => {
    setPage(1);
  }, [status, location, perPage]);

  const getEndPages = useMemo(() => {
    if (page * perPage > filteredCameras.length) {
      return filteredCameras.length;
    }
    return page * perPage;
  }, [filteredCameras, perPage, page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border">
        {paginatedCameras && paginatedCameras.length > 0 ? (
          <>
            <div className="max-h-[38rem] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-gray-50 sticky top-0">
                  <tr className="text-left text-[#7E7E7E]">
                    <th className="p-3">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          console.log(e.target.checked);

                          if (e.target.checked) {
                            setSelectedCameras(
                              paginatedCameras.map((item) => item._id)
                            );
                          } else {
                            setSelectedCameras([]);
                          }
                        }}
                        checked={paginatedCameras.every((item) =>
                          selectedCameras.includes(item._id)
                        )}
                      />
                    </th>
                    <th className={`p-3 ${columnWidth.name}`}>NAME</th>
                    <th className={`p-3 ${columnWidth.health}`}>HEALTH</th>
                    <th className={`p-3 ${columnWidth.location}`}>LOCATION</th>
                    <th className={`p-3 ${columnWidth.recorder}`}>RECORDER</th>
                    <th className={`p-3 ${columnWidth.tasks} text-center`}>TASKS</th>
                    <th className={`p-3 ${columnWidth.status} text-center`}>STATUS</th>
                    <th
                      className={`p-3 ${columnWidth.actions} text-center flex items-center justify-center`}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCameras.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-none hover:bg-gray-50"
                      onClick={() => {
                        if (selectedCameras.includes(item._id)) {
                          setSelectedCameras(
                            selectedCameras.filter((i) => i !== item._id)
                          );
                        } else {
                          setSelectedCameras([...selectedCameras, item._id]);
                        }
                      }}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedCameras.includes(item._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCameras([
                                ...selectedCameras,
                                item._id,
                              ]);
                            } else {
                              setSelectedCameras(
                                selectedCameras.filter((i) => i !== item._id)
                              );
                            }
                          }}
                        />
                      </td>

                      <td className="p-2">
                        <div className="flex items-start gap-2">
                          <span
                            className={`w-2 h-2 mt-2 rounded-full ${
                              statusColor[item.current_status]
                            }`}
                            title={item.current_status}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-[#7E7E7E]">
                                {item.name}
                              </p>
                              {item.hasWarning && (
                                <img
                                  src={WarningSvg}
                                  alt="Warning"
                                  className="w-4 h-4"
                                  title="Warning"
                                />
                              )}
                            </div>
                            <p className="text-xs text-gray-400">{item._id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-2">
                        <div className="flex gap-2">
                          <div className="flex flex-row items-center gap-1">
                            <img
                              src={CloudSvg}
                              alt="Cloud"
                              className="w-4 h-4"
                              title="Cloud"
                            />
                            <p className="text-xs text-[#7E7E7E]">
                              <HealthBadge value={item.health.cloud} />
                            </p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <img
                              src={DeviceSvg}
                              alt="Device"
                              className="w-4 h-4"
                              title="Device"
                            />
                            <p className="text-xs text-[#7E7E7E]">
                              <HealthBadge value={item.health.device} />
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-2 text-gray-700">{item.location}</td>
                      <td className="p-2 text-gray-700">
                        {item.recorder || "-"}
                      </td>
                      <td className="p-2 text-center">{item.tasks}</td>

                      <td className="p-2 text-center">
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            item.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-2 text-gray-400 flex items-center justify-center">
                        {/* Status Change Api Not Working even when payload is right */}
                        {/* {
                            "status": 404,
                            "message": "Sorry can't find that!"
                        } */}

                        {/* <button
                          title="Change Status"
                          className="mr-2"
                          onClick={() =>
                            handleStatusChange(
                              item.id,
                              item.status === "Active" ? "Inactive" : "Active"
                            )
                          }
                        >
                          <img
                            src={StatusChange}
                            alt="Change Status"
                            className="w-6 h-6"
                          />
                        </button> */}
                        <button title="Remove Camera">
                          <img
                            src={NotInterestedSvg}
                            alt="Delete"
                            className="w-5 h-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletedCameras([...deletedCameras, item._id]);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-4 p-4 text-sm text-[#7E7E7E]">
              <select
                className="border border-gray-300 rounded-md px-4 py-1 text-[0.8rem]"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>
                {(page - 1) * perPage + 1}–{getEndPages} of{" "}
                {filteredCameras.length}
              </span>
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                title="First Page"
              >
                <img src={ArrowLeftLeft} alt="First" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                title="Previous Page"
              >
                <img src={ArrowLeft} alt="Previous" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                title="Next Page"
              >
                <img
                  src={ArrowLeft}
                  alt="Next"
                  className="w-4 h-4 rotate-180"
                />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                title="Last Page"
              >
                <img
                  src={ArrowLeftLeft}
                  alt="Last"
                  className="w-4 h-4 rotate-180"
                />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48">
            <p className="p-4 text-[#7E7E7E]">No data available</p>
          </div>
        )}
      </div>
    </>
  );
}
