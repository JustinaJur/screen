import { groupBy } from "lodash";

export const filterClientsByService = (data, serviceStatus) => {
  const filteredClientsByService = data.filter(
    client => client.serviceProvided === serviceStatus
  );

  return filteredClientsByService;
};

export const filterClientsByDoctor = data => {
  const filteredClientsByDoctor = groupBy(
    data,
    client => client.selectedDoctor
  );
  return filteredClientsByDoctor;
};

export const getClientIndex = (value, array, propertyName) => {
  for (let index = 0; index < array.length; index++) {
    if (array[index][propertyName] === value) {
      return index;
    }
  }
  return -1;
};
