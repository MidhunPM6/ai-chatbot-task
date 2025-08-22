import axios from "axios";

export function useEleven() {
  const handleEleven = async (text: string) => {
    
    // send text to the API route
    const response = await axios.post("/api/elevenTts", { text }, {
      responseType: "blob", 
    });
    

    // convert Blob to URL and play
    const audioBlob = response.data;
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    console.log(audio)
    audio.play();
  };

  return { handleEleven };
}
