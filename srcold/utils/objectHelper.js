export function getObjectDescendant(obj, query) {
  let arr = query.split(".");
  let objVal = obj;
  while (arr.length && (objVal = objVal[arr.shift()]))
  return objVal;
}
