import React, { Component } from 'react';
// Components
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
// Vendors
import Particles from 'react-particles-js';
import { particlesOption } from "../assets/vendors/particlesOptions";
import { FACE_DETECT_MODEL } from 'clarifai';
import { app } from "../assets/vendors/clarifai_api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: []
    }
  }

  // calculate box position of face/faces
  calculateFaceLocation = (data) => {
    const faceBoxMulti = data.outputs[0].data.regions.map(region => {
      return {
        left:region.region_info.bounding_box.left_col * 100,
        top: region.region_info.bounding_box.top_row * 100,
        right: 100 - (region.region_info.bounding_box.right_col * 100),
        bottom: 100 - (region.region_info.bounding_box.bottom_row * 100)
      }
    })
    

    return faceBoxMulti;
   
  }
  onInputChange = (event) => {
      this.setState({input:event.target.value});
  }

  // display image when invoked
  displayImage = () => {
      const displayImage = document.querySelector(".recognition__img");
      return displayImage.style.display= "flex";
  }
  // display box when invoked 
  // and set state of box with array of pos values
  displayFaceBox = (box, img) => {
      this.setState({box: box});
  }
  validateInput = (url) => (!url) ? alert("Provide a url with image extension .jpeg/.svg/.png") : url;
  
  // event listener onclick call api and set state
  onButtonSubmit = () => {
      // this.setState({mystate: this.state.ourValue}, ourCallback e.g. () => {...})
      const { input } = this.state;
      if(this.validateInput(input)) {
        this.setState(
          {imageURL: input}, 
          () => {
            const { imageURL } = this.state;
            console.log(imageURL);
            app.models.predict(FACE_DETECT_MODEL, imageURL)
            .then(
              // api response
              (response) => this.displayFaceBox(this.calculateFaceLocation(response), this.displayImage())
            ).catch(err => console.log("Error =>", err)) // output error
          }
        )
      }
  }
   
  render() {
     const { imageURL, box } = this.state;
     const { onInputChange, onButtonSubmit } = this;

     // components
     // where facerecog has prop box
     return (
        <div className="App">
          <Particles className="particles" params={ particlesOption }/>
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange= { onInputChange } 
            onButtonSubmit={ onButtonSubmit } 
          />
          <FaceRecognition box={ box } imageURL={ imageURL }/>
        </div>
      );
  }
}

export default App;
