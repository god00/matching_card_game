import React from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd'
import { Cookies } from 'react-cookie'
import { loginAPI } from '../api/auth/login'

const cookies = new Cookies()

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
}


const Login = () => {
    const onFinish = async (values: any) => {
        const { username, password, remember } = values
        const response = await loginAPI(username, password)
            .catch(err => {
                notification.error({
                    message: 'Error',
                    description: err.message
                })
                return { data: null }
            })
        if (response && response.data) {
            const { access_token: token } = response.data

            if (remember) {
                cookies.set('token', token)
            }
            notification.success({ message: 'Success', description: 'Login successfully' })
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            {...layout}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <div className='login-tail'>
                <Form.Item className='remember-form' name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default Login