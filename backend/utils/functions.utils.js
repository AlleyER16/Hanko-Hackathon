exports.sanitizePayload = (data, acceptableFields) => {
  const sanitizedData = {};

  acceptableFields.forEach((field) => {
    if (!(`${field}` in data)) return;
    sanitizedData[field] = data[field];
  });

  return sanitizedData;
};

exports.getPagination = (numRecords, division) => {
  if (!numRecords) return 0;

  const pages = Math.floor(numRecords / division);

  return numRecords % division > 0 ? pages + 1 : pages;
};

exports.getSkip = (page, division) => (page - 1) * division;
