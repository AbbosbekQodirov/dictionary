 const select = document.querySelector(".select");
const options = document.querySelector(".options");
const select_icon = document.querySelector(".select_icon");
const mode_btn = document.querySelector(".mode_btn");
const mode_span = document.querySelector(".mode_btn span");
const mode_icon = document.querySelector(".mode_icon");
const blocks = document.querySelector(".blocks");
const form = document.querySelector(".form");
const input = document.querySelector("#input");



select.addEventListener("click", () => {
  options.classList.toggle("active");
  select_icon.classList.toggle("active");
});

const sans = document.querySelector("#sans");
const serif = document.querySelector("#serif");
const mono = document.querySelector("#mono");
const body = document.querySelector(".body");

sans.addEventListener("click", () => {
  body.style = "font-family: sans-serif;";
});

serif.addEventListener("click", () => {
  body.style = "font-family: serif;";
});

mono.addEventListener("click", () => {
  body.style = "font-family: monospace;";
});

//dark mode

var mode = "dark"

const changeMode = ()=>{
  if(mode == "dark"){

  }
}

mode_btn.addEventListener("click", () => {
  mode_span.classList.toggle("active");
  body.classList.toggle("dark");
  if (mode_icon.getAttribute("src") == "./img/moon.png") {
    mode_icon.setAttribute("src", "./img/moon1.png");
  } else {
    mode_icon.setAttribute("src", "./img/moon.png");
  }
});

// request

var API = "https://api.dictionaryapi.dev/api/v2/entries/en/keyboard";

const getData = async (api) => {
  const req = await fetch(api);
  const data = await req.json();
  useData(data);
};

getData(API);

const useData = (data) => {
  const { word, phonetics, meanings, sourceUrls } = data[0];
  console.log(meanings);
  // console.log(meanings[1].definitions[0].example);
  const phonetic = phonetics.filter((item) => {
    if (item.text && item.audio) {
      return item;
    }
  });

  blocks.innerHTML = `
    <div class="main_text">
      <div>
          <h1 class="word">
              ${word}
          </h1>
          <p class="speakword">
              ${phonetic[0].text}
          </p>
      </div>
      <div class="play" onclick="playAudio()" >
          <div class="playIcon"><i class="fa-solid fa-play"></i></div>
          <audio src=${phonetic[0].audio} class="audio"></audio>
      </div>
    </div>
    <div class="meanings">
        ${meanings.map((item) => {
          console.log(item);
          return `
<div class="part">
            <div class="partOfSpeech">
                ${item.partOfSpeech} 
            </div>
            <div></div>
        </div>
        <div class="definitions">
            <h2>Meaning</h2>
            
            <ul>

                ${item.definitions.map((def) => {
                  if (def.example) {
                    return `
                    

                  <li>
                      ${def.definition}
                    </li>
                      <div class="example">
                    “${def.example}”
                </div>
                    `;
                  } else {
                    return `
                  <li>
                      ${def.definition}
                    </li>
                      `;
                  }
                })}
                
            </ul>
        </div>
        <div class="synonym">
                <h2>Synonyms</h2>
                ${item.synonyms.map((syn) => {
                  return ` 
            <div class="synonyms"> ${syn}  </div>`;
                })}
           
                
        </div>`;
        })}

        

        
    </div>
  `;
};


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = input.value
  API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  getData(API)
})


const playAudio = () => {
const audio = document.querySelector(".audio");
const playIcon = document.querySelector(".playIcon");
audio.play()
playIcon.innerHTML = '<i class="fa-solid fa-pause"></i>';

audio.addEventListener("ended", ()=>{
playIcon.innerHTML = '<i class="fa-solid fa-play"></i>';
})


}