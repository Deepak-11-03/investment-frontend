const generatePassword = (name: string, phone: string) => {
    const namePart = name.split(" ")[0].toLowerCase();
    const phonePart = phone.slice(-4);
    const randomPart = Math.random().toString(36).slice(-4);
    return `${namePart[0]?.toUpperCase()}${namePart}${phonePart}${randomPart}`;
  };

  export default generatePassword;