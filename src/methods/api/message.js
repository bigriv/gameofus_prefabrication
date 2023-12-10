export const getUnreadMessage = (requestData) => {
  return {
    method: "GET",
    path: "/message/recieve",
    requestData: requestData,
  };
};

export const getAllMessage = (requestData) => {
  return {
    method: "GET",
    path: "/message/all_recieve",
    requestData: requestData,
  };
};

export const postSendMessage = (requestData) => {
  return {
    method: "POST",
    path: "/message/send",
    requestData: requestData,
  };
};
