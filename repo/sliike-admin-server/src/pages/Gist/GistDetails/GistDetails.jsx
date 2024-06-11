import Button from "components/form/Button";
import { icons } from "utils/constants";
import UserProfile from "components/layouts/UserProfileLayout";
import MenuOption from "components/layouts/MenuOption";
import { useNavigate } from "react-router-dom";
import PostInput from "components/form/PostInput";
import "./GistDetails.scss";

const GistDetails = () => {
  const navigate = useNavigate();
  const chatList = [
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
      time: "4:30pm",
      status: "1",
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
      time: "4:30pm",
      status: "2",
    },
  ];
  return (
    <div className="row cps-24 cpe-24 cmt-24">
      <div className="col-md-6">
        <div className="card-effect cps-24 cpe-24 cpt-22">
          <div className="d-flex justify-content-between align-items-center">
            <div />
            <div>
              <UserProfile size="82" status="1" />
            </div>
            <div className="option-chat">
              <MenuOption
                icon={<img src={icons.threeDots} alt="menu" />}
                option={[
                  {
                    icon: <img src={icons.eyeSlash} alt="hide" />,
                    text: "Hide Gist",
                    onClick: () => {},
                  },
                  {
                    icon: <img src={icons.trash} alt="delete" />,
                    text: "Delete Gist",
                    onClick: () => {},
                  },
                ]}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center cmt-40">
            <div className="text-20-700 color-dashboard-primary">Post</div>
            <div className="text-13-500 color-black-80">4:30pm</div>
          </div>
          <div className="bg-light-gray-f3 text-15-500 cps-16 cpe-16 cpt-16 cpb-16 rounded">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
            lacus id metus semper dictum. In hac habitasse platea dictumst.
            Nullam hendrerit dictum magna, vitae aliquet turpis rutrum commodo.
          </div>
          <div className="border-top mt-3 mb-3" />
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-20-700 color-dashboard-primary">Response</div>
            <div className="text-13-500 color-black-80">3 Response</div>
          </div>
          <div className="post-list">
            {chatList.map((elem, index) => {
              return (
                <div key={index} className="chat-item">
                  <div className="profile-message-block">
                    <UserProfile size="50" status={elem?.status || ""} />
                    <div>
                      <div className="message-block pointer bg-white border">
                        {elem.message}
                      </div>
                      <div className="msg-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            value="Reply"
                            btnStyle="btn-primary-light-outline"
                            className="ps-2 pe-2 h-auto pt-1"
                            onClick={() => {}}
                          />
                        </div>
                        <div className="text-11-500 color-black-80">
                          {elem.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="option-chat">
                    <MenuOption
                      icon={<img src={icons.threeDots} alt="menu" />}
                      option={[
                        {
                          icon: <img src={icons.eyeSlash} alt="hide" />,
                          text: "Hide Gist",
                          onClick: () => {},
                        },
                        {
                          icon: <img src={icons.trash} alt="delete" />,
                          text: "Delete Gist",
                          onClick: () => {},
                        },
                      ]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="d-flex flex-column h-100">
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
          <div className="flex-grow-1 d-flex align-items-end">
            <div className="card-effect w-100 cps-24 cpe-24 cpt-24 cpb-40">
              <PostInput label="Reply post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GistDetails;
