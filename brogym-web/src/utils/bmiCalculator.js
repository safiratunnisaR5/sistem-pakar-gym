export const calculateBMI = (weight, height) => {
  const h = height / 100;
  const bmi = weight / (h * h);
  return parseFloat(bmi.toFixed(2));
};

export const getBMICategory = (bmi) => {
  if (bmi >= 25) return 'K1';
  if (bmi >= 18.5) return 'K2';
  return 'K3';
};

export const getBMILabel = (bmi) => {
  if (bmi >= 25) return 'Overweight';
  if (bmi >= 18.5) return 'Normal';
  return 'Underweight';
};