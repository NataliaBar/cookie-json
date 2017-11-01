/** Extracts cookie's value and parses it to a Json object.
  * @param {string} cookieName - The name of the cookie to search in document.cookie, case sensitive.
  * @param {object} defaultObject - The default object to return if there is no cookie found or an error occured
  * @returns {object} The cookie's value of the found cookie or the defaultObject
  */
function cookieToJson(cookieName, defaultObject) {
  var result = defaultObject;

  if (document.cookie != "") {
    var cookies = document.cookie.split(";");
    
    // Find the cookie by name
    for (i = 0; i < cookies.length; i++) {
      var elements = cookies[i].split("=");
      
      if (elements[0].trim() == cookieName) {
        try {
          // Try to parse cookie's value
          result = JSON.parse(elements[1]);
        }
        catch(err) {
          result = defaultObject;
        }
        break;
      }
    }
  }

  return result;
}

/** Saves an object as a cookie's value.
  * @param {string} cookieName - The name of the new or existing cookie where the new value will be stored.
  * @param {object} myObject - The object that will be stored as the cookie's value.
  * @param {number} expDays - Optional. The number of days the cookie will be stored on user's device.
  */
function jsonToCookie(cookieName, myObject, expDays) {
  var cookie = cookieName + "=" + JSON.stringify(myObject);
  
  if (expDays != undefined) {
    var d = new Date();
    d.setTime(d.getTime() + (expDays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    
    cookie = cookie + ";" + expires;
  }

  document.cookie = cookie;
}