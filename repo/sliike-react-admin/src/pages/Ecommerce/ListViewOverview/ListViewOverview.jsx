import React from "react";
import "./ListViewOverview.scss";

const ListViewOverview = ({ dashboardArray }) => {
  return (
    <div className="list-view-overview-container">
      <div className="cardview-block">
        {dashboardArray?.map((parentElem, parentIndex) => {
          return (
            <div
              className="cardview-block-heading text-20-700 color-dashboard-primary cmb-56"
              key={parentIndex}
            >
              {parentElem?.key}
              <div className="main-card-block cmt-16">
                {parentElem?.value?.map((childElem, childIndex) => {
                  return (
                    <div
                      className="card-block  cpt-20 cpb-20 cps-24 cpe-27 d-flex flex-column"
                      key={childIndex}
                    >
                      <div className="card-block-heading text-17-700 color-dashboard-primary">
                        {childElem?.key}
                      </div>

                      {childElem?.value?.map((subChildElem, subChildIndex) => {
                        return (
                          <div
                            className="card-block-content-list text-17-700 color-dashboard-primary d-flex"
                            key={subChildIndex}
                          >
                            <div className="list-element text-15-500 color-blue-60 d-flex">
                              {subChildElem?.key && `${subChildElem?.key}:`}
                              <div className="text-15-600 color-dashboard-primary cps-9">
                                {subChildElem?.sign}
                                {subChildElem?.value}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {childElem?.title && (
                        <div className="total-list-content flex-grow-1 d-flex align-items-end">
                          <div className="text-15-500 color-blue-60">
                            {childElem?.title && `${childElem?.title}:`}
                          </div>
                          <div className="text-15-700 color-dashboard-primary cps-9">
                            {childElem?.sign}
                            {childElem?.total}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListViewOverview;
