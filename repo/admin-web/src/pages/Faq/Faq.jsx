import Button from "components/form/Button/Button";
import Table from "components/layouts/Table/Table";
import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { icons, userType } from "utils/constants";
import FaqPopup from "./FaqPopup";
import CustomDropdown from "components/form/Dropdown/Dropdown";
import MenuOption from "components/layouts/MenuOption/MenuOption";
import { useDispatch } from "react-redux";
import { deleteFAQ, getFAQ, throwSuccess } from "store/globalSlice";
import DeleteConfirmPopup from "components/layouts/DeleteConfirmPopup/DeleteConfirmPopup";

const Faq = () => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [answerPopup, setAnswerPopup] = useState(null);
  const [deleteId, setDeleteId] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectOption, setSelectOption] = useState(userType[0].value);
  const [tableData, setTableData] = useState({
    loading: true,
    data: [],
  });

  const fetchFAQ = async (selectOption) => {
    setTableData(() => {
      return {
        loading: true,
      };
    });
    const response = await dispatch(getFAQ(selectOption));
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
    fetchFAQ(selectOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOption]);

  const headers = [
    {
      title: "Sr No.",
    },
    {
      title: "Question",
    },
    {
      title: "Answer",
    },
    {
      title: "Actions",
    },
  ];
  const rowData = [];
  tableData?.data?.map((elem, index) => {
    const { question, answer } = elem;
    let obj = [
      {
        value: index + 1,
      },
      {
        value: <div className="text-nowrap">{question}</div>,
      },
      {
        value: (
          <div>
            <div
              className="p-1 bg-dashboard-primary color-white d-flex justify-content-center w-fit rounded   pointer"
              onClick={() => {
                setAnswerPopup({
                  content: `${answer}`,
                  question: `${question}`,
                });
              }}
            >
              View
            </div>
          </div>
        ),
      },
      {
        value: (
          <Dropdown align="end">
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <img src={icons.threeDots} alt="options" className="pointer" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setEditData(elem);
                  setShowPopup(true);
                }}
              >
                <span>
                  <img src={icons.edit} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                href=""
                className="d-flex align-items-center gap-2 mb-1"
                onClick={() => {
                  setDeleteId(elem);
                  setDeletePopup(true);
                }}
              >
                <span>
                  <img src={icons.trashIcon} alt="dashboard" />
                </span>
                <span className="mt-1 color-dashboard-primary">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ];
    rowData.push({ data: obj });
  });

  return (
    <div id="faq-container" className="cmt-24 card-effect cps-24 cpe-24">
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
                Question:
                <div className="color-dashboard-primary">
                  {answerPopup?.question}
                </div>
              </div>
              <div className="mt-2 text-16-600 color-black-100 d-flex gap-2">
                Answer:
                <div className="color-dashboard-primary">
                  {answerPopup?.content}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {showPopup && (
        <FaqPopup
          editData={editData}
          handleSuccess={() => {
            fetchFAQ(selectOption);
          }}
          onHide={() => {
            setShowPopup(false);
            setEditData(null);
          }}
        />
      )}
      {deletePopup &&
        (deleteId ? (
          <DeleteConfirmPopup
            title="FAQ"
            deleteId={deleteId}
            onHide={() => {
              setDeletePopup(false);
            }}
            apiFunction={async () => {
              await dispatch(deleteFAQ(deleteId._id));
              dispatch(throwSuccess("FAQ Deleted Successfully."));
              setDeletePopup(false);
              fetchFAQ(selectOption);
              return;
            }}
            handelSuccess={() => {
              fetchFAQ(selectOption);
            }}
          />
        ) : (
          ""
        ))}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-20-700 color-dashboard-primary">FAQ</div>
        <div className=" cmt-30 d-flex align-items-center gap-3 cmb-24">
          <CustomDropdown
            isRequired
            id="useFor"
            value={selectOption}
            options={userType}
            onChange={(e) => {
              setSelectOption(e.target.value);
            }}
            optionKey="value"
            optionValue="value"
          />
          <Button
            className="cpt-25 cpb-25"
            btnText="ADD"
            btnStyle="PD"
            onClick={() => {
              setShowPopup(true);
            }}
          />
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

export default Faq;
