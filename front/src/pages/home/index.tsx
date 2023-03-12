import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Spin } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { availableLocales } from '@/i18n/i18nUtils';
import StarRating from '../../components/starRating';
import './index.scss'

const FormItem = Form.Item;

const Home = () => {
  const [canvasList, setCanvasList] = useState<any>([])
  const homeRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changLan = () => {
    const locales = availableLocales();
    const a = locales[(locales.indexOf(i18n.resolvedLanguage) + 1) % locales.length];
    i18n.changeLanguage(a)
  }
  useEffect(() => {
    const canList = Array.from({length: 4000}, v => (Math.random() * 5).toFixed(1))
    setCanvasList(canList);
  }, [])

  const handleTop = () => {
    homeRef!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  return (
    <div className="form" ref={homeRef}>
      <Button onClick={changLan}>切换语言</Button>
      <Button type='primary' onClick={() => navigate('/login')}>去登录</Button>
      <p>{t('hello')}</p>
      <div className="spin">
        <Spin dot />
      </div>
      <Form autoComplete='off'>
        <FormItem label='Username'>
          <Input placeholder='please enter your username...' />
        </FormItem>
        <FormItem label='Post'>
          <Input placeholder='please enter your post...' />
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Checkbox>I have read the manual</Checkbox>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5 }}>
          <Button type='primary'>Submit</Button>
        </FormItem>
      </Form>

      <StarRating value={1.3} />
      {
        canvasList.map((item:number, id:number) => (
          <StarRating key={id} value={item} />
        ))
      }
      <div
        onClick={() => handleTop()}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1, background: 'yellow', width:'30px', height: '30px'}}> Top </div>
    </div>
    
  )
}



export default Home;