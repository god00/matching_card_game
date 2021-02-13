import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';

export interface IFormRegister {
    username: string
    password: string
    confirmPassword?: string
}

type Props = {
    visible?: boolean
    title?: string
    okText?: string
    cancelText?: string
    onSubmit?: (values: IFormRegister) => any
    onCancel?: () => any
}

const FormRegisterModal = (props: Props) => {
    const {
        visible = false,
        title,
        okText,
        cancelText,
        onSubmit = () => { },
        onCancel,
    } = props
    const [form] = Form.useForm()
    const [formVisible, setFormVisible] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const onCancelWarpper = async () => {
        if (onCancel) {
            await onCancel()
        } else {
            setFormVisible(false)
        }
    }

    useEffect(() => {
        form.resetFields()
    })


    useEffect(() => {
        setFormVisible(visible)
    }, [visible])

    return (
        <Modal
            wrapProps={{ 'aria-labelledby': 'register-modal' }}
            title={title}
            style={{ top: '15%' }}
            visible={formVisible}
            okText={okText || 'OK'}
            cancelText={cancelText || 'Cancel'}
            onOk={() => {
                form.validateFields()
                    .then(async (values: IFormRegister) => {
                        setWaiting(true)
                        const { username, password } = values
                        await onSubmit({ username, password })
                        setWaiting(false)
                    })
            }}
            okButtonProps={{ loading: waiting }}
            onCancel={onCancelWarpper}
            getContainer={false}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="username" label="Username" rules={[
                    { required: true, message: 'Please input username' },
                    { min: 6, message: 'Username must be at least 6 chars' },
                    { max: 20, message: 'Username must be less than or equal 20 chars' },
                ]}>
                    <Input maxLength={20} />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[
                    { required: true, message: 'Please input password' },
                    { min: 8, message: 'Password must be at least 8 chars' },
                    { max: 20, message: 'Password must be less than or equal 20 chars' },
                ]}>
                    <Input type='password' maxLength={20} />
                </Form.Item>
                <Form.Item name="confirmPassword" label="Confirm Password" rules={[
                    { required: true, message: 'Please input confirm password' },
                    { min: 8, message: 'ConfirmPassword must be at least 8 chars' },
                    { max: 20, message: 'ConfirmPassword must be less than or equal 20 chars' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    })]}>
                    <Input type='password' maxLength={20} />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default FormRegisterModal;