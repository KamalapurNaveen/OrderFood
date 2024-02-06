import CardItem from "./CardItem";

export default function Scanner(){
    return (
        <div className="container align-items-center justify-content-center" style={{display:"flex", gap:"10px" , flexWrap:"wrap"}  }>
            
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
        </div>
    )
}