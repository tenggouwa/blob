import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Card, Link } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";


const AppPage = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1) }>{count}</button>
      <Button type="primary" onClick={() => setCount(count + 1) }>{count}</Button>
      <Card style={{ width: 360 }}
        title='Arco Card'
        extra={<Link>More</Link>}
      >
        ByteDance's core product, Toutiao ('Headlines'), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </div>
  )
}

ReactDOM.render(
  <AppPage />,
  document.getElementById('root')
);