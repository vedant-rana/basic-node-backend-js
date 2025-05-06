function stringToEnum(enumObj, value) {
  const values = Object.values(enumObj).map((v) => String(v));
  if (values.includes(value)) {
    const matched = Object.entries(enumObj).find(
      ([_, v]) => String(v) === value
    );
    return matched ? matched[1] : undefined;
  }
  return undefined;
}

function getEnumValues(enumObj) {
  return Object.values(enumObj);
}

function enumToDropDownList(enumObj) {
  return Object.entries(enumObj).map(([key, value]) => ({
    text: key,
    value: value,
  }));
}

/*

use case : of above functions

const StatusEnum = Object.freeze({
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2
});

console.log(stringToEnum(StatusEnum, "1")); // 1
console.log(getEnumValues(StatusEnum));     // [0, 1, 2]
console.log(enumToDropDownList(StatusEnum));
// [
//   { text: 'PENDING', value: 0 },
//   { text: 'APPROVED', value: 1 },
//   { text: 'REJECTED', value: 2 }
// ]

*/
