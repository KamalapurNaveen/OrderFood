import Modal from "antd/es/modal/Modal"

export default function CustomModel({children, isVisible, closeModel}){
    return  ( 
        <Modal
            visible={isVisible}
            onCancel={closeModel}
            footer={null}
            centered
            closable={false}
            style={{ borderRadius: '0' }}
        >
            {children}
        </Modal>
    )
}