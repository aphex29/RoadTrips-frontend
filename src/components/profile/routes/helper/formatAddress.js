export const formatAddress = (address) => {
  let split = address.split(",");
  let ret = split[0]+', '+split[1];
  return ret;
}
