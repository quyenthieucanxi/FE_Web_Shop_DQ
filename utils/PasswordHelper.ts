export const GenerateRandomPassword = ()  => {
    const length = 8;
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';
    const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;
  
    // Function to get a random character from a string
    const getRandomChar = (charSet) => charSet.charAt(Math.floor(Math.random() * charSet.length));
  
    // Ensure at least one character from each character set
    const password =
      getRandomChar(uppercaseChars) +
      getRandomChar(lowercaseChars) +
      getRandomChar(numericChars) +
      getRandomChar(specialChars) +
      Array.from({ length: length - 4 }, () => getRandomChar(allChars)).join('');
    const shuffledPassword = password.split('').sort(() => Math.random() - 0.5).join('');
    return shuffledPassword;
  }
 