import Button from "components/form/Button/Button";
import CheckBox from "components/form/CheckBox/CheckBox";
import SearchInput from "components/form/SearchInput/SearchInput";
import Loader from "components/layouts/Loader/Loader";
import { omit } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllClient } from "store/globalSlice";

import { objectToQueryParams } from "utils/helpers";

const ClientListPopup = ({ onHidePopup, sendDataToParent, oldIds }) => {
  const dispatch = useDispatch();
  const listInnerRef = useRef();
  const [searchValue, setSearchValue] = useState();
  const [timer, setTimer] = useState("");
  const [checkedID, setCheckedID] = useState([...oldIds]);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [clientData, setClientData] = useState({
    search: "",
    loading: true,
    data: [],
    total: "",
  });

  const fetchAllClientList = async (obj) => {
    const queryParams = objectToQueryParams(
      omit(obj, ["data", "loading", "total"])
    );
    const response = await dispatch(getAllClient(queryParams));
    if (response?.status === 200) {
      setClientData((prev) => {
        return {
          ...prev,
          data: response?.data?.clientData || [],
          loading: false,
          total: response?.data?.count || 0,
        };
      });
    }
  };

  useEffect(() => {
    fetchAllClientList(clientData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPrevPage(currPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, prevPage]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const allClient = clientData?.data?.map((a) => a?._id);
      setCheckedID(allClient);
    } else {
      setCheckedID([]);
    }
  };

  const handleClientChange = (e, o) => {
    if (e.target.checked) {
      setCheckedID([...checkedID, o?._id]);
    } else {
      setCheckedID(checkedID.filter((item) => item !== o?._id));
    }
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
    let time = timer;
    clearTimeout(time);
    time = setTimeout(() => {
      let oldData = { ...clientData, search: value, loading: true };
      setClientData(oldData);
      fetchAllClientList(oldData);
    }, 800);
    setTimer(time);
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="d-flex justify-content-between color-dashboard-primary cmb-20">
          <div className="text-20-700 color-dashboard-primary">Client list</div>
          <div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onHidePopup}
            />
          </div>
        </div>

        <div className="col-md-12 cmb-20">
          <SearchInput
            placeholder="Search client"
            className="w-100"
            value={searchValue}
            onChange={handleSearch}
            // style={{ width: "fit-content" }}
          />
        </div>

        {clientData?.loading ? (
          <div className="d-flex justify-content-center align-items-center pt-5 pb-5">
            <Loader size="sm" />
          </div>
        ) : (
          <>
            {clientData?.data?.length === 0 ? (
              <div className="no-data-found text-center text-17-700 color-gray pt-5 pb-5">
                No data found
              </div>
            ) : (
              <>
                <div className="border-bottom pb-1 cmb-20">
                  <CheckBox
                    label={`Select All (${clientData?.total})`}
                    checked={checkedID.length === clientData?.data?.length}
                    onChange={handleCheckAll}
                    id="selectAll"
                  />
                </div>
                <div
                  className="cmb-20"
                  onScroll={onScroll}
                  ref={listInnerRef}
                  style={{ height: "30vh", overflowY: "auto" }}
                >
                  {clientData?.data?.map((o) => {
                    return (
                      <CheckBox
                        label={`${o?.firstName} ${o?.lastName}`}
                        value={`${o?.firstName} ${o?.lastName}`}
                        id={o?._id}
                        key={o?._id}
                        checked={checkedID.includes(o?._id)}
                        onChange={(e) => {
                          handleClientChange(e, o);
                        }}
                      />
                    );
                  })}
                </div>
                <div className="d-flex gap-3">
                  <Button
                    className="h-auto cps-15 cpe-15 cpt-8 cpb-8 text-13-500-21"
                    btnStyle="GO"
                    btnText="CANCEL"
                    onClick={() => {
                      setCheckedID([]);
                    }}
                  />
                  <Button
                    className="h-auto cps-15 cpe-15 cpt-8 cpb-8 text-13-500-21"
                    btnStyle="PD"
                    btnText="DONE"
                    onClick={() => {
                      let names = [];
                      clientData?.data
                        ?.filter((o) => checkedID?.includes(o?._id))
                        ?.forEach((e) => {
                          names.push(`${e.firstName} ${e.lastName}`);
                        });
                      let count = names.length - 3;
                      sendDataToParent({
                        id: checkedID,
                        name: `${names.slice(0, 3).join(", ")} ${
                          count > 0 ? `+${count}` : ""
                        }`,
                      });
                      // sendDataToParent({
                      //   target: { id: "clientIds", value: checkedID },
                      // });
                      // dispatch(
                      //   setCheckClientList([
                      //     {
                      //       checkedID,
                      //       checkName,
                      //     },
                      //   ])
                      // );

                      onHidePopup();
                    }}
                  />
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ClientListPopup;
