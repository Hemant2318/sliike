import MenuOption from "components/layouts/MenuOption";
import { icons } from "utils/constants";
import "./MyGist.scss";
import UserProfileLayout from "components/layouts/UserProfileLayout";
import PostInput from "components/form/PostInput";
import Button from "components/form/Button";
import { useState } from "react";

const MyGist = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const list = [
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
      time: "4:30pm",
    },
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed lacus id metus semper dictum...",
      time: "10:30pm",
    },
  ];
  return (
    <div className="cps-24 cpe-24 cmt-24 row h-100">
      <div className="col-md-6 position-relative">
        {isSuccess && (
          <div className="success-conteiner d-flex gap-2 align-items-center rounded">
            <span className="bg-white pt-1 pb-1 ps-1 pe-1 rounded">
              <i className="bi bi-check d-flex" />
            </span>
            <span className="text-14-500 color-white">Posted</span>
          </div>
        )}
        <div className="card-effect cps-24 cpe-24 cpt-22 cpb-24">
          <div className="text-20-700 color-dashboard-primary">My Gist</div>
          <div className="my-gist-list">
            {list.map((elem, index) => {
              return (
                <div key={index} className="chat-item">
                  <div className="profile-message-block">
                    <UserProfileLayout size="50" status={elem?.status || ""} />
                    <div>
                      <div
                        className="message-block pointer"
                        onClick={() => {
                          // navigate("/gist/1");
                        }}
                      >
                        {elem.message}
                      </div>
                      <div className="msg-bottom">
                        <UserProfileLayout size="30" />
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
          <div className="flex-grow-1 d-flex align-items-end">
            <div className="card-effect w-100 cps-24 cpe-24 cpt-24 cpb-40">
              <PostInput label="Reply post" />
              <div className="d-flex cmt-20">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyGist;
