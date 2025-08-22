import axios from "axios";

export function useEleven() {
  const handleEleven = async (text: string) => {
    

    const response = await axios.post("/api/elevenTts", { text }, {
      responseType: "blob", // important: we want a Blob for audio
    });
    console.log(response)

    // convert Blob to URL and play
    const audioBlob = response.data;
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    console.log(audio)
    audio.play();
  };

  return { handleEleven };
}
