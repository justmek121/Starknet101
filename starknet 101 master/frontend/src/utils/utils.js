import { cairo } from "starknet"
export const processData = (textValue) => {
    const lines = textValue.split("\n");
    let amountList = [];
    let addressList = [];
    let totalAmount = 0
    lines.map((line) => {
      if (
        line.includes(" ") ||
        line.includes(",") ||
        line.includes("=") ||
        line.includes("\t")
      ) {
        let [address, value] = line.split(/[,= \t]+/);
        value = Number(value * 1e18);
        totalAmount = totalAmount + value;
        amountList.push((cairo.uint256(value)).low);
        addressList.push(address);
      }
    })
    if(lines.length === addressList.length && addressList.length === amountList.length){
        return ({total:totalAmount,amountList:amountList,addressList:addressList});
    }
    return undefined;
}
