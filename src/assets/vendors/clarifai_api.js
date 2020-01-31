import Clarifai from 'clarifai';

export const app = new Clarifai.App({
	apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

