// Similar to lodash/sample but with a string seed
function random(array, seed) {
  // Sum the ASCII codes of each letter
  const number = seed.split('').reduce((number, letter) => {
    return number + letter.charCodeAt(0);
  }, 0);
  // Get "random" index using modulus
  return array[number % array.length];
}

export default random;
