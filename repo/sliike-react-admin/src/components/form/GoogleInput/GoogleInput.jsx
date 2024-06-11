import { useDispatch } from "react-redux";
import { forEach } from "lodash";
import Autocomplete from "react-google-autocomplete";
import LabelText from "../LabelText";
import { getLocationFromGeo } from "store/globalSlice";
import "./GoogleInput.scss";

const GoogleInput = ({
  label,
  onChange,
  error,
  placeholder,
  id,
  defaultValue,
}) => {
  const dispatch = useDispatch();
  const onPlaceSelected = async (e) => {
    const { formatted_address, geometry } = e;
    const lat = geometry.location.lat();
    const long = geometry.location.lng();
    const response = await dispatch(getLocationFromGeo({ lat, long }));

    let selectedData = {};
    if (response?.data && response?.data?.results.length > 0) {
      selectedData = {
        address: formatted_address,
        latitude: lat,
        longitude: long,
      };
      const locationData = response?.data?.results[0];
      forEach(locationData?.address_components, (elm) => {
        const { long_name, types } = elm;
        selectedData[types[0]] = long_name;
      });
    }
    // console.log("selectedData e", selectedData);

    onChange(selectedData);
  };
  return (
    <div id="google-input-container">
      {label && <LabelText label={label} />}
      <div className="google-input-block">
        <Autocomplete
          apiKey={process.env.REACT_APP_MAP_API}
          onPlaceSelected={onPlaceSelected}
          placeholder={placeholder}
          id={id}
          defaultValue={defaultValue || ""}
        />
      </div>
      {error && (
        <span className="text-13-500 pt-1">
          <span style={{ color: "red" }}>{error}</span>
        </span>
      )}
      {/* <GoogleInput
  label="Location"
  placeholder="Enter location"
  error=""
  onChange={(e) => {
    console.log(e);
  }}
  /> */}
    </div>
  );
};

export default GoogleInput;
