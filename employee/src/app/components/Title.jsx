// import DeletePostButton from "./DeletePostButton";

export default function Title({emp_no, title, from_date, to_date}){
    return (
        <div style={{border: '1px solid white', padding: '15px', margin: '10px 0px'}}>
            <h3>{emp_no}: {title}</h3> From: <p>{from_date}</p> to: <p>{to_date}</p>
            {/* <DeletePostButton postId={id} /> */}
        </div>
    )
}