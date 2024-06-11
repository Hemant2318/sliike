import React, { useEffect, useState } from "react";
import CustomDropdown from "components/form/Dropdown/Dropdown";
import Button from "components/form/Button/Button";
import { useDispatch } from "react-redux";
import { getFeedback } from "store/globalSlice";
import Table from "components/layouts/Table/Table";
import { titleCaseString } from "utils/helpers";
import { Modal } from "react-bootstrap";
import { userType } from "utils/constants";

const Feedback = () => {
  const dispatch = useDispatch();
  const [answerPopup, setAnswerPopup] = useState(null);
  const [selectOption, setSelectOption] = useState(userType[0].value);
  const [tableData, setTableData] = useState({
    loading: true,
    data: [],
  });

  const fetchFeedback = async (selectOption) => {
    setTableData(() => {
      return {
        loading: true,
      };
    });
    const response = await dispatch(getFeedback(selectOption));
    if (response?.status === 200) {
      setTableData((prev) => {
        return {
          ...prev,
          data: response?.data,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchFeedback(selectOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption]);

  const headers = [
    {
      title: "Id",
    },
    {
      title: "Name",
    },
    {
      title: "Subject",
    },
    {
      title: "Descriptions",
    },
    {
      title: "Email",
    },
    {
      title: "Mobile No",
    },
  ];
  const rowData = [];
  tableData?.data?.map((elem, index) => {
    const { memberDetails, description, subject } = elem;
    let obj = [
      {
        value: <div className="text-nowrap">{memberDetails?.uid}</div>,
      },
      {
        value: (
          <div className="text-nowrap">
            {titleCaseString(memberDetails?.firstName)}{" "}
            {titleCaseString(memberDetails?.lastName)}
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{subject}</div>,
      },
      {
        value: (
          <div>
            <div
              className="p-1 bg-dashboard-primary color-white d-flex justify-content-center w-fit rounded pointer"
              onClick={() => {
                setAnswerPopup({
                  content: `${description}`,
                  question: `${subject}`,
                });
              }}
            >
              View
            </div>
          </div>
        ),
      },
      {
        value: <div className="text-nowrap">{memberDetails?.email}</div>,
      },
      {
        value: <div className="text-nowrap">{memberDetails?.phoneNumber}</div>,
      },
    ];
    rowData.push({ data: obj });
  });

  return (
    <div id="feedback-container" className="cmt-24 card-effect cps-24 cpe-24">
      {answerPopup && (
        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show
          onHide={() => {
            setAnswerPopup(null);
          }}
        >
          <Modal.Body>
            <div className="p-3">
              <div className="text-16-600 color-black-100 d-flex gap-2">
                Subject:
                <div className="color-dashboard-primary">
                  {answerPopup?.question}
                </div>
              </div>
              <div className="mt-2 text-16-600 color-black-100 d-flex gap-2">
                Description:
                <div className="color-dashboard-primary">
                  {answerPopup?.content}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-20-700 color-dashboard-primary">Feedback</div>
        <div className=" cmt-30 d-flex align-items-center gap-3 cmb-24">
          <CustomDropdown
            id="useFor"
            value={selectOption}
            options={userType}
            onChange={(e) => {
              setSelectOption(e.target.value);
            }}
            optionKey="value"
            optionValue="value"
          />
          {/* <Button
            className="cpt-25 cpb-25"
            btnText="ADD"
            btnStyle="PD"
            // onClick={() => {
            //   setShowPopup(true);
            // }}
          /> */}
        </div>
      </div>

      <div>
        <Table
          header={headers}
          rowData={rowData}
          isLoading={tableData.loading}
          tableData={tableData}
        />
      </div>
    </div>
  );
};

export default Feedback;
