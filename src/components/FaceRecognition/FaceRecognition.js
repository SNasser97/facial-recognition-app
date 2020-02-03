import React from "react";


const FaceRecognition = ({ imageURL, box }) => {

  	const faces = ()=> {
  		// if box contains values
	    if(box){
	    	 const boxes =  box.map((face, id) => {
	       		 return <div className="recognition__box"  
	       		 				key={ id }
	        					style={
								{
									"top":face.top+"%",
									"right":face.right+"%",
									"bottom":face.bottom+"%",
									"left":face.left+"%"
								}
							}>
	     			    </div>
	    		 })
      		return boxes;
      	}
      	// else nothing
    	return null
    }
    return (
	    <div className="recognition">
	      <img className="recognition__img"  src={ imageURL } alt="facial recognition" />
	      {faces() /* invoke return values of faces() */} 
	    </div>
    )
}

export default FaceRecognition;
