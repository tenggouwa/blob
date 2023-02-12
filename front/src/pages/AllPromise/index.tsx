import React, { useRef, useEffect } from "react"
import apis from '../../fetch/index';
import './index.scss';

function rgbColor(){
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  let rgb = `rgb(${r},${g},${b})`;
  return rgb;
}

const ListLen = Array(10).fill(1);
export default function AllPromise() {

  const queue:any = useRef([]);

  useEffect(() => {
    ListLen.forEach((item, index) => {
      queue.current.push(() => getState(index))
    })
    setTimeout(() => {
      console.log(99999);
      
      queueLoop();
    }, 2000);
  }, [])


  const queueLoop = async () => {
    const Queue = queue.current;
    const maxCurrentLen = 3;
    while (Queue.length > 0) {
      if (Queue.length >= maxCurrentLen) {
        try {
          const p:any = await Promise.all(Queue.slice(0, maxCurrentLen).map((item:any) => item()))
          if (p) {
            console.log('success');
          }
        } catch (error) {
          
        } finally {
          Queue.splice(0, maxCurrentLen)
        }
      } else {
        try {
          const p:any = await Queue[0]
          if (p) {
            console.log('success');
          }
        } catch (error) {
          
        } finally {
          Queue.shift()
        }
      }
    }
  }

  
  const getState = async(index:number) => {
    console.log('!!!!!');
    try {
      const res = await apis.fetchTest({ index });
    } catch (error) {
      
    }
  }
  return (
    <ul className="promise">
      {
        ListLen.map((item, index) => (
          <li style={{ backgroundColor: rgbColor() }}>
            {index}
          </li>
        ))
      }
    </ul>
  )
}
