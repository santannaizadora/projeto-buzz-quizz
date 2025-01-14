let deserializedKey = undefined;

if(localStorage.getItem("userQuizzes") === null){
    let userQuizzesArray = [];
    let serializedUserQuizzesArray =JSON.stringify(userQuizzesArray);
    localStorage.setItem("userQuizzes", serializedUserQuizzesArray);
}

startFirstScreen();

function startFirstScreen(){
    let gettingKeyLocalStorage = localStorage.getItem("userQuizzes");
    deserializedKey = JSON.parse(gettingKeyLocalStorage);
    document.querySelector(".container").innerHTML = `
        <main class="first-screen">
            <section class="quizzUser"></section>
            <section class="all-quizzes-list">
                <p>Todos os quizzes</p>
                <div class="all-quizzes" data-identifier="general-quizzes">
                </div>
            </section>
        </main>
    `;
    fetchServerQuizzes();

    if (deserializedKey.length === 0 || localStorage.getItem("userQuizzes") === null){
        startFirstScreenWithoutUserQuizzes();
    } else {
        startUserQuizzes(deserializedKey);
    }
}

function fetchServerQuizzes(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(showQuizzes);
    
}

function showQuizzes(response){
    const serverQuizzes = response.data; 
    let quizzesList = document.querySelector(".all-quizzes");
    let filterQuizz = [];
    quizzesList.innerHTML = "";   

    if(deserializedKey.length === 0){
        for(let i = 0; i < serverQuizzes.length; i++){
                    quizzesList.innerHTML += `
                    <article class="individual-quizz element${serverQuizzes[i].id}" onclick="createPost_T2(${serverQuizzes[i].id})" data-identifier="quizz-card">
                        <img src="${serverQuizzes[i].image}" alt="${serverQuizzes[i].title}">
                        <div class="shadow"></div> 
                        <h1>${serverQuizzes[i].title}</h1>
                    </article>
                    `;
        }
    } else { 
        filterQuizz = serverQuizzes.filter((e) => {
            let control = true;
            for(let i =0; i < deserializedKey.length; i++){
                if(e.id === deserializedKey[i].id){
                    control = control && false;
                } else if(e.id !== deserializedKey[i].id) {
                    control = control && true;
                }
            } 
            return control;
        }
        );
       
        for(let i = 0; i < filterQuizz.length; i++){
            quizzesList.innerHTML += `
            <article class="individual-quizz element${filterQuizz[i].id}" onclick="createPost_T2(${filterQuizz[i].id})" data-identifier="quizz-card">
                <img src="${filterQuizz[i].image}" alt="${filterQuizz[i].title}">
                <div class="shadow"></div> 
                <h1>${filterQuizz[i].title}</h1>
            </article>
            `;
        }
    }
}

function startFirstScreenWithoutUserQuizzes(){
    document.querySelector(".quizzUser").innerHTML = `
        <section class="box-without-quizzes">
            <p>Você não criou nenhum quizz ainda :(</p>
            <button class="button-create-quizz" onclick="enviarDadosQuizz()" data-identifier="create-quizz">Criar Quizz</button>
        </section> 
    `;
}

function loading(){
    document.querySelector(".container").innerHTML = `
        <div class="loading">
            <img src="./img/loading.gif" alt="loading gif">
            <h2>Carregando</h2>
        </div>
    `;
}

function startUserQuizzes(arrayUserQuizzes){
    document.querySelector(".quizzUser").innerHTML = `
        <div class="user-quizzes-T1">
            <p>Seus quizzes</p>
            <ion-icon class="add-quizz-button" name="add-circle-sharp"  onclick="enviarDadosQuizz()" data-identifier="create-quizz"></ion-icon>
        </div>
        <div class="all-user-quizzes" data-identifier="user-quizzes"></div>
    `;
    showUserQuizzes(arrayUserQuizzes);
}  

function showUserQuizzes(arrayUserQuizzes){
    for (let i = 0; i<arrayUserQuizzes.length; i++){
        document.querySelector(".all-user-quizzes").innerHTML += `
            <article class="individual-quizz element${arrayUserQuizzes[i].id}" onclick="createPost_T2(${arrayUserQuizzes[i].id})" data-identifier="quizz-card">
                <img src="${arrayUserQuizzes[i].image}" alt="${arrayUserQuizzes[i].title}">
                <div class="shadow"></div> 
                <h1>${arrayUserQuizzes[i].title}</h1>
            </article>
        `;
    }
}

function enviarDadosQuizz(){
    document.querySelector('.create-quizz-info').classList.remove('hidden')
    document.querySelector('.first-screen').classList.add('hidden')
}