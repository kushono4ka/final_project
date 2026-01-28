'use strict'

//Все нужные элементы
let btnName = document.querySelector("input");
let btnStart = document.getElementById("startTestBtn");
let startBtn = document.getElementById("startTestBtn");
let quizForm = document.getElementById("quizForm");
let nameError = null;
let checkError = null;
let questionsList = document.querySelectorAll(".q");
let anketa = document.querySelector(".anketa");
let getResBtn = document.querySelector(".getResult");
let divRes = document.querySelector(".result");
let restartBtn = document.getElementById("restart");

//Подсчетчик ответов
let countA = 0;
let countB = 0;
let countC = 0;

function showQuestions(){ //показ вопросов
    anketa.style.display = "none";
    quizForm.style.display = "block";
    getResBtn.style.display = "block";
}
function checkName() { //проверка введено ли имя
    let name = btnName.value.trim();
    if (name === "") {
        if (!nameError) {
            nameError = document.createElement("p");
            nameError.innerText = "Это поле обязательно для заполнения";
            nameError.classList.add("nameError");
            btnName.after(nameError);
        }
        return false;
    }
    else {
        if (nameError) {
            nameError.remove();
            nameError = null;}
        return true;
    }
}
function startTest(){ //запуск теста
    console.log("Тест запущен для:", btnName.value.trim());
    quizForm.style.display = "block";
    quizForm.style.opacity = "1";
    showQuestions();
}
function countAnswers(radios){ //подсчёт вариантов ответов
    for(let radio of radios){
        if(radio.checked){
            if(radio.value == "A"){
                countA++;
            }
            else if(radio.value == "B"){
                countB++;
            }
            else{
                countC++;
            }
        }
    }
}
function getResult(){
    if (countA > countB && countA > countC){
        return "double_espresso";
    }
    else if(countB > countA && countB > countC){
        return "americano";
    }
    else if(countC > countB && countC > countA){
        return "raf";
    }
    else if(countA == countB && countA == countC){
        return "capuchino";
    }
    else if(countA == countB && countA > countC){
        return "espresso";
    }
    else if(countC == countB && countC > countA){
        return "latte";
    }
    else if(countA == countC && countA > countB){
        return "flat_white";
    }
}
btnName.addEventListener("blur", function(e){
    e.preventDefault();
    checkName();
});

btnStart.addEventListener("click", function(e){
    e.preventDefault();
    if (checkName()) {
        startTest();
    } else {
        btnName.focus();
    }
})


let result;
getResBtn.addEventListener('click', function(e){
    let name = btnName.value.trim();
    let checked = 0;
    let radios = document.querySelectorAll('input[type="radio"]')
    for(let radio of radios){
        if(radio.checked){
            checked++;
        }
    }
    if(checked < 9){
        if(!checkError){
            checkError = document.createElement("p");
            checkError.innerText = "Вы ещё не ответили на все вопросы";
            checkError.classList.add("checkError");
            getResBtn.append(checkError);
            getResBtn.style.marginBottom = "5px";
        }
    }else if(checked == 9){
        checkError = null;
        countAnswers(radios);
        result = getResult();
        console.log(result);
        divRes.style.display = "block";
        getResBtn.style.display = "none";
        quizForm.style.display = "none";
        if(result == "double_espresso"){
            let dop = document.querySelector(".double_espresso");
            let h4 = document.querySelector(".who_d")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - эспрессо (допио)!";
        }
        else if(result == "americano"){
            let dop = document.querySelector(".americano");
            let h4 = document.querySelector(".who_a")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - американо!";
        }
        else if(result == "raf"){
            let dop = document.querySelector(".raf");
            let h4 = document.querySelector(".who_r")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - раф!";
        }
        else if(result == "capuchino"){
            let dop = document.querySelector(".capuchino");
            let h4 = document.querySelector(".who_c")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - капучино!";
        }
        else if(result == "espresso"){
            let dop = document.querySelector(".espresso");
            let h4 = document.querySelector(".who_e")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - эспрессо!";
        }
        else if(result == "latte"){
            let dop = document.querySelector(".latte");
            let h4 = document.querySelector(".who_l")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - латте!";
        }
        else if(result == "flat_white"){
            let dop = document.querySelector(".flat_white");
            let h4 = document.querySelector(".who_f")
            dop.style.display = "block";
            h4.innerText = "Поздравляем, " + name + ", ваш результат - флэт-уайт!";
        }
    }
})
restartBtn.addEventListener("click", function(e) {
    e.preventDefault();

    countA = 0; //сброс ответов
    countB = 0;
    countC = 0;

    btnName.value = ""; //сброс имени
    
    //Снимаем все выброры ответов
    let radios = document.querySelectorAll('input[type="radio"]');
    for(let radio of radios){
        radio.checked = false;
    }
    
    //Скрываем все результаты 
    let resultDivs = document.querySelectorAll('.double_espresso, .americano, .raf, .capuchino, .espresso, .latte, .flat_white');
    for(let div of resultDivs){
        div.style.display = "none";
    }
    let headings = document.querySelectorAll('.who_d, .who_a, .who_r, .who_c, .who_e, .who_l, .who_f');
    for(let h of headings){
        h.innerText = "";
    }
    divRes.style.display = "none";
    
    // "Анкетка"
    anketa.style.display = "block";
    
    //"Получить результат"
    getResBtn.style.display = "none";
    
    //Скрыть форму с вопросами
    quizForm.style.display = "none";

    btnName.focus();
    
    console.log("Тест сброшен. Можно начать заново!");
});