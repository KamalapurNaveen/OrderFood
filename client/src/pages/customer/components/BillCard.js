import Typography from 'antd/es/typography/Typography';

export default function BillCard({ totalCost }) {
    const subtotal = (totalCost * 0.95).toFixed(2);
    const gst = (totalCost * 0.05).toFixed(2);
    const roundedTotalCost = totalCost.toFixed(2);

    return (
        <div style={{ margin: 2, padding: 15, paddingLeft: 10, backgroundColor: "white", borderRadius: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Typography style={{ fontWeight: 900, fontSize: 14 }}>Subtotal</Typography>
                <Typography style={{ fontWeight: 900, fontSize: 14 }}>₹{subtotal}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize:10 }}>
                <Typography>GST(5%)</Typography>
                <Typography>₹{gst}</Typography>
            </div>
            <hr style={{ margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography style={{ fontWeight: 900, fontSize: 14 }}>Total Cost</Typography>
                <Typography style={{ fontWeight: 900, fontSize: 14 }}>₹{roundedTotalCost}</Typography>
            </div>
        </div>
    );
}
