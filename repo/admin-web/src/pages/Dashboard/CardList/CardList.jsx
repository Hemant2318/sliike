import "./CardList.scss";

const CardList = ({ dashboardData, storeData }) => {
  // console.log("dashboardData", dashboardData);
  return (
    <div id="cardlist-container" className="">
      {/* <div className="number-of-download-container">
        <div className="text-20-700 color-dashboard-primary cmb-20">
          Total app downloads
        </div>
        <div className="number-of-downloads-details bg-white g-0 cpt-20 cpb-20 row gap-3">
          <div className="number-of-downloads-card col-md-3 d-flex flex-column cpt-10 cpb-10 cps-10 cpe-10">
            <div className="text-15-500 color-black-80 d-flex gap-2 cmb-10 text-wrap">
              <img src={icons.googlePlayIcon} alt="google" />
              Google play store
            </div>
            <div className="text-20-700 color-dashboard-primary">
              {storeData?.totalPlayStoreDownloads}
            </div>
          </div>
          <div className="number-of-downloads-card col-md-3 d-flex flex-column cpt-10 cpb-10 cps-10 cpe-10">
            <div className="text-15-500 color-black-80 d-flex gap-2 cmb-10 text-wrap">
              <img src={icons.appStoreIcon} alt="apple" />
              Apple store
            </div>
            <div className="text-20-700 color-dashboard-primary">
              {storeData?.totalAppStoreDownloads}
            </div>
          </div>
        </div>
      </div> */}

      <div className="cardview-block">
        {dashboardData?.map((parentElem, parentIndex) => {
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

export default CardList;
