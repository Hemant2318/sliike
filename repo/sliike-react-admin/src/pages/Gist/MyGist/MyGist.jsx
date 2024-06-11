import UserProfileLayout from "components/layouts/UserProfileLayout";
import PostInput from "components/form/PostInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGistDetail } from "store/globalSlice";
import { objectToQueryParams, titleCaseString } from "utils/helpers";
import moment from "moment";
import Loader from "components/layouts/Loader";
import { useNavigate } from "react-router-dom";
import "./MyGist.scss";

const MyGist = () => {
  // const videoRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myGistData, setMyGistData] = useState({
    loading: true,
    data: [],
  });
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isPlaying, setPlaying] = useState(false);
  const { permissionsData } = useSelector((state) => ({
    permissionsData: state.global.permissionsData,
  }));

  const access = {
    gistsMenu: permissionsData?.gistSettings?.[0],
  };
  const gistPermission = access?.gistsMenu;

  // const list = [
  //   {
  //     message:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
  //     time: "4:30pm",
  //   },
  //   {
  //     message:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
  //     time: "10:30pm",
  //   },
  // ];

  const getMyGistData = async () => {
    const queryParams = objectToQueryParams({ member_type: "superAdmin" });
    const response = await dispatch(fetchMyGistDetail(queryParams));
    if (response?.status === 200) {
      setMyGistData((prev) => {
        return {
          ...prev,
          data: response?.data || [],
          loading: false,
        };
      });
    }
  };
  useEffect(() => {
    getMyGistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  setTimeout(() => {
    setIsSuccess(false);
  }, 2000);
  return (
    <div className="cps-24 cpe-24 cmt-24 row h-100">
      <div
        className={
          gistPermission?.all
            ? "col-md-6 position-relative cmb-24"
            : "position-relative"
        }
      >
        {isSuccess && (
          <div className="success-conteiner d-flex gap-2 align-items-center rounded">
            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
              <i className="bi bi-check d-flex" />
            </span>
            <span className="text-14-500 color-white">Posted</span>
          </div>
        )}
        {myGistData?.loading ? (
          <div className="card-effect d-flex justify-content-center align-items-center pt-5 pb-5">
            <Loader size="md" />
          </div>
        ) : (
          <div className="card-effect cps-24 cpe-24 cpt-22 cpb-24 my-gist-block">
            <div className="text-20-700 color-dashboard-primary">My Gist</div>
            <div className="my-gist-list">
              {myGistData?.data?.map((elem, index) => {
                const {
                  _id: id,
                  clientProfileImage,
                  message,
                  audioFile,
                  title,
                  lastResponse,
                  clientMessages,
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
                        <UserProfileLayout size="50" url={clientProfileImage} />
                        <div className="message-content">
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
                                        <UserProfileLayout
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
              })}
            </div>
          </div>
        )}
      </div>
      {gistPermission?.all && (
        <div className="col-md-6">
          <div className="d-flex flex-column post-container">
            <div className="flex-grow-1 d-flex align-items-end">
              <div className="card-effect w-100 cps-24 cpe-24 cpt-24 cpb-40">
                <PostInput
                  label="Post Gist"
                  myGist
                  setIsSuccess={setIsSuccess}
                  myGistSuccess={() => {
                    getMyGistData();
                  }}
                />
                {/* <div className="d-flex cmt-20">
                  <Button
                    btnText="Post"
                    btnStyle="PD"
                    className="pt-1 pb-1 h-auto"
                    onClick={() => {
                      setIsSuccess(true);
                      setTimeout(() => {
                        setIsSuccess(false);
                      }, 2000);
                    }}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyGist;
