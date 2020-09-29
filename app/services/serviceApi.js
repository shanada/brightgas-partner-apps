// const serverUrl = "mydomain"

function getUrlApi(url, bodyParams) {
  return {
    //USER (UNTUK DETAIL GUNAKAN ALAMAT YANG SAMA, HANYA SAJA DITAMBAHKAN PARAMETER ID PADA STRUKTUR BODY API)
    "userRegisterPost": `${serverUrl}user/register`, // done
    "userCulinaryGet": `${serverUrl}user/kuliner?${bodyParams}`, //done
    "userMenuGet": `${serverUrl}user/makanan?${bodyParams}`, // done
    "userMenuSearchGet": `${serverUrl}user/search?${bodyParams}`, // done
    "userSliderGet": `${serverUrl}slider?${bodyParams}`, // done
    "userNewsGet": `${serverUrl}user/news?${bodyParams}`, // done
    "userVoucherOwnedGet": `${serverUrl}user/kupon_user?${bodyParams}`, //done
    "userVoucherAvailableGet": `${serverUrl}user/kupon?${bodyParams}`, //done
    "userVoucherClaimPost": `${serverUrl}user/kupon_user`, //done
    //OUTLET (UNTUK DETAIL GUNAKAN ALAMAT YANG SAMA, HANYA SAJA DITAMBAHKAN PARAMETER ID PADA STRUKTUR BODY API)
    "outletRegisterPost": `${serverUrl}/outlet/register`, // done
    "outletMenuGet": `${serverUrl}outlet/makanan?${bodyParams}`, // done
    "outletMenuDelete": `${serverUrl}outlet/makanan`, // done
    "outletClaimVoucherPost": `${serverUrl}outlet/kupon`, // done
    "outletMenuAddPost": `${serverUrl}outlet/makanan`, // done
    "outletProfileEditPost": `${serverUrl}outlet/profile_kuliner`,
    // GENERAL
    "loginPost": `${serverUrl}/login`
  }[url];
}

const headers = {
  'content-type': 'application/x-www-form-urlencoded'
}

const headersFile = {
  'content-type': 'multipart/form-data'
}

const setFormData = (body) => {
  const formData = new FormData()
  Object.keys(body).forEach(key => {
    if (key == 'img' && body.img != "") {
      formData.append("img", {
        name: body.img.fileName,
        type: body.img.type,
        uri: body.img.uri
      })
    } else {
      formData.append(key, body[key]);
    }
  });
  return formData
}

const setUrlEncodedForm =(body)=>{
  let urlEncodedForm = []
  for (var property in body) {
    let encodedKey = encodeURIComponent(property)
    let encodedValue = encodeURIComponent(body[property])
    urlEncodedForm.push(encodedKey + "=" + encodedValue)
  }
  let finalForm = urlEncodedForm.join("&")
  return finalForm
}

// method to get data from url api
async function getService(url, bodyParams) {
  let finalBody = bodyParams == undefined ?
    null :
    Object.entries(bodyParams).join("&").replace(/,/g, "=")
  let urlApi = getUrlApi(url, finalBody)
  try {
    let response = await fetch(urlApi, {
      headers: headers
    })
    let responseJson = await response.json()
    // console.warn(responseJson)
    return responseJson
  } catch (error) {
    console.warn('Error is: ' + error);
  }
}

// method to post data from url api
async function postService(url, body, formType) {
  let urlApi = getUrlApi(url)
  let finalHeaders = formType == "FORMDATA" ? headersFile : headers
  let finalBody = formType == "FORMDATA" ? setFormData(body) : setUrlEncodedForm(body)
  console.log(finalBody)
  try {
    let response = await fetch(urlApi, {
      method: 'POST',
      headers: finalHeaders,
      body: finalBody
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.warn(`Error is : ${error}`);
  }
};

// method to delete data from url api
async function deleteService(url, body) {
  let urlApi = getUrlApi(url)
  let finalBody = setUrlEncodedForm(body)
  try {
    let response = await fetch(urlApi, {
      method: 'DELETE',
      headers,
      body: finalBody
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.warn(`Error is : ${error}`);
  }
};

// method to set timeout of request
function timeoutService(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeoutService"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export { getService, postService, deleteService, timeoutService }
