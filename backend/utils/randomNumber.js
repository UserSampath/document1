import randomNumber from 'random-number';

const generateRandomNumber =async () => {
    const options = {
        min: 10000000, 
        max: 99999999,
        integer: true 
    }
    return randomNumber(options);
}

export default generateRandomNumber;