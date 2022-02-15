const randomOrder = (type, arrQuestions) => {
  const newArrQuestions = [];
  if (type === 'multiple') {
    for (let index = arrQuestions.length - 1; index >= 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * arrQuestions.length);
      newArrQuestions.push(arrQuestions[randomIndex]);
      arrQuestions.splice(randomIndex, 1);
    }
    return newArrQuestions;
  }
  const randomIndex = Math.floor(Math.random() * arrQuestions.length);
  return [...new Set([...arrQuestions, arrQuestions[randomIndex]])];
};

export default randomOrder;
