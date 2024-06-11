import Button from "components/form/Button";
import { icons } from "utils/constants";
import UserProfile from "components/layouts/UserProfileLayout";
import MenuOption from "components/layouts/MenuOption";
import { useNavigate } from "react-router-dom";
import PostInput from "components/form/PostInput";
import "./Gist.scss";

const Gist = () => {
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
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
      time: "2/4/2022",
      status: "0",
    },
  ];
  return (
    <div className="row cps-24 cpe-24 cmt-24">
      <div className="col-md-6">
        <div className="card-effect cps-24 cpe-24 cpt-22">
          <div className="text-20-700 color-dashboard-primary">Gists</div>
          <div className="d-flex gap-4 align-items-center">
            <Button btnText="Nov 2022" iconType="R-Filter" btnStyle="PLO" />
            <Button
              btnText="Deleted"
              className="cps-20 cpe-20"
              btnStyle="PLO"
              leftIcon={<img src={icons.darkTrash} alt="add" />}
            />
            <div>
              <img src={icons.search} alt="search" className="pointer" />
            </div>
          </div>
          <div className="chat-list">
            {chatList.map((elem, index) => {
              return (
                <div key={index} className="chat-item">
                  <div className="profile-message-block">
                    <UserProfile size="50" status={elem?.status || ""} />
                    <div>
                      <div
                        className="message-block pointer"
                        onClick={() => {
                          navigate("/gist/1");
                        }}
                      >
                        {elem.message}
                      </div>
                      <div className="msg-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <UserProfile size="30" />
                          <div className="text-15-500 color-black-70">
                            + 25 people
                          </div>
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
              <PostInput label="Post Gist" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gist;
