const textarea = document.querySelector("textarea"),
ListVoix = document.querySelector("select"),
voiceIco = document.getElementById('voiceIco'),
BoutonText = document.querySelector("button");


let RecuperationVoix = window.speechSynthesis,
EstEntrainDeParler = true;

voix();

function voix(){
    for(let voice of RecuperationVoix.getVoices()){ 
        let option = `<option value="${voice.name}" >${voice.name} (${voice.lang})</option>`;
        ListVoix.insertAdjacentHTML("beforeend", option);
    }
}

RecuperationVoix.addEventListener("voiceschanged", voix);

function DuTexteALaVoix(text){
    let Prononciation = new SpeechSynthesisUtterance(text);
    for(let voice of RecuperationVoix.getVoices()){
        if(voice.name === ListVoix.value){
            Prononciation.voice = voice;
        }
    }
    Prononciation.onend = () => {
        BoutonText.innerText = "Écouter votre texte";
        voiceIco.innerText = "🔇";
      };
    RecuperationVoix.speak(Prononciation);
}

BoutonText.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!RecuperationVoix.speaking){
            DuTexteALaVoix(textarea.value);
        }
        if(textarea.value.length > 0){
            setInterval(()=>{
                if(!RecuperationVoix.speaking && !EstEntrainDeParler){
                    EstEntrainDeParler = true;
                    BoutonText.innerText = "Écouter votre texte";
                    
                }else{
                }
            }, 500);
            if(EstEntrainDeParler){
                RecuperationVoix.resume();
                EstEntrainDeParler = false;
                voiceIco.innerText="🗣";
                BoutonText.innerText = "Arreter la lécture";
            }else{
                RecuperationVoix.pause();
                voiceIco.innerText="🔇";
                EstEntrainDeParler = true;
                BoutonText.innerText = "Continuer la lécture";
            }
        }else{
            BoutonText.innerText = "Écouter votre texte";
        }
    }
});



