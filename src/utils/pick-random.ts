export default function pickRandomObjects(array, numToPick) {
  if (numToPick > array.length) {
    console.log("Error: Number to pick exceeds array length.");
    return [];
  }

  const shuffledArray = array.slice(); // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, numToPick);
}
