"use strict"
let question_field = document.querySelector('.question-block')
let answer_btn = document.querySelectorAll('.answer')
let body = document.querySelector('.clolrity')
let signs = ["+", "-", "*", "/"]
let start_btn = document.querySelector('.start-btn')
let start_page = document.querySelector('.start-page')
let main_page = document.querySelector('.main-page')
let result_field = document.querySelector('.result')
let timer = document.querySelector('.timer')
let timer_time = document.querySelector('.input_field')
let min_num_input = document.querySelector('.input_min_number')
let max_num_input = document.querySelector('.input_max_number')
let skip_btn = document.querySelector('.skip_btn')
let stop_btn = document.querySelector('.stop_btn')
let min_num = 1
let max_num = 20
let points = 0
let total_question_count = 0
let skips = 0
let isCookies = false
let cookies = document.cookie.split(';')
let cPoints
for (let i = 0; i < cookies.length; i += 1) {
    let name_value = cookies[i].split('=')
    if (name_value[0].includes('cPoints')) {
        isCookies = true
        cPoints = name_value[1]
        result_field.innerHTML = `result of last game:${cPoints} is right`

    }
}
function randint(max, min) {
    return Math.round(Math.random() * (max - min) + min)
}
function getRandomSign() {
    return signs[randint(0, 3)]
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
        randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
            array[randomIndex], array[currentIndex]];
    }
    return array; // Повертаємо перемішаний масив
}

class Question {
    constructor() {
        let a = randint(min_num, max_num)
        let b = randint(min_num, max_num)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {
            this.correct = a + b
        }
        else if (sign == '-') {
            this.correct = a - b
        }
        else if (sign == '*') {
            this.correct = a * b
        }
        else if (sign == '/') {
            let answer = a / b * 100

            this.correct = Math.round(answer) / 100
        }
        this.answers = [
            randint(this.correct - 14, this.correct - 7),
            randint(this.correct + 1, this.correct + 7),
            randint(this.correct - 15, this.correct - 7),
            randint(this.correct - 7, this.correct - 1),
            this.correct,
        ]
        shuffle(this.answers)
        console.log(this)

    }
    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_btn[i].innerHTML = this.answers[i]
        }
    }
}
let maxGameTime = 120
function changeTime() {
    timer.innerHTML = +timer.innerHTML - 1
    if (+timer.innerHTML > 0) {
        setTimeout(changeTime, 1000)
    } else {
        displayResult()
    }

}
function displayResult() {
    start_page.style.display = 'flex'
    main_page.style.display = 'none'
    result_field.innerHTML = `result of last game:${points} is right, your accuracy is ${Math.round(points * 100 / total_question_count)}%, you skip ${skips} questions`
    document.cookie = `cPoints=${points};max-age=${31536000000} `

}


start_btn.addEventListener('click', function () {
    points = 0
    total_question_count = 0
    start_page.style.display = 'none'
    main_page.style.display = 'flex'
    if (timer_time.value > 0) {


        maxGameTime = timer_time.value
    }
    timer.innerHTML = maxGameTime
    if (min_num_input.value && max_num_input.value) {
        min_num = +min_num_input.value
        max_num = +max_num_input.value
    }
    let current_question = new Question()
    current_question.display()
    setTimeout(changeTime, 1000)
    //setTimeout(displayResult, maxGameTime * 1000)




    for (let i = 0; i < answer_btn.length; i += 1) {
        answer_btn[i].addEventListener('click', function () {
            total_question_count += 1
            if (answer_btn[i].innerHTML == current_question.correct) {
                points += 1

                answer_btn[i].style.background = 'rgb(0, 173, 32)'

                anime({
                    targets: answer_btn[i],
                    background: 'rgb(0, 78, 14)',
                    delay: 200,
                    duration: 500,
                    easing: 'linear'
                }).finished.then(function () {
                    current_question = new Question()
                    current_question.display()
                })
                console.log('true')

            } else {
                console.log('false')

                answer_btn[i].style.background = 'rgb(134, 0, 0)'

                anime({
                    targets: answer_btn[i],
                    background: 'rgb(0, 78, 14)',
                    delay: 200,
                    duration: 500,
                    easing: 'linear'
                }).finished.then(function () {
                    current_question = new Question()
                    current_question.display()
                })
            }
        })
    }

    // Add event listener for the skip button here
    skip_btn.addEventListener('click', function () {
        total_question_count += 1
        skips += 1

        console.log('skip')
        anime({
            targets: skip_btn,
            background: 'rgb(0, 78, 14)',
            delay: 200,
            duration: 500,
            easing: 'linear'
        }).finished.then(function () {
            current_question = new Question()
            current_question.display()
        })
    })
    stop_btn.addEventListener('click', function () {
        timer.innerHTML = 0


        console.log('stop')
        anime({
            targets: stop_btn,
            background: 'rgb(0, 78, 14)',
            delay: 200,
            duration: 500,
            easing: 'linear'
        }).finished.then(function () {
            start_page.style.display = 'flex'
            main_page.style.display = 'none'
            displayResult()
        })
    })


})