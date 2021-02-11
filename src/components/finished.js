import { collectFields } from "graphql/execution/execute";
import { Link} from "react-router-dom";

function Finished (){


    return (
        <div id="finished" style={{padding: "20px"}}>
            <div style={{marginBottom: "20px"}}>
            Thank you for your order
            </div>
            <div>
               <Link to="/" 
                className="waves-effect waves-light btn">Back to Menu 
                </Link> 
            </div>
            
        </div>
        

        
      );
}


export default Finished;