"use strict";

var all_questions = {
  question : "Что обозначает директива ‘use strict’?",
  answer : {
    true_answer : "Код данного скрипта будет обработан по строгим правилам стандарта EcmaScript 5.",
    false_answer: ["Код данного скрипта будет обработан по строгим правилам стандарта EcmaScript 6.", "Код данного скрипта будет обработан по строгим правилам, однако допускается использование нестрогих правил написания кода.",   "Код данного скрипта будет обработан по строгим правилам стандарта HTML5."]
  },
  question_two : "К какому участку скрипта применяется строгие правила ‘use strict’?",
  answer_two : {
    true_answer : "Либо во всем скрипте, либо в отдельной функции.",
    false_answer : ["Внутри блока {}", "Строгие правила работают между директивами ‘use strict’ и ‘strict end’.", "Во всем скрипте."]
  },
  question_three : "Какие основное ограничения к объявлению переменных в строгом режиме?",
  answer_three : {
    true_answer : "Любая переменная должна объявляться с использованием ключевого слова var",
    false_answer : ["Глобальные переменные должны объявляться с использованием ключевого слова var", "Переменные функций должны объявляться с использованием ключевого слова var", "Название переменных должно быть camel-case с маленькой буквы."]
  },
  question_four : "Чему равен this в функциях вызванных на глобальном уровне (т.е. не внутри других функций)?",
  answer_four : {
    true_answer : "undefined",
    false_answer : ["null", "Сама функция", "window"]
  },
  question_five : "Какой из пунктов не верен по отношению к строгому режиму javascript?",
  answer_five : {
    true_answer : "Запрещено использование директивы eval",
    false_answer : ["Запрещено удаление полей, имеющих свойство writable = false", "Запрещено дублирование полей объектов", "Запрещено дублирование параметров функции"]
  }
};
localStorage.setItem("question1", JSON.stringify(all_questions));
var test = localStorage.getItem("question1");
test = JSON.parse(test);





$(function () {
    var html = $('#test_template').html();
var data = {
  q1 : test.question,
  a1_on_q1 : test.answer.true_answer,
  a2_on_q1 : test.answer.false_answer[0],
  a3_on_q1 : test.answer.false_answer[1],
  a4_on_q1 : test.answer.false_answer[2],

  q2 : test.question_two,
  a1_on_q2 : test.answer_two.false_answer[0],
  a2_on_q2 : test.answer_two.true_answer,
  a3_on_q2 : test.answer_two.false_answer[1],
  a4_on_q2 : test.answer_two.false_answer[2],

  q3 : test.question_three,
  a1_on_q3 : test.answer_three.false_answer[0],
  a2_on_q3 : test.answer_three.false_answer[1],
  a3_on_q3 : test.answer_three.false_answer[2],
  a4_on_q3 : test.answer_three.true_answer,

  q4 : test.question_four,
  a1_on_q4 : test.answer_four.false_answer[0],
  a2_on_q4 : test.answer_four.false_answer[1],
  a3_on_q4 : test.answer_four.true_answer,
  a4_on_q4 : test.answer_four.false_answer[2],

  q5 : test.question_five,
  a1_on_q5 : test.answer_five.true_answer,
  a2_on_q5 : test.answer_five.false_answer[1],
  a3_on_q5 : test.answer_five.false_answer[2],
  a4_on_q5 : test.answer_five.false_answer[0]
};
    var content = tmpl(html, data);
    $('body').append(content);
});

var userAnswers = [];
var your_result = 0;
var i;

$(document).ready(function () {
  $('#go').on('click', function () {
    for ( i of $("input:radio:checked")){
      userAnswers.push(i.value);
    }
    for(i of userAnswers){
      if(i == "true"){
        your_result+=20;
      }
    }
    $('.inner_result').html('Ваш результат ' + your_result +  '%');
  });
});

$(document).ready(function(){
  $("#modal_close").on('click',function(){
     userAnswers = [];
     your_result = 0;
  });
});

$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
	$('a#go').click( function(event){ // лoвим клик пo ссылки с id="go"
		event.preventDefault(); // выключaем стaндaртную рoль элементa
		$('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function(){ // пoсле выпoлнения предъидущей aнимaции
				$('#modal_form')
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});
	});
	/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
	$('#modal_close').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('#overlay').fadeOut(400); // скрывaем пoдлoжку
				}
			);
	});
});
