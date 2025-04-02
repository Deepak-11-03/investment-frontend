const generatePassword = (name: string, phone: string): string => {
  const namePart = name.split(" ")[0].toLowerCase();
  const phonePart = phone.slice(-4);
  const randomPart = Math.random().toString(36).slice(-4);

  const specialChars = "!@#$%&*";
  let specialChar = specialChars[Math.floor(Math.random() * specialChars.length)];

  let password = `${namePart[0]?.toUpperCase()}${namePart}${phonePart}${randomPart}${specialChar}`;

  // Ensure password length is between 8 and 12 characters
  if (password.length > 12) {
    // Trim while keeping at least one special character
    password = password.slice(0, 11) + specialChar;
  } else if (password.length < 8) {
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  }

  return password;
};

  export default generatePassword;