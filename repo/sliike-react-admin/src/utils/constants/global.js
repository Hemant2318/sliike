export const userType = [{ value: "beautician" }, { value: "client" }];

export const commonFilter = [
  { value: "All", id: "" },
  { value: "Active", id: 1 },
  { value: "Inactive", id: 0 },
];

export const genderlist = [
  { value: "Male", id: "Male" },
  { value: "Female", id: "Female" },
  // { value: "Other", id: "Other" },
];

export const priceRangeList = [
  { value: "$0 - $50", id: "0 - 50", min: "0", max: "50" },
  { value: "$50 - $100", id: "50 - 100", min: "51", max: "100" },
  { value: "$100 - $200", id: "100 - 200", min: "101", max: "200" },
  { value: "$200 - $300", id: "200 - 300", min: "201", max: "300" },
  { value: "$300 - $400", id: "300 - 400", min: "301", max: "400" },
  { value: "$500 - $1000", id: "500 - 1000", min: "501", max: "1000" },
  { value: "$1000 +", id: "1000", min: "1001", max: "9999999" },
];

export const appoitmentStatus = [
  { value: "Upcoming", id: 1 },
  { value: "Completed", id: 2 },
  { value: "Cancelled", id: 3 },
  { value: "No-show", id: 4 },
];

export const productSalesStatus = [
  { value: "Delivered", id: 1 },
  { value: "Pending", id: 2 },
  { value: "Cancelled", id: 3 },
];

export const sendToList = [
  { value: "Beauticians", id: "Beautician" },
  { value: "Clients", id: "Client" },
  { value: "All", id: "All" },
  { value: "Unregistered", id: "unRegistered" },
];

export const targetAudienceList = [
  { value: "All", id: 0 },
  { value: "Men", id: 1 },
  { value: "Women", id: 2 },
  { value: "Young people", id: 3 },
  { value: "Men & Women", id: 4 },
  { value: "Seniors", id: 5 },
];

export const contractTypeList = [
  { value: "New", id: 0 },
  { value: "Renewal", id: 1 },
];

export const sliikePlanList = [
  { value: "Sliike Basic", id: "Sliike Basic" },
  { value: "Sliike Pro", id: "Sliike Pro" },
  { value: "Sliike Premium", id: "Sliike Premium" },
];

export const sizeSelectList = [
  { value: "ml", id: "ml" },
  { value: "l", id: "l" },
  { value: "Fl.oz.", id: "Fl.oz." },
  { value: "g", id: "g" },
  { value: "kg", id: "kg" },
  { value: "gal", id: "gal" },
  { value: "oz", id: "oz" },
  { value: "lb", id: "lb" },
  { value: "cm", id: "cm" },
  { value: "ft", id: "ft" },
  { value: "in", id: "in" },
  { value: "whole product", id: "whole product" },
];

export const serviceType = [
  { value: "Men's Hair", id: 0 },
  { value: "Adult's Hair", id: 1 },
  { value: "Child's Hair", id: 2 },
  { value: "Women's Hair", id: 3 },
];

export const durationList = [
  { value: "30 min", id: "00:30" },
  { value: "45 min", id: "00:45" },
  { value: "60 min", id: "01:00" },
  { value: "1.5 hours", id: "01:30" },
  { value: "2 hours", id: "02:00" },
  { value: "2.5 hours", id: "02:30" },
  { value: "3 hours", id: "03:00" },
  { value: "3.5 hours", id: "03:30" },
  { value: "4 hours", id: "04:00" },
  { value: "4.5 hours", id: "04:30" },
  { value: "5 hours", id: "05:00" },
  { value: "5.5 hours", id: "05:30" },
  { value: "6 hours", id: "06:00" },
  { value: "6.5 hours", id: "06:30" },
  { value: "7 hours", id: "07:00" },
  { value: "7.5 hours", id: "07:30" },
  { value: "8 hours", id: "08:00" },
  { value: "8.5 hours", id: "08:30" },
  { value: "9 hours", id: "09:00" },
  { value: "9.5 hours", id: "09:30" },
  { value: "10 hours", id: "10:00" },
  { value: "10.5 hours", id: "10:30" },
  { value: "11 hours", id: "11:00" },
  { value: "11.5 hours", id: "11:30" },
  { value: "12 hours", id: "00:00" },
];

export const tempServiceCate = [
  { value: "Hair Care", id: 1 },
  { value: "Makeup", id: 2 },
  { value: "Nails", id: 3 },
  { value: "Barber", id: 4 },
  { value: "Facial", id: 5 },
  { value: "Massage", id: 6 },
  { value: "Spa", id: 7 },
  { value: "Tattoo", id: 8 },
  { value: "Photography", id: 9 },
  { value: "Beauty", id: 10 },
];

export const intervalTimeOption = [
  { value: "15 min", id: "00:15" },
  { value: "30 min", id: "00:30" },
  { value: "45 min", id: "00:45" },
  { value: "60 min", id: "01:00" },
];

export const adminRoles = [
  { value: " Sub-admin", id: "subAdmin" },
  { value: "Delegated Super Admin", id: "superAdmin" },
];

export const parallelClientOption = [
  { value: "1", id: 0 },
  { value: "2", id: 1 },
  { value: "3", id: 2 },
  { value: "4", id: 3 },
  { value: "5", id: 4 },
  { value: "6", id: 5 },
];

export const priceStatusOptions = [
  { value: "Fixed", id: 1 },
  { value: "Seasonal", id: 2 },
];

export const daysOptions = [
  { value: "Monday", id: 1 },
  { value: "Tuesday", id: 2 },
  { value: "Wednesday", id: 3 },
  { value: "Thursday", id: 4 },
  { value: "Friday", id: 5 },
  { value: "Saturday", id: 6 },
  { value: "Sunday", id: 7 },
];

export const timeIntervals = [];
// Loop through hours from 0 to 23
for (let hour = 0; hour < 24; hour++) {
  // Loop through minutes from 0 to 50 in increments of 10
  for (let minute = 0; minute <= 50; minute += 15) {
    // Format the hour and minute as a string
    const hourStr = hour.toString().padStart(2, "0");
    const minuteStr = minute.toString().padStart(2, "0");
    // Create the time interval string in HH:MM format
    const timeInterval = `${hourStr}:${minuteStr}`;
    // Push the time interval to the array
    timeIntervals.push({ time: timeInterval });
  }
}

// Now, timeIntervals will contain the list of time intervals from 00:00 to 23:50
