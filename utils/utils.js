function log(msg) {
  console.log("*******************************");
  console.log(`************ ${msg} ***********`);
  console.log("*******************************");
}

function array2Obj(arr, keyAttr) {
  let obj = {};
  for (let item of arr) {
    obj[item[keyAttr]] = item;
  }

  return obj;
}

function cleanContentURLS(content) {
  if(!content) {return;}
  return content.replace(/((http(s)?):\/\/)?marriedfriends.in\/blog/g, "");
}

/*
 *function writeToPublic(content, name) {
 *  fs.writeFileSync(`public/${name}`, content, "utf-8");
 *}
 */

module.exports = {
  log,
  array2Obj,
  cleanContentURLS
};
