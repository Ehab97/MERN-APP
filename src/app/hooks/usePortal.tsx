import React from "react";


function createRootElement(id:string) {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
}
function addRootElement(rootElem:Element|HTMLDivElement|null) {
   if(document?.body?.lastElementChild?.nextElementSibling&&rootElem){
    document.body.insertBefore(
        rootElem,
        document?.body?.lastElementChild?.nextElementSibling
      )
    }
  }
//  export function usePortals(id:string) {
//     const rootElemRef:React.MutableRefObject= React.useRef(null);

//   React.useEffect(function setupElement() {
//     // Look for existing target dom element to append to
//     const existingParent = document.querySelector(`#${id}`);
//     // Parent is either a new root or the existing dom element
//     const parentElem = existingParent || createRootElement(id);

//     // If there is no existing DOM element, add a new one.
//     if (!existingParent) {
//       addRootElement(parentElem);
//     }

//     // Add the detached element to the parent
//     if (rootElemRef.current) {
//         parentElem.appendChild(rootElemRef.current);
//     }

//     return function removeElement() {
//         rootElemRef.current&&rootElemRef.current.remove();
//       if (!parentElem.childElementCount) {
//         parentElem.remove();
//       }
//     };
//   }, [id]);

//   function getRootElem() {
//     if (!rootElemRef.current) {
//       rootElemRef.current = document.createElement('div');
//     }
//     return rootElemRef.current;
//   }

//   return getRootElem();
// }
export function usePortal(id:string) {
    const rootElemRef = React.useRef(document.createElement('div'));
  
    React.useEffect(function setupElement() {
      // Look for existing target dom element to append to
      const parentElem = document.querySelector(`#${id}`);
      // Add the detached element to the parent
      parentElem?.appendChild(rootElemRef.current);
      // This function is run on unmount
      return function removeElement() {
        rootElemRef.current.remove();
      };
    }, [id]);
  
    return rootElemRef.current;
  }