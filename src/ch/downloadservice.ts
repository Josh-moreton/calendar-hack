/**
 * Download calendar using the saveAs function from filesave.js
 * @param  {string} filename Filename
 * @param  {string} ext      Extention
 */
export function download(events: string, filename: string, ext: string) {
  if (!events) {
    return false;
  }

  ext = typeof ext !== "undefined" ? ext : ".ics";
  filename = typeof filename !== "undefined" ? filename : "calendar";
  var blob = new Blob([events], { type: "text/x-vCalendar;charset=utf8;" });
  downloadBlob(blob, `${filename}.${ext}`);
}

function downloadBlob(blob: Blob, filename: string) {
  // Create an object URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element
  const a = document.createElement("a");

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || "download";

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      //this.removeEventListener('click', clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener("click", clickHandler, false);

  // Programmatically trigger a click on the anchor element
  // Useful if you want the download to happen automatically
  // Without attaching the anchor element to the DOM
  // Comment out this line if you don't want an automatic download of the blob content
  a.click();

  // Return the anchor element
  // Useful if you want a reference to the element
  // in order to attach it to the DOM or use it in some other way
  return a;
}
