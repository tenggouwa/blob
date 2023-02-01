import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Spin } from '@arco-design/web-react';
import { useTranslation } from 'react-i18next';
import { availableLocales } from '@/i18n/i18nUtils';
import './index.scss'

const FormItem = Form.Item;

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const changLan = () => {
    const locales = availableLocales();
    const a = locales[(locales.indexOf(i18n.resolvedLanguage) + 1) % locales.length];
    i18n.changeLanguage(a)
  }
  return (
    <div className="form">
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
    </div>
    
  )
}



export default Home;