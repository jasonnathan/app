// const handlersPerEvent = {
//     left: [],
//     right: [],
//     up: [],
//     down: []
// };

// export default {
//     on: (direction, handler) => {
//         handlersPerEvent[direction].push(handler);
//     },

//     off: (direction, handler) => {
//         const handlerIndex = handlersPerEvent[direction].indexOf(handler);

//         if (handlerIndex > -1) {
//             handlersPerEvent[direction].splice(handlerIndex, 1);
//         }
//     }
// };

// Meteor.startup(() => {
//     // Code source:
//     // http://www.javascriptkit.com/javatutors/touchevents2.shtml

//     var touchsurface = window,
//         swipedir,
//         startX,
//         startY,
//         distX,
//         distY,
//         threshold = 150, //required min distance traveled to be considered swipe
//         restraint = 100, // maximum distance allowed at the same time in perpendicular direction
//         allowedTime = 300, // maximum time allowed to travel that distance
//         elapsedTime,
//         startTime,
//         handleswipe = function(swipedir) {
//             if (swipedir) {
//                 var handlers = handlersPerEvent[swipedir];
//                 for (var i = 0; i < handlers.length; i++) {
//                     if (typeof handlers[i] === 'function') {
//                         handlers[i]();
//                     }
//                 }
//             }
//         };

//     touchsurface.addEventListener('touchstart', function(e){
//         var touchobj = e.changedTouches[0]
//         swipedir = 'none'
//         dist = 0
//         startX = touchobj.pageX
//         startY = touchobj.pageY
//         startTime = new Date().getTime() // record time when finger first makes contact with surface
//         e.preventDefault()
//     }, false)

//     touchsurface.addEventListener('touchmove', function(e){
//         e.preventDefault() // prevent scrolling when inside DIV
//     }, false)

//     touchsurface.addEventListener('touchend', function(e){
//         var touchobj = e.changedTouches[0]
//         distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//         distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//         elapsedTime = new Date().getTime() - startTime // get time elapsed
//         if (elapsedTime <= allowedTime){ // first condition for awipe met
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
//                 swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//             }
//             else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
//                 swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
//             }
//             else {
//                 swipedir = 'none';
//             }
//         }
//         if (swipedir !== 'none') {
//             handleswipe(swipedir)
//         }
//         e.preventDefault()
//     }, false);
// });
