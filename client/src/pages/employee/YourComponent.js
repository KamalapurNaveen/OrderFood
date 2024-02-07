import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const YourComponent = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url('background.jpg')`, /* Your background image URL */
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px' /* Set your desired height */
        }}
      >
        <div
          className="content"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent black background */
            padding: '20px',
            color: 'white', /* Text color */
            textAlign: 'center'
          }}
        >
          <Title>Hello, World!</Title>
          <Paragraph>This is a black text on an opaque background image.</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
