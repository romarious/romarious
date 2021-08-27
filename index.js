// Create function to convert given string to the output below

// Input
const optionRule = '{1069} AND ({1070} OR {1071} OR {1072}) AND {1244} AND ({1245} OR {1339})';

function parseItem(syntaxElements, from = 0) {
  let result = {};
  let values = [];
  let operator;
 
  for (let i = from; i < syntaxElements.length; i++) {
    switch (syntaxElements[i]) {
   
      // writing the values after the curly brace into an array
      case "{":
        values.push(+syntaxElements[i+1]);
      break

      // on this element, we need to select the values inside the brackets and write them separately,
      // we run the function recursively and exit it by ")", also changing the current position to
      // the position ")"
      case "(": {
        const resultTemp = parseItem(syntaxElements, i+1)
        values.push(resultTemp.result)
        i = resultTemp.i;
        break
      }
     
      case ")":
        return {result, i};
     
     // forming the final object based on the first operator, AND or OR.
      case "AND":
        if (operator && operator !== 'and') {
          values = [result];
          result = {
            and: values
          }
        } else {
          result.and = values;
          operator = 'and'
        }
      break
     
      case "OR":
      if (operator && operator !== 'or') {
          values = [result];
          result = {
            or: values
          }
        } else {
         result.or = values;
        operator = 'or';
        }
      break
     
      default:
        break
      }    
  }
  return result;
}

function parseString(input) {
// splitting the string into elements and leaving only the necessary characters
  const syntax = input.split(/((?:\(|\)|\{|\}|\s+|\d+|AND|OR))/gi).map(s => s.trim()).filter(x => x);
  return parseItem(syntax);
}

console.log(parseString(optionRule))

// Output Example
/* const output = {
  and: [
    1069,
    { or: [1070, 1071, 1072] },
    1244,
    { or: [1245, 1339] },
  ]
}; */
