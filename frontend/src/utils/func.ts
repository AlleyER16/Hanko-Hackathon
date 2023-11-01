export const roundDP = (
  value: number | string,
  len: number,
  noCommas?: boolean
) => {
  // value = Number(value).toFixed(len);

  const [bfDec, afDec] = value.toString().split(".");

  let s = "";

  if (afDec) {
    s = afDec.slice(0, len);
  }

  for (let i = s.length; i < len; i++) {
    s += "0";
  }

  return noCommas
    ? `${bfDec}.${s}`
    : `${Number(bfDec).toLocaleString()}${len ? `.${s}` : ""}`;
};

export const getSkip = (page: number, division: number): number =>
  (page - 1) * division;

export const isNumber = (value: string) => {
  if (!value) return true;
  if ((value.match(/\./g)?.length || 0) > 1) return false;
  if (value.endsWith(".")) return true;

  const re = /^[0-9.\b]+$/;

  // if value is not blank, then test the regex
  return re.test(value);
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => {
    const interval = window.setInterval(() => {
      resolve("Woken Up");
      window.clearInterval(interval);
    }, milliseconds);
  });
};
