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
		inputX = document.querySelector('.coordinates__input-X'),
		inputY = document.querySelector('.coordinates__input-Y'), 
		valMarginRight = 0,
		maxX = 500, maxY = 500,
		dimesions = {
			wArea: 0, 
			hArea: 0, 
			areaRatio: 0,

			wPic: 0, 
			hPic: 0, 
			pictureRatio: 0,

			wAllPic: 0, 
			

			getDimension: function(prop, obj, dimension){
				this[prop] = parseInt(getComputedStyle(obj)[dimension]);
			},

			//эти 2 метода повторяются, я потом придумаю че сделать
			setPictureRatio: function(){
				if (!this.pictureRatio) this.pictureRatio = this.hPic/this.wPic;;
			},
			setAreaRatio: function(){
				if (!this.areaRatio) this.pictureRatio = this.hArea/this.wArea;;
			},
			//эти 2 метода повторяются, я потом придумаю че сделать

			setNewWaterDimensions: function(clickMany){
				this.wPic = (this.wAllPic - valMarginRight*(clickMany-1))/clickMany;	//новая ширина водяной картинки
				this.hPic = this.wPic * this.pictureRatio;								//новая высота водяной картинки
			}
		};
		

		function toggleActive(whatRemove, whatAdd){
			whatRemove.classList.remove('setposition__item-active');
			whatAdd.classList.add('setposition__item-active');	
		}

	//кликаем на one/many
		let toggleOneMany = function (e) {

			e.preventDefault();	
			
			dimesions.getDimension('wPic', justformePic, 'width');
			dimesions.getDimension('hPic', justformePic, 'height');			
			dimesions.getDimension('wArea', waterArea, 'width');
			dimesions.getDimension('hArea', waterArea, 'height');			
			dimesions.getDimension('wAllPic', waterPictures, 'width');

			dimesions.setPictureRatio();
			dimesions.setAreaRatio();	

			let whatClick = '';

			if (this.classList.contains('setposition__item-one')) {
				whatClick = 'one';		
			} else
			if (this.classList.contains('setposition__item-many')) {
				whatClick = 'many';
			}

			if (whatClick == 'one') {
				toggleActive(setPosMany, e.target);	

				clickMany = 1; PicAmount = 1;
				waterPictures.style.width = 100 +'%';	
				waterPictures.style.height = 100 +'%';

				let newPics = document.querySelectorAll('.justformepic-new');
				for (let i=0; i<newPics.length; i++) {
					justformePic.parentNode.removeChild(newPics[i]);
				};

				if (dimesions.areaRatio > dimesions.picturesRatio) {
					justformePic.style.height = '100%';
					justformePic.style.width = '';
				} else {
					justformePic.style.width = '100%';
					justformePic.style.height = '';
				};

			} else

			if (whatClick == 'many') {
				toggleActive(setPosOne, e.target);	

				justformePic.style.height = '';
				justformePic.style.width = '';	
				clickMany += 1;//колво кликов по many = кол-во водяных картинок в ширину

				dimesions.setNewWaterDimensions(clickMany);	

				//количество строк,чтобы заполнить всю картинку
				let rowAmount = dimesions.hArea / dimesions.hPic - Math.floor(dimesions.hArea/dimesions.hPic) > 0  
														? Math.floor(dimesions.hArea/dimesions.hPic)+1 
														: Math.floor(dimesions.hArea/dimesions.hPic);																
				let addPicAmount = rowAmount*clickMany-PicAmount;

				for (let i=0; i<addPicAmount; i++) {
					let newPic = justformePic.cloneNode(true);
					newPic.classList.add('justformepic-new');
					justformePic.parentNode.appendChild(newPic);
				};

				justformeAllPic = document.querySelectorAll('.justformepic');
				PicAmount = justformeAllPic.length;

				for (let i=0; i<PicAmount; i++) {
 					justformeAllPic[i].style.width = dimesions.wPic+'px';
				}
				//да, с этой хренью тоже надо что-то сделать потом
				waterPictures.style.width = (+getComputedStyle(justformeAllPic[0]).width.slice(0,-2) + valMarginRight)*clickMany+'px';	
				waterPictures.style.height = getComputedStyle(justformeAllPic[0]).height.slice(0,-2)*rowAmount+'px';
				//да, с этой хренью тоже надо что-то сделать потом
			}
				
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

			for (let i=0; i<PicAmount; i++) {
				justformeAllPic[i].style.marginRight = valMarginRight + 'px';
				justformeAllPic[i].style.width = dimesions.wPic + 'px';
			};
			waterPictures.style.width = (+getComputedStyle(justformeAllPic[0]).width.slice(0,-2) + valMarginRight)*clickMany +'px';	
		}

	setPosOne.addEventListener('click', toggleOneMany);	
	setPosMany.addEventListener('click', toggleOneMany);	

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