type validFilesObject = {
  [key: string]: string[];
};
export const validFileExtensions: validFilesObject = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

export const getValidExtensions = (key: string) => {
  return validFileExtensions[key]
    .map((value) => {
      return `${key}/${value}`;
    })
    .toString();
};

export const isValidFileType = (fileName: string, type: string) => {
  let fileType = fileName.split(".").pop();
  return fileType ? validFileExtensions[type].includes(fileType) : false;
};
