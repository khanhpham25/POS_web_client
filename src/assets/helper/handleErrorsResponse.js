import _ from 'lodash';

export const handleErrorsResponse = errors => {
  const errorArr = [];
  if (_.isObject(errors)) {
    for (const key in errors) {
      errors[key].map(err => {
        errorArr.push(`${_.upperFirst(key)}: ${err}`);
      });
    }
  } else {
    errorArr.push(errors);
  }
  return errorArr;
};
