import Button from "components/form/Button";
import { icons } from "utils/constants";
import UserProfile from "components/layouts/UserProfileLayout";
import { useNavigate } from "react-router-dom";
import PostInput from "components/form/PostInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllGists } from "store/globalSlice";
import {
  getMonthList,
  objectToQueryParams,
  titleCaseString,
} from "utils/helpers";
import { omit } from "lodash";
import moment from "moment";
import Dropdown from "components/form/Dropdown";
import Loader from "components/layouts/Loader";
import SearchInput from "components/form/SearchInput";
import "./Gist.scss";

const Gist = () => {
  // const videoRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [yearText, setYearText] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  // const [isPlaying, setPlaying] = useState(false);
  const [isSearch, setIsSearch] = useState(null);
  const [gistsData, setGistsData] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    user: "superAdmin",
    search: "",
    loading: true,
    data: [],
  });
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));

  const access = {
    gistsMenu: permissionsData?.gistSettings?.[0],
  };
  const gistPermission = access?.gistsMenu;

  const getAllGists = async (data) => {
    const queryParams = objectToQueryParams(omit(data, ["data", "loading"]));
    const response = await dispatch(fetchAllGists(queryParams));
    if (response?.status === 200) {
      setGistsData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    if (gistPermission?.falsecount !== 3) {
      getAllGists(gistsData);
      setYearText(getMonthList(12)[0].id);
    } else {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...gistsData, search: value, loading: true };
      setGistsData(oldData);
      getAllGists(oldData);
    }, 800);
    setTimer(time);
  };

  // const handlePlay = () => {
  //   if (videoRef?.current && videoRef.current.play) {
  //     videoRef.current.play();
  //     setPlaying(true);
  //   }
  // };
  // const handlePause = () => {
  //   if (videoRef?.current && videoRef.current.play) {
  //     videoRef.current.pause();
  //     setPlaying(false);
  //   }
  // };

  return (
    <div className="row cps-24 cpe-24 cmt-24">
      <div className="col-md-6 cmb-24">
        <div className="card-effect cps-24 cpe-24 cpt-22 gist-data-block">
          <div className="text-20-700 color-dashboard-primary">Gists</div>
          <div className="d-flex gap-4 align-items-center flex-wrap">
            <div className="d-flex">
              <Dropdown
                placeholder="Year"
                value={yearText}
                options={getMonthList(12).map((o) => {
                  return { ...o, name: o.id };
                })}
                optionValue="name"
                onChange={(e) => {
                  let oldData = {
                    ...gistsData,
                    startDate: moment(e.target.value)
                      .startOf("month")
                      .format("DD-MM-YYYY"),
                    endDate: moment(e.target.value)
                      .endOf("month")
                      .format("DD-MM-YYYY"),
                    loading: true,
                  };
                  setYearText(e.target.value);
                  setGistsData(oldData);
                  getAllGists(oldData);
                }}
              />
            </div>
            {/* {gistPermission?.all && (
              <Button
                btnText="Deleted"
                className="cps-20 cpe-20"
                btnStyle="PLO"
                leftIcon={<img src={icons.darkTrash} alt="add" />}
              />
            )} */}

            <div>
              {isSearch ? (
                <SearchInput
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearch}
                />
              ) : (
                <img
                  src={icons.search}
                  alt="search"
                  className="pointer"
                  onClick={() => {
                    setIsSearch(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className="chat-list">
            {gistsData?.loading && (
              <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
                <Loader size="md" />
              </div>
            )}
            {!gistsData?.loading &&
              (gistsData?.data?.length === 0 ? (
                <div className="no-data color-gray">No Records Found.</div>
              ) : (
                gistsData?.data?.map((elem, index) => {
                  const {
                    _id: id,
                    clientProfileImage,
                    clientMessages,
                    lastResponse,
                    message,
                    title,
                    audioFile,
                  } = elem;
                  const count =
                    clientMessages?.length >= 3 && clientMessages?.length - 3;
                  return (
                    <div className="mt-3" key={index}>
                      <span className="color-dashboard-primary text-15-600">
                        {titleCaseString(title)}
                      </span>
                      <div className="chat-item">
                        <div
                          className="profile-message-block pointer"
                          onClick={() => {
                            navigate(`/gist/${id}`);
                          }}
                        >
                          <UserProfile
                            size="50"
                            status={elem?.status || ""}
                            url={clientProfileImage}
                          />
                          <div className="message-container-block">
                            {audioFile ? (
                              <div className="audio-block">
                                {/* <ReactPlayer
                                  ref={videoRef}
                                  width="100%"
                                  height="40px"
                                  url={audioFile}
                                  controls={true}
                                  playing={isPlaying}
                                  onPlay={handlePlay}
                                  onPause={handlePause}
                                  // onError={(error) => {
                                  //   console.error(error);
                                  // }}
                                /> */}

                                <audio
                                  className="audio-play"
                                  src={audioFile}
                                  controls
                                  controlsList="nodownload noplaybackrate"
                                />
                              </div>
                            ) : (
                              <div className="message-block">{message}</div>
                            )}

                            <div className="msg-bottom">
                              <div className="d-flex align-items-center gap-2">
                                <div className="d-flex ms-2">
                                  {clientMessages.length > 0 &&
                                    clientMessages.slice(0, 3).map((o, i) => {
                                      return (
                                        <div
                                          className="profile-image-container"
                                          key={i}
                                        >
                                          <UserProfile
                                            size="30"
                                            url={o?.profileImage}
                                          />
                                        </div>
                                      );
                                    })}
                                </div>
                                <div className="text-15-500 color-black-70">
                                  {count && `+ ${count} people`}
                                </div>
                              </div>
                              <div className="text-11-500 color-black-80">
                                {moment(lastResponse).utc().format("hh:mm A")}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="option-chat">
                          <MenuOption
                            icon={<img src={icons.threeDots} alt="menu" />}
                            option={[
                              {
                                icon: <img src={icons.eyeSlash} alt="hide" />,
                                text: "Hide Gist",
                                onClick: () => {},
                              },
                              gistPermission?.all && {
                                icon: <img src={icons.trash} alt="delete" />,
                                text: "Delete Gist",
                                onClick: () => {},
                              },
                            ]}
                          />
                        </div> */}
                      </div>
                    </div>
                  );
                })
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column post-container">
          <div className="d-flex justify-content-end">
            <Button
              btnText="MY GISTS"
              btnStyle="PD"
              className="cps-20 cpe-20"
              leftIcon={
                <img
                  src={icons.lightMessages}
                  alt="add"
                  style={{
                    height: "24px",
                  }}
                />
              }
              onClick={() => {
                navigate("/gist/my-gist");
              }}
            />
          </div>
          {gistPermission?.all && (
            <div className="flex-grow-1 d-flex align-items-end">
              <div className="card-effect w-100 cps-24 cpe-24 cpt-24 cpb-40">
                <PostInput
                  label="Post Gist"
                  handelSuccess={() => {
                    getAllGists(gistsData);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Gist;
