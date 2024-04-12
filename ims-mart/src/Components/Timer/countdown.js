const countdown = (targetDate) => {
    const now = new Date();
    const timeDifference = targetDate - now;
  
    if (timeDifference < 0) {
      return "Time's up!";
    }
  
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');
  
    return `Time left ${days} Days ${hours}:${minutes}:${seconds}`;
};
  
export default countdown;
