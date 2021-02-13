import React, { useState } from 'react'
import Router from 'next/router'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { Cookies } from 'react-cookie'
import { loginAPI } from '../api/auth/login'
import { registerAPI } from '../api/auth/register'
import FormRegister, { IFormRegister } from './FormRegister'

const cookies = new Cookies()

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
}


const Login = () => {
    const [visibleModal, setVisibleModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        const { username, password, remember } = values
        const response = await loginAPI(username, password)
            .catch(err => {
                notification.error({
                    message: 'Error',
                    description: err.response?.data?.detail || 'Can not access to server'
                })
                return { data: null }
            })
        if (response && response.data) {
            const { access_token: token } = response.data

            if (remember) {
                cookies.set('token', token)
            }
            notification.success({ message: 'Success', description: 'Login successfully' })
            // go to /game
            Router.push('/game')
        }
        setLoading(false)
    }

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo)
    // }

    const onSubmitRegister = async ({ username, password }: IFormRegister) => {
        await registerAPI(username, password)
            .then(() => {
                notification.success({ message: 'Success', description: 'Register successfully' })
                setVisibleModal(false)
            })
            .catch(err => {
                notification.error({
                    message: 'Error',
                    description: err.response?.data?.detail || 'Can not access to server'
                })
            })
    }

    return (
        <>
            <FormRegister
                title='Register New Account'
                okText='Register'
                visible={visibleModal}
                onSubmit={onSubmitRegister}
                onCancel={() => { setVisibleModal(false) }}
            />
            <Form
                {...layout}
                className='form-login'
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 6, message: 'Username must be at least 6 chars' },
                    ]}
                >
                    <Input maxLength={20} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 8, message: 'Password must be at least 8 chars' },
                    ]}
                >
                    <Input.Password maxLength={20} />
                </Form.Item>

                <div className='login-tail'>
                    <Form.Item className='remember-form' name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </div>
                <span className='login-footer'>Not a member? <a onClick={() => { setVisibleModal(true) }}>Signup now</a></span>
            </Form>
        </>
    )
}

export default Login