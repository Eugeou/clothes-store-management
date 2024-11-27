'use client';

import AppLoading from '@/components/shared/app-loading/AppLoading';

import { useAuth } from '@/hooks/useAuth'
import { selectAuth } from '@/redux/slices/auth.slice'
import { StoreLogin } from '@/types/entities/auth-entity'
import { useAppSelector } from '@/types/redux/redux'
import { Col, Form, Image, Input, Row, Typography, Button } from 'antd'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const { onLogin, isLoading } = useAuth()

  const accessToken = localStorage.getItem('accessToken')
  console.log('accessToken: ', accessToken)

  const [form] = Form.useForm()
  const handleSubmit = async (values: StoreLogin) => {
    await onLogin(values)
    console.log('values: ', values , 'isLoading: ', isLoading, 'onLogin: ', onLogin)
  }
  const { user } = useAppSelector(selectAuth)
  const navigate = useRouter().push
//   useEffect(() => {
//     if (user) navigate('/brand')
//   }, [user])

  return (
    <div className='login-page w-screen h-screen flex justify-center items-center backdrop-blur-md bg-[url("/login-bg.png")] bg-center bg-no-repeat flex-col gap-14 p-24'>
      {isLoading && <AppLoading />}
      <div className='shadow-xl rounded-3xl p-8 bg-opacity-45 bg-blue-600 backdrop-blur '>
        <Row gutter={[12, 12]}>
          <Col span={24} className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-center text-white'>Login</h1>
            <Form form={form} onFinish={handleSubmit} layout='vertical'>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                <Form.Item 
                    name='username' 
                    label= {<h2 className='font-semibold text-lg text-white'>User name (Email)</h2>}
                    rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
                  <Input className='text-lg p-3' type='email' placeholder='Nhập email của bạn'
                  />
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item 
                    name='password' 
                    label= {<h2 className='font-semibold text-lg text-white'>Password</h2>}
                    rules={[{ required: true, message: 'Vui lòng nhập password' }]}>
                  <Input
                    className='text-lg p-3'
                    type='password'
                    placeholder='Nhập mật khẩu của bạn'
                  />
                </Form.Item>
                <Link href='/forgot-password'>
                  <Typography.Text className='text-lg text-white underline'>Forgot password</Typography.Text>
                </Link>
                </Col>

                <Col span={24} className='p-8'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='w-full p-6 hover:bg-[#85cfed] bg-blue-900'
                    loading={isLoading}
                  >
                    <Typography.Text className='text-xl font-semibold text-white'>Đăng nhập</Typography.Text>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* <Col span={12} className='flex justify-center'>
            <Image src='/bg-3.png' preview={false} width={400} height={400} />
          </Col> */}
        </Row>
      </div>
    </div>
  )
}

export default LoginPage