let containerAnswers = [];

for(let i = 0; i < 2; i++){ // tem que ser a quantidade de perguntas
    containerAnswers.push(true);
}

// Função selecionar resposta
function selectAnswer(div,num){

    console.log(containerAnswers)
    if(containerAnswers[num-1]){

        containerAnswers[num-1] = false;

        let numAnswer = parseFloat(div.id.replace('answer', '')); 
        
        let myElement = document.querySelector(`.blockQuizzT2__${num}`);

        for (let i = 0; i < myElement.children.length + 2; i++){
            console.log(i);
            if(i != (numAnswer-1)){
                let otherAnswers = document.getElementById(`block${num}_answer${i+1}`);
                otherAnswers.classList.add("notSelected");
            }
        
        }
    }

    // fazer comparador com a resposta que vem do axios-- para saber se é true ou false a resposta
    console.log(num);
}