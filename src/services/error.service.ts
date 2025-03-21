export const errorHandler = (error:any) => {
    if (error.message === "Network Error" && error.status === 500) {
      return error.message;
    }
    return error
  };