export default function shuffle(array) {
  const shuffledArray = [...array];
  
  for (let i = 0; i < shuffledArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temp;
  }

  return shuffledArray;
}
