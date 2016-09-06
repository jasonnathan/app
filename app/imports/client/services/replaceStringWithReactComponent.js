'use strict';

/**
 * Replace parts of a string with React components
 *
 * @param source {String}
 * @param replaces {Array}
 * @param replaces[] {Object}
 * @param replaces[].search {RegEx}
 * @param replaces[].convert {Function} - Function returning a React component (arg1 = current string part)
 */
// export default function replaceStringWithReactComponent (source, replaces) {
//     console.log('\n%c' + source, 'color:green;');

//     const recursiveConvert = (part, _replaces) => {
//         const replace = _replaces.shift();
//         if (!replace) {
//             return part;
//         }

//         let result = [];

//         const matches = part.match(replace.search) || [];
//         matches.forEach((match, index) => {
//             const previousResultLength = result.join('').length;
//             const matchStart = part.substring(previousResultLength).indexOf(match) + previousResultLength;

//             result.push(part.substring(previousResultLength, matchStart));
//             result.push(match);

//             if (index === matches.length - 1) {
//                 result.push(part.substring(match.length + matchStart));
//             }
//         });

//         return result.map((_part, index) => {
//             if (index % 2 === 1) {
//                 return _part.replace(replace.search, (m, ...args) => {
//                     console.log(args)
//                     // return replace.convert(_part, args);
//                 });
//             }

//             return recursiveConvert(_part, _replaces);
//         });
//     }

//     return recursiveConvert(source, replaces);
// };
