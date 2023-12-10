export const getRooms = (requestData) => {
  return {
    method: 'GET',
    path: '/rooms',
    requestData: requestData
  }
};

export const getRoom = (requestData) => {
  return {
    method: 'GET',
    path: '/room',
    requestData: requestData
  }
};

export const postEditRoom = (requestData) => {
  return {
    method: 'POST',
    path: '/room/edit',
    requestData: requestData
  }
}

export const postJoinRoom = (requestData) => {
  return {
    method: 'POST',
    path: '/room/join',
    requestData: requestData
  }
}

export const deleteExitRoom = (requestData) => {
  return {
    method: 'DELETE',
    path: '/room/exit',
    requestData: requestData
  }
}