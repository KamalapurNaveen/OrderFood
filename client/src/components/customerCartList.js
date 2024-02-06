import { Avatar, Button, List } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const CartList = ({updateCartItems, cartValues }) => {
    const incQuantity = (item) => {
        const newQuantity = Math.min(item.quantity + 1, item.item.max_limit);
        updateCartItems({ item: item.item, quantity: newQuantity });
    };

    const decQuantity = (item) => {
        const newQuantity = Math.max(item.quantity - 1, 0);
        updateCartItems({ item: item.item, quantity: newQuantity });
    };

    return (
        <List
            style={{ margin: 2, padding: 5, paddingLeft: 10, backgroundColor: "white", borderRadius: 5 }}
            dataSource={cartValues}
            renderItem={(item) => (
                <List.Item
                    style={{ borderRadius: 10 }}
                    actions={[
                        <Button icon={<MinusOutlined />} size="small" onClick={() => decQuantity(item)} />,
                        <span>{item.quantity}</span>,
                        <Button icon={<PlusOutlined />} size="small" onClick={() => incQuantity(item)} />,
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.item.image} shape="square" size={50} />}
                        title={<span style={{ fontWeight: 'bold' }}>{item.item.name}</span>}
                        description={<span style={{ fontWeight: 'bold' }}>₹{item.item.cost}</span>}
                    />
                    <div style={{ fontWeight: 'bold' }}>₹{item.item.cost * item.quantity}</div>
                </List.Item>
            )}
        />
    );
};

export default CartList;
