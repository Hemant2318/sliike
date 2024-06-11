import Button from "components/form/Button";
import { icons } from "utils/constants";
import UserProfile from "components/layouts/UserProfileLayout";
import { useNavigate, useParams } from "react-router-dom";
import PostInput from "components/form/PostInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSingleGistDetails } from "store/globalSlice";
import { titleCaseString } from "utils/helpers";
import moment from "moment";
import Loader from "components/layouts/Loader";
import "./GistDetails.scss";

const GistDetails = () => {
  // const videoRef = useRef();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  // const [isPlaying, setPlaying] = useState(false);

  const [gistDetail, setGistDetail] = useState({
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
  const navigate = useNavigate();
  // const chatList = [
  //   {
  //     message:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
  //     time: "4:30pm",
  //     status: "1",
  //   },
  //   {
  //     message:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
  //     time: "4:30pm",
  //     status: "2",
  //   },
  // ];

  const getSingleGistData = async () => {
    const response = await dispatch(fetchSingleGistDetails(id));
    if (response?.status === 200) {
      setGistDetail((prev) => {
        return {
          ...prev,
          data: response?.data || [],
          loading: false,
        };
      });
    }
  };
  useEffect(() => {
    getSingleGistData();
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

  const detail = gistDetail?.data?.[0];

  return (
    <div className="row cps-24 cpe-24 cmt-24">
      <div className="col-md-6 cmb-24">
        {gistDetail?.loading ? (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-5 card-effect">
            <Loader size="md" />
          </div>
        ) : (
          <div className="card-effect cps-24 cpe-24 cpt-22 gist-detail-block">
            <div className="d-flex justify-content-between align-items-center">
              <div />
              <div>
                <UserProfile
                  size="82"
                  status="2"
                  url={detail?.clientProfileImage}
                />
              </div>
              <div className="option-chat">
                {/* <MenuOption
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
                /> */}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center cmt-40">
              <div className="text-20-700 color-dashboard-primary">
                {titleCaseString(detail?.title)}
              </div>
              <div className="text-13-500 color-black-80">
                {moment(detail?.createdAt).utc().format("hh:mm A")}
              </div>
            </div>
            <div className="bg-light-gray-f3 text-15-500 cps-16 cpe-16 cpt-16 cpb-16 rounded">
              {detail?.message ? (
                detail?.message
              ) : (
                <>
                  {/* <ReactPlayer
                  ref={videoRef}
                  width="100%"
                  height="40px"
                  url={detail?.audioFile}
                  controls={true}
                  playing={isPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                /> */}
                  <audio
                    className="audio-play"
                    src={detail?.audioFile}
                    controls
                    controlsList="nodownload noplaybackrate"
                  />
                </>
              )}
            </div>
            <div className="border-top mt-3 mb-3" />
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-20-700 color-dashboard-primary">
                Response
              </div>
              <div className="text-13-500 color-black-80">
                {detail?.reponses?.length} Response
              </div>
            </div>
            <div className="post-list">
              {detail?.reponses?.length === 0 ? (
                <div className="no-response-data color-gray">
                  No Response Found.
                </div>
              ) : (
                detail?.reponses?.map((elem, index) => {
                  const { audioFile, clientData, createdAt, message } = elem;
                  return (
                    <div key={index} className="chat-item">
                      <div className="profile-message-block">
                        <UserProfile size="50" url={clientData?.profileImage} />
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
                            <div className="message-block bg-white border">
                              {message}
                            </div>
                          )}
                          <div className="msg-bottom">
                            {/* {gistPermission?.all && (
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                btnText="Reply"
                                btnStyle="btn-primary-light-outline"
                                className="ps-2 pe-2 h-auto pt-1"
                                onClick={() => {}}
                              />
                            </div>
                          )} */}
                            <div className="text-11-500 color-black-80">
                              {moment(createdAt).utc().format("hh:mm A")}
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
                  );
                })
              )}
            </div>
          </div>
        )}
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
                  label="Reply post"
                  handleSuccessReplay={() => {
                    getSingleGistData();
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
export default GistDetails;
