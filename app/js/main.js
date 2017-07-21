'use strict';

//one-many & X/Y
(function(){

	//'use strict';

	let justformePic = document.querySelector('.justformepic'),
		justformeAllPic = document.querySelectorAll('.justformepic'),
		waterArea = document.querySelector('.watermark__area'),
		clickMany = 1, PicAmount = 1,
		switchQuantity = document.querySelectorAll('.setposition__item'),
		waterPictures = document.querySelector('.watermark__waterpictures'),		
		inputX = document.querySelector('.coordinates__input-X'),
		inputY = document.querySelector('.coordinates__input-Y'), 
		valMarginRight = 0,
		maxX = 500, maxY = 500,

		dimesions = {
			width: 0,
			height: 0,
			ratio: 0,

			getDimension: function(obj, ...dimension){				
				dimension.forEach((key,item) => {
					this[key] = parseInt(getComputedStyle(obj)[dimension[item]]);					
				})
			},

			setDimension: function(obj, dimensionsArr){
				Object.keys(dimensionsArr).forEach(key => {
					this[key] = parseInt(dimensionsArr[key]); 
					obj.style[key] = this[key]+'px';								
				})
			},

			removeDimension: function(obj, ...dimension){
				dimension.forEach(key => {
					obj.style[key] = '';								
				})
			},

			getRatio: function(){
				if (!this.ratio) this.ratio = this.height/this.width;
			}			
		},
		
		area = Object.create(dimesions),
		waterPic = Object.create(dimesions),
		allPic = Object.create(dimesions);

		waterPic.setNewWaterDimensions = function(obj, clickMany){
			this.width = (allPic.width - valMarginRight*(clickMany-1))/clickMany;	//новая ширина водяной картинки
			this.height = this.width * this.ratio;									//новая высота водяной картинки
			this.setDimension(obj, {'width': this.width, 'height': this.height});
		};
		
		waterPic.countRows = function(obj, clickMany){//количество строк,чтобы заполнить всю картинку
			return(area.height / this.height - Math.floor(area.height/this.height) > 0
											? Math.floor(area.height/this.height)+1 
											: Math.floor(area.height/this.height))
		};

		function toggleActive(whatAdd){
			let neighbors = whatAdd.parentNode.children;
			[].forEach.call(neighbors, function(elem) {
  				elem.classList.remove('setposition__item-active');
			});							
			whatAdd.classList.add('setposition__item-active');	
		}

	//кликаем на one/many
		let toggleOneMany = function (e) {

			e.preventDefault();				

			waterPic.getDimension(justformePic, 'height', 'width');
			if (!waterPic.getRatio()) waterPic.getRatio();			
			area.getDimension(waterArea, 'width', 'height');
			if (!area.getRatio()) area.getRatio();
			allPic.getDimension(waterPictures, 'width');

			let whatClick = '';

			if (this.classList.contains('setposition__item-one')) {
				whatClick = 'one';		
			} else
			if (this.classList.contains('setposition__item-many')) {
				whatClick = 'many';
			}

			if (whatClick == 'one') {
				toggleActive(e.target);	

				for (let i=1; i<PicAmount; i++) {
					justformeAllPic[0].parentElement.removeChild(justformeAllPic[i]);
				};

				clickMany = 1; PicAmount = 1;

				if (area.ratio > waterPic.ratio) {
					waterPic.removeDimension(justformePic, 'width');
					waterPic.setDimension(justformePic, {'height': area.height});
					waterPic.getDimension(justformePic, 'width');
				} else {
					waterPic.setDimension(justformePic, {'width': area.width});
					waterPic.removeDimension(justformePic, 'height');
					waterPic.getDimension(justformePic, 'height');					
				};
				allPic.setDimension(waterPictures, {'width': waterPic.width, 'height': waterPic.height});

			} else

			if (whatClick == 'many') {
				toggleActive(e.target);	

				waterPic.removeDimension(justformePic, 'width', 'height');

				clickMany += 1;//колво кликов по many = кол-во водяных картинок в ширину

				waterPic.setNewWaterDimensions(justformePic, clickMany);

				let rowAmount = waterPic.countRows();
				let addPicAmount = rowAmount*clickMany-PicAmount;

				for (let i=0; i<addPicAmount; i++) {
					let newPic = justformePic.cloneNode(true);
					newPic.classList.add('justformepic-new');
					justformePic.parentNode.appendChild(newPic);
				};

				justformeAllPic = document.querySelectorAll('.justformepic');
				PicAmount = justformeAllPic.length;

				for (let i=0; i<PicAmount; i++) {
					waterPic.setDimension(justformeAllPic[i], {'width': waterPic.width, 'height': waterPic.height});
				}

				let newWidthAll = (waterPic.width + valMarginRight)*clickMany;
				let newHeightAll = (waterPic.height * rowAmount);

				allPic.setDimension(waterPictures, {'width': newWidthAll, 'height': newHeightAll});
			}				
		}	


		function pressInputX(e) {
			let inputXval = inputX.value;

			if (e.which != 0 && e.charCode != 0) {
				if (e.which < 48 || e.which > 57 || +(inputXval + String.fromCharCode(e.which)) > maxX) {
					e.preventDefault(); 
				}
			}
		}

		function changeInputX(e) {
			valMarginRight = +e.target.value;

			for (let i=0; i<PicAmount; i++) {
				justformeAllPic[i].style.marginRight = valMarginRight + 'px';
				justformeAllPic[i].style.width = dimesions.wPic + 'px';
			};

			allPic.setDimension(waterPictures, {'width': (waterPic.width+ valMarginRight)*clickMany});
		}

	[].forEach.call(switchQuantity, function(domElem) {
  				domElem.addEventListener('click', toggleOneMany);
			});		

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