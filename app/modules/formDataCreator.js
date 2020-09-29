async function createFormData(photo, body){
    const data = new FormData();
  
    data.append("imageFile", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri
    });
  
    // Object.keys(body).forEach(key => {
    //   data.append(key, body[key]);
    // });
  
    return data;
  };

  export  { createFormData }