// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// const result = document.getElementById("result");
// const sound = document.getElementById("sound");
// const btn = document.getElementById("search-btn");

// btn.addEventListener("click" , () => {
//     let inpWord = document.getElementById("inp-word").value;
//     fetch('${url}${inpWord}')
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         result.innerHTML = `<div class="word">
//                 <h3>${inpWord}</h3>
//                 <button>
//                     <i class="fa-solid fa-volume-high"></i>
//                 </button>
//             </div>
//             <div class="details">
//                 <p>${data[0].meanings[0].partOfSpeech}</p>
//                 <p>/Sample/</p>
//             </div>
//             <p class="word-meaning">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
//                  placeat natus Dolorum.
//             </p>
//             <p class="word-example">
//                 Lorem ipsum dolor sit natus Dolorum amet consectetur adipisicing elit. natus Dolorum Ullam, illo.
//             </p>` 
//         ;
//     });
// });



const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;

  // Clear previous results
  result.innerHTML = "";

  fetch(`${url}${inpWord}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Word not found: ${inpWord}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const word = data[0].word;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const definition = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example || "No example available.";
      const audio = data[0].phonetics.find((phonetic) => phonetic.audio)?.audio || "";

      // Dynamically update HTML with API data
      result.innerHTML = `
        <div class="word">
          <h3>${word}</h3>
          <button onclick="playSound('${audio}')">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
          <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        </div>
        <p class="word-meaning"><strong>Meaning:</strong> ${definition}</p>
        <p class="word-example"><strong>Example:</strong> ${example}</p>
      `;
    })

    
    .catch((error) => {
      console.error(error);
      result.innerHTML = `<h4 class="error">Could not find the word "${inpWord}". Please try again.</h4>`;
    });
});

// Function to play pronunciation sound
function playSound(audioUrl) {
  if (audioUrl) {
    sound.src = audioUrl;
    sound.play();
  } else {
    alert("No pronunciation available for this word.");
  }
}
