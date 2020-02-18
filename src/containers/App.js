import React, { Component } from 'react';
// Components
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";

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
      box: [],
      route: "signin", // show signin page
      isSignedin: false,
      user: {
          id:"",
          name:"",
          email:"",
          entries:0,
          joined: ""
        }
      }
  }
  loadUser = (data) => { // pass db details and set state
      this.setState(
        {user: 
          {
            id:data.id,
            name:data.name,
            email:data.email,
            entries:data.entries,
            joined:data.joined
          }
      })
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

  onRouteChange = (route) => {
      // check if user logged in as well as change route based on user
      if(route === "signout") {
        this.setState({isSignedin: false}) 
      } else if(route === "home") {
        this.setState({isSignedin: true})
      }
      this.setState({route: route});
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

  validateInput = (url) => {
      return (!url) ? alert("Provide a url with image extension .jpeg/.svg/.png") : url;
  }
  
  // event listener onclick call api and set state
  onButtonSubmit = () => {
      // this.setState({mystate: this.state.ourValue}, ourCallback e.g. () => {...})
      const { input } = this.state;
      if(this.validateInput(input)) {
        this.setState(
          {imageURL: input}, 
          () => {
            const { imageURL } = this.state;
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
     const { imageURL, box, route, isSignedin, user} = this.state; // state of our app
     const { loadUser, onInputChange, onButtonSubmit, onRouteChange } = this; // functions declared in App
     // components, where facerecog has prop box
     // Line 91 - IF route state = signin show form else show components
     return (
        <div className="App">
          <Particles className="particles" params={ particlesOption }/>
          <Navigation isSignedIn={ isSignedin } onRouteChange= { onRouteChange }/>

          { route === "home" ? 

            <React.Fragment>
              <Logo />
              <Rank 
                loadUser= { loadUser } 
                name={ user.name } 
                entries={ user.entries }
              />
              <ImageLinkForm 
                onInputChange= { onInputChange } 
                onButtonSubmit={ onButtonSubmit } 
              />
              <FaceRecognition box={ box } imageURL={ imageURL }/>
            </React.Fragment> 
          : (route === "signin" ?
            <React.Fragment>
              <Logo />
              <SignIn loadUser={ loadUser } onRouteChange={ onRouteChange }/>
            </React.Fragment>
          : <React.Fragment>
              <Logo />
              <Register loadUser={ loadUser } onRouteChange={ onRouteChange }/>
            </React.Fragment>
          )
        }
        </div>
      );
    
  }
}

export default App;


 


