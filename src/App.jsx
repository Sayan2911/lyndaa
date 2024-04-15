import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GiGemini } from "react-icons/gi";

import { GoogleGenerativeAI } from"@google/generative-ai"
import { useState } from 'react';

function App() {
// gemini api
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const [first, setfirst] = useState(null)
//listening
const listen= ()=> SpeechRecognition.startListening({ continuous: true , language: "en-IN"}, setfirst(true))

  var { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return alert("not support");
  }


  //important variables
var short="keep it short"
var transfer=transcript
var prompt =`${transfer} + ${short} `
var rdata=[]



//function to fetch data from gemini api
async function run(data) {
  setfirst(false)
  SpeechRecognition.stopListening()
  const result = await model.generateContent(data);
  const response = await result.response;
  const text = response.text();
rdata=text
console.log(rdata);



//code to speak fetched answer
const utterance=new SpeechSynthesisUtterance(rdata)
  speechSynthesis.speak(utterance)
  resetTranscript()

  utterance.addEventListener("end", () => {
    // Handle the end of speech here
    setfirst(null)
  });
}




  return (
    <>
       
    <div>
      <h1>L.Y.N.D.A.A</h1>
      <p>The Limitless Yielding Nexus of Digital AI Assistant</p>
    </div>
    <div className='container'>
    {
     (first===null)?
     (<div className='atNull'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" strokeOpacity="1" stroke="#FF156D" strokeWidth="5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="strokeWidth" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="strokeOpacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
     </div>)
     
     :( (first)?
     (<div className='atNull'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
     </div>)
     
     :(<div className='atNull'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
     </div>))
    }

      
   
   
    <div className='btns'>
    <div>
     <p> {transcript} </p> 
    </div>
    <div className='btn'>
    <button onClick={listen}><MdOutlineKeyboardVoice /></button> 
    <button onClick={()=>{
      (transfer)?(run(prompt)):(alert("please ask your query before run "))
    }}> <GiGemini /></button>
    </div>
  
    </div>
    </div>

    </>
  )
}
export default App