
const child = document.querySelector('.rotator');
  let rotation = 0;

  setInterval(() => {
    rotation += 180;
    child.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
  }, 5000);




