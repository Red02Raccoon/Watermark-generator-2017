'use strict';

//one-many & X/Y
(function(){

	//'use strict';

	let justformePic = document.querySelector('.justformepic'),
		justformeAllPic = document.querySelectorAll('.justformepic'),
		waterArea = document.querySelector('.watermark__area'),
		setPosMany = document.querySelector('.setposition__item-many'),
		clickMany = 1, PicAmount = 1,
		setPosOne = document.querySelector('.setposition__item-one'),
		waterPictures = document.querySelector('.watermark__waterpictures'),
		wArea = 0,		hArea = 0,
		wAllPic = 0,
		wPic = 0,		hPic = 0,
		areaRatio = 0, 	picturesRatio = 0,
		inputX = document.querySelector('.coordinates__input-X'),
		inputY = document.querySelector('.coordinates__input-Y'), 
		valMarginRight = 0,
		maxX = 500, maxY = 500;


		function init(e, picturesRatio, whatRemove, whatAdd){
			e.preventDefault();	
			wArea = +getComputedStyle(waterArea).width.slice(0,-2),
			hArea = +getComputedStyle(waterArea).height.slice(0,-2),				
			wPic = +getComputedStyle(justformePic).width.slice(0,-2),
			hPic = +getComputedStyle(justformePic).height.slice(0,-2),
			wAllPic = +getComputedStyle(waterPictures).width.slice(0,-2);

			if (!picturesRatio) picturesRatio = hPic/wPic;

			whatRemove.classList.remove('setposition__item-active');
			whatAdd.classList.add('setposition__item-active');
		};

	//кликаем на one
		let oneClick = function (e) {

			init(e, picturesRatio, setPosMany, e.target);
			// e.preventDefault();	

				// wPic = getComputedStyle(justformePic).width.slice(0,-2),
				// hPic = getComputedStyle(justformePic).height.slice(0,-2);

				// if (!picturesRatio) picturesRatio = hPic/wPic;

				// setPosMany.classList.remove('setposition__item-active');
				// e.target.classList.add('setposition__item-active');

				clickMany = 1;
				PicAmount = 1;
				waterPictures.style.width = 100 +'%';	
				waterPictures.style.height = 100 +'%';

				let newPics = document.querySelectorAll('.justformepic-new');
				for (let i=0; i<newPics.length; i++) {
					justformePic.parentNode.removeChild(newPics[i]);
				};


			if (areaRatio > picturesRatio) {
				justformePic.style.height = '100%';
				justformePic.style.width = '';
			} else {
				justformePic.style.width = '100%';
				justformePic.style.height = '';
			};
				
		}
	

	//кликаем на many
		let manyClick = function (e) {
			
			init(e, picturesRatio, setPosOne, e.target);
			// e.preventDefault();		

				// wArea = +getComputedStyle(waterArea).width.slice(0,-2),
				// hArea = +getComputedStyle(waterArea).height.slice(0,-2),				
				// wPic = +getComputedStyle(justformePic).width.slice(0,-2),
				// hPic = +getComputedStyle(justformePic).height.slice(0,-2),
				// wAllPic = +getComputedStyle(waterPictures).width.slice(0,-2);

				// if (!picturesRatio) picturesRatio = hPic/wPic;

				// setPosOne.classList.remove('setposition__item-active');
				// e.target.classList.add('setposition__item-active');	

				justformePic.style.height = '';
				justformePic.style.width = '';	

				clickMany += 1;//колво кликов по many = кол-во водяных картинок в ширину

				wPic = (wAllPic - valMarginRight*(clickMany-1))/clickMany;//новая ширина водяной картинки
				hPic = wPic * picturesRatio;//новая высота водяной картинки
				let rowAmount = hArea / hPic - Math.floor(hArea/hPic) > 0 ? Math.floor(hArea/hPic)+1 : Math.floor(hArea/hPic);//количество строк,чтобы заполнить всю картинку

				let addPicAmount = rowAmount*clickMany-PicAmount;

				for (let i=0; i<addPicAmount; i++) {
					let newPic = justformePic.cloneNode(true);
					newPic.classList.add('justformepic-new');
					justformePic.parentNode.appendChild(newPic);
				};

				justformeAllPic = document.querySelectorAll('.justformepic');
				PicAmount = justformeAllPic.length;
			// if (areaRatio > picturesRatio) {
			// 	for (let i=0; i<justformeAllPic.length; i++) {
 		// 			justformeAllPic[i].style.height = 100/clickMany+'%';
			// 	}							
			// } else {
				for (let i=0; i<PicAmount; i++) {
 					justformeAllPic[i].style.width = wPic+'px';//100/clickMany+'%';
				}
			//}
				waterPictures.style.width = (+getComputedStyle(justformeAllPic[0]).width.slice(0,-2) + valMarginRight)*clickMany+'px';	
				waterPictures.style.height = getComputedStyle(justformeAllPic[0]).height.slice(0,-2)*rowAmount+'px';
		}


		function pressInputX(e) {
			let inputXval = inputX.value;

			if (e.which == null) { // IE
				if (e.keyCode < 48 || e.keyCode > 57 || +(inputXval + String.fromCharCode(e.keyCode)) > maxX) {
					e.preventDefault(); 
					// return
				}
			}
			if (e.which != 0 && e.charCode != 0) {
				if (e.which < 48 || e.which > 57 || +(inputXval + String.fromCharCode(e.which)) > maxX) {
					e.preventDefault(); 
					// return
				}
			}
		}

		function changeInputX(e) {
			valMarginRight = +e.target.value;

console.log(PicAmount, wPic);

			for (let i=0; i<PicAmount; i++) {
				justformeAllPic[i].style.marginRight = valMarginRight + 'px';
				justformeAllPic[i].style.width = wPic + 'px';
			};
			// waterPictures.style.width = (+getComputedStyle(waterPictures).width.slice(0,-2) + valMarginRight*clickMany) + 'px';
			waterPictures.style.width = (+getComputedStyle(justformeAllPic[0]).width.slice(0,-2) + valMarginRight)*clickMany +'px';	
		}

	setPosOne.addEventListener('click', oneClick);	
	setPosMany.addEventListener('click', manyClick);

	inputX.addEventListener('keypress', pressInputX);
	inputX.addEventListener('input', changeInputX);

})();


//opacity
(function(){

	//'use strict';

	let circlebutton = document.querySelector('.transparency__circlebutton'), 
		line = document.querySelector('.transparency__line'),
		darkline = document.querySelector('.transparency__darkline'),
		justforme = document.querySelector('.justforme'),
		justformePic = document.querySelector('.justformepic'),
		waterPictures = document.querySelector('.watermark__waterpictures'),
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
		darkline.style.width = opacity + '%';
		justforme.innerHTML = opacity+'%';
		waterPictures.style.opacity = (100 - opacity)/100;		
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

			setTimeout(function(){
                    circlebutton.classList.remove('transparency__circlebutton-orange')
                },100);
	};


	circlebutton.addEventListener('mousedown', buttonDown);
	document.addEventListener('mouseup', buttonUp);
	document.addEventListener('mousemove', buttonDrag);
	line.addEventListener('click', lineClick);


})();