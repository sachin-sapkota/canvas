const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
const ctx = canvas.getContext('2d');

const balls = [];
const numBalls = 5;
const ballColors = ['red', 'blue', 'green', 'yellow', 'orange'];
const velocity = 1;
const rad = 15;

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

for (let i = 0; i < numBalls; i++) {
  const ball = {
    x: Math.random() * (canvas.width - 2 * rad) + rad,
    y: Math.random() * (canvas.height - 2 * rad) + rad,
    moveX: Math.random() < 0.5 ? -velocity : velocity,
    moveY: Math.random() < 0.5 ? -velocity : velocity,
  };
  balls.push(ball);
}

const drawMe = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    if (ball.x > canvas.width - rad || ball.x < rad) ball.moveX = -ball.moveX;
    if (ball.y > canvas.height - rad || ball.y < rad) ball.moveY = -ball.moveY;

    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const dx = ball.x - otherBall.x;
      const dy = ball.y - otherBall.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 2 * rad) {
        const normalX = dx / distance;
        const normalY = dy / distance;
        const dotProduct = ball.moveX * normalX + ball.moveY * normalY;

        ball.moveX = ball.moveX - 2 * dotProduct * normalX;
        ball.moveY = ball.moveY - 2 * dotProduct * normalY;

        otherBall.moveX = otherBall.moveX - 2 * dotProduct * normalX;
        otherBall.moveY = otherBall.moveY - 2 * dotProduct * normalY;
      }
    }

    ball.x += ball.moveX;
    ball.y += ball.moveY;

    ctx.beginPath();
    const ballColor = ballColors[i % ballColors.length];
    ctx.fillStyle = ballColor;
    ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
};

const addBallOnClick = (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const newBall = {
    x,
    y,
    moveX: Math.random() < 0.5 ? -velocity : velocity,
    moveY: Math.random() < 0.5 ? -velocity : velocity,
  };
  balls.push(newBall);
};

canvas.addEventListener('click', addBallOnClick);

setInterval(drawMe, 10);
