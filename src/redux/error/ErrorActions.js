export const errorActionType = {
  error: "error",
};

export const handleError = ({ error, open = true }) => (dispatch) => {
  console.log(error);
  open && alert(error.message || error);
};
