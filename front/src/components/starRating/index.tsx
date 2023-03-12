import React, { useEffect, useRef } from "react";

interface IStarRatingProps {
  value: number
  width?: number
  height?: number
}
interface drawProps {
  x:number, y:number, r:number, R:number, rot:number, index:number
}
const StarRating:React.FC<IStarRatingProps> = ({
  value = 0,
  width = 70,
  height = 20
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    init();
  }, [])
  const init = () => {
    const { current: canvas } = canvasRef;
    const ratio = 4;
    const context = canvas!.getContext('2d');
    const width = canvas!.width = 70;
    const height = canvas!.height = 20;
    canvas!.height = height * ratio; // 实际渲染像素
    canvas!.width = width * ratio; // 实际渲染像素
    context!.scale(ratio, ratio);

    const ratingColor = '#FF9B25';
    const starColor = 'rgba(0,0,0,0.08)';
    const borderColor = 'white';
    const borderWidth = 0;

    const starNum = 5;
    const step = 0.1;
    // const toFixed = 1;
    const starGap = 0;
    const oneStarPercent = 100 / starNum;
    const oneStepPercent = oneStarPercent * step;
    const starWidth = Math.floor((width - starNum * starGap) / starNum);
    let percent = 0;
    let rate = value;

    const degree = 72;

    const drawRating = (value:number) => {
      const stepNum = Math.ceil(value / oneStepPercent);
      percent = stepNum * oneStepPercent;
      draw()
    }

    const draw = () => {
      for (let i = 0; i < starNum; i++) {
        drawStar({
          x: starWidth / 2 + i * (starWidth + starGap) + starGap / 2, 
          y: height / 2, 
          r: starWidth / 4, 
          R: starWidth / 2, 
          rot: 0, 
          index: i
        } as drawProps)
      }
    }

    const drawStar = (props: drawProps) => {
      const {x, y, r, R, rot, index} = props;
      // console.log(x, R, x - R,  x + R);
      const gradient = context!.createLinearGradient(x - R, 0 , x + R, 0)
      const stop = Math.min(Math.max((index + 1) * oneStarPercent - percent, 0), oneStarPercent)

      rate = (oneStarPercent - stop) / oneStarPercent
      
      gradient.addColorStop(rate, ratingColor)
      gradient.addColorStop(Math.min(1, rate), starColor)
      context!.beginPath();
      for (let i = 0; i < 360 / degree; i ++) {
        context!.lineTo( Math.cos( (18 + i * degree - rot) / 180 * Math.PI) * R + x,
                  -Math.sin( (18 + i * degree - rot) / 180 * Math.PI) * R + y)
        context!.lineTo( Math.cos( (54 + i * degree - rot) / 180 * Math.PI) * r + x,
                  -Math.sin( (54 + i * degree - rot) / 180 * Math.PI) * r + y)
      }
      context!.closePath();
      context!.lineWidth = borderWidth;
      context!.fillStyle = gradient;
      context!.strokeStyle = borderColor;
      context!.lineJoin = "round";

      context!.fill();
      context!.stroke();
    }
    percent = rate * oneStarPercent;
    drawRating(percent);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <canvas ref={canvasRef} style={{ width: width, height: height}} />
      <span style={{ fontSize: '10px', fontWeight: '300' }}>{value}</span>
    </div>
  )
}


export default StarRating;
