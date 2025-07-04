export function initRibbons() {
    const canvas = document.getElementById("ribbonsCanvas");
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
  
    const text = "WE BUY TRAFFIC";
    const purple = "#73265b";
    const yellow = "#ecab19";
    const speed = 1;
    const gapBetween = 37;
  
    let purpleOffset = 0;
    let yellowOffset = 0;
  
    function getRibbonHeight() {
      return window.innerWidth <= 768 ? 43 : 61;
    }
  
    function getCanvasHeight() {
      return window.innerWidth <= 768 ? 135 : 188;
    }
  
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = getCanvasHeight();
    }
  
    function drawRibbon({ color, fromX, fromY, toX, toY, textOffset, direction }) {
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
      const ribbonHeight = getRibbonHeight();
  
      ctx.save();
      ctx.translate(fromX, fromY);
      ctx.rotate(angle);
  
      ctx.fillStyle = color;
      ctx.fillRect(0, -ribbonHeight / 2, length, ribbonHeight);
  
      const fontSize = window.innerWidth <= 768 ? 16 : 24;
      ctx.font = `bold ${fontSize}px Exo, Arial, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.lineWidth = 1;
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
  
      const textWidth = ctx.measureText(text).width;
      const fullStep = textWidth + gapBetween;
  
      let drawIndex = 0;
      for (let i = -length; i < length * 2; i += fullStep) {
        const offset = direction === "right" ? i + textOffset : i - textOffset;
        drawIndex % 2 === 0
          ? ctx.fillText(text, offset, 0)
          : ctx.strokeText(text, offset, 0);
        drawIndex++;
      }
  
      ctx.restore();
      return fullStep;
    }
  
    function render() {
      resizeCanvas();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const w = canvas.width;
      const h = canvas.height;
      const ribbonHeight = getRibbonHeight();
      const half = ribbonHeight / 2;
  
      const yellowStep = drawRibbon({
        color: yellow,
        fromX: 0,
        fromY: h - half,
        toX: w,
        toY: 0 + half,
        textOffset: yellowOffset,
        direction: "right",
      });
  
      const purpleStep = drawRibbon({
        color: purple,
        fromX: 0,
        fromY: 0 + half,
        toX: w,
        toY: h - half,
        textOffset: purpleOffset,
        direction: "left",
      });
  
      yellowOffset = (yellowOffset + speed) % (yellowStep * 2);
      purpleOffset = (purpleOffset + speed) % (purpleStep * 2);
  
      requestAnimationFrame(render);
    }
  
    render();
    window.addEventListener("resize", resizeCanvas);
  }