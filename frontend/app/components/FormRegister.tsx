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
        <>
            <Modal
                title={title}
                style={{ top: 20 }}
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
                    <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input username' }]}>
                        <Input min={6} max={20} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input password' }]}>
                        <Input type='password' min={8} max={20} />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please input confirm password' }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    })]}>
                        <Input type='password' min={8} max={20} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};

export default FormRegisterModal;