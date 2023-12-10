export const getPlayers = (requestData) => {
  return {
    method: "GET",
    path: "/players",
    requestData: requestData,
  };
};

export const getPlayer = (requestData) => {
  return {
    method: "GET",
    path: "/player",
    requestData: requestData,
  };
};
