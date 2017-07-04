(function(){

	'use strict';

	let circlebutton = document.querySelector('.transparency__circlebutton'), 
		line = document.querySelector('.transparency__line'),
		justforme = document.querySelector('.justforme'),
		justformePic = document.querySelector('.justformepic'),
		isred = false,
		startX = 0, 
		deltaX = 0, 
		dragX = 0, 
		scrollX = 0,	//величина горизонтального скролла
		newCoord = 0,	//координата мыши при перемещении кругляшка
		dragCoord = 0;	//запоминаем положение кругляшка 

	const FIRSTBUTTONSHIFT = Math.abs(getComputedStyle(circlebutton).left.slice(0,-2)),	//первоначальный отриц.сдвиг кругляшка на линии
		  LINEWIDTH = getComputedStyle(line).width.slice(0,-2);

	function makeOpacity (newCoord) {
		circlebutton.style.left = newCoord - FIRSTBUTTONSHIFT +'px';
		let opacity = Math.round(newCoord/LINEWIDTH*100);
		justforme.innerHTML = opacity+'%';
		justformePic.style.opacity = (100 - opacity)/100;		
	}


	//нажали мышью на кругляшок
	let buttonDown = function (e) {
		e.preventDefault();
		this.classList.add('transparency__circlebutton-orange');
		startX = e.pageX;												//координата документа, куда кликнули мышью
		scrollX = window.pageXOffset;
		deltaX = this.getBoundingClientRect().left - startX + scrollX ; //разница м/у тем,куда ткнули мышкой и левой стороной элемента (кругляшка)

		isred = true;
	};

	//отпустили кругляшок
	let buttonUp = function (e) {
		e.preventDefault();

		if (!isred) return;
		else {
			circlebutton.style.backgroundColor = '#dbe1e8';
			dragCoord = newCoord;
			circlebutton.classList.remove('transparency__circlebutton-orange');
			isred = false;
		};		
	};

	//тащим нажатый кругляшок
	let buttonDrag = function (e) {
		e.preventDefault();		
		
		if (!isred) return;
		else {
			dragX = e.pageX;
			
			switch (true) {
				case (dragX - startX + dragCoord < LINEWIDTH && dragX - startX + dragCoord > 0): 	
					newCoord = (dragCoord + dragX - startX );
				break;
				case (dragX - startX + dragCoord >= LINEWIDTH): 	
					newCoord = LINEWIDTH;
				break;
				case (dragX - startX + dragCoord <= 0): 	
					newCoord = 0;
				break;
			}

			makeOpacity (newCoord);
		};		
	};	

	//кликаем на линию
	let lineClick = function (e) {
		e.preventDefault();		

			circlebutton.classList.add('transparency__circlebutton-orange');

			let clickX = e.pageX,
				buttonCenter = circlebutton.getBoundingClientRect().left + FIRSTBUTTONSHIFT,
				scrollX = window.pageXOffset;				

			newCoord = +dragCoord+clickX-buttonCenter-scrollX;
			makeOpacity (newCoord);
			dragCoord = newCoord;

			setTimeout(circlebutton.classList.remove('transparency__circlebutton-orange'), 3000);
	};


	circlebutton.addEventListener('mousedown', buttonDown);
	document.addEventListener('mouseup', buttonUp);
	document.addEventListener('mousemove', buttonDrag);
	line.addEventListener('click', lineClick);


})();