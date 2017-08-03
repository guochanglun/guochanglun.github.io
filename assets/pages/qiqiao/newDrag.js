function Drag(){

	var _this = this

	this.offTop = 0;
	this.offLeft = 0;
	this.winWidth = 0;
	this.winHeight = 0;
	this.boxWidth = 0;
	this.boxHeight = 0;
	this.head
	this.box

	this.init = function(boxId, headId, zIndex){
		//init data
		this.head = this.g(headId)
		this.box = this.g(boxId)
		if(zIndex){
			this.box.style.zIndex = zIndex
		}else{
			this.box.style.zIndex = 100
		}
		this.box.style.position = 'absolute'
		

		//console.log(this.box)

		this.boxWidth = this.box.offsetWidth;
		this.boxHeight = this.box.offsetHeight;
		this.winWidth = document.documentElement.clientWidth || document.body.clientWidth;
		this.winHeight = document.documentElement.clientHeight || document.body.clientHeight

		//init position
		this.box.style.top = ((this.winHeight-this.boxHeight)/2)+'px'
		this.box.style.left = ((this.winWidth-this.boxWidth)/2)+'px'
		//bind eventListene
		this.head.addEventListener('mousedown', this.downFun, false)
		this.head.addEventListener('mousemove', this.moveFun, false)
		this.head.addEventListener('mouseup', this.upFun, false)
		this.head.addEventListener('mouseout', this.upFun, false)
		this.head.addEventListener('dblclick', this.preventDefault)
		this.head.addEventListener('dragstart', this.preventDefault)
		this.head.addEventListener('drag', this.preventDefault)
		this.head.addEventListener('dragend', this.preventDefault)
		this.head.addEventListener('copy', this.preventDefault)
		this.head.addEventListener('drop', this.preventDefault)
	}

	this.g = function(id){
		return document.getElementById(id)
	}

	this.downFun = function(e){
		_this.isTrag = true
		//console.log(_this.box)
		_this.offLeft = e.pageX - _this.box.offsetLeft
		_this.offTop = e.pageY - _this.box.offsetTop
	}

	this.moveFun = function(e){
		e = e || window.e
		if(_this.isTrag){
			var top = Math.max(0, Math.min(_this.winHeight-_this.boxHeight, e.pageY-_this.offTop))
			var left = Math.max(0, Math.min(_this.winWidth-_this.boxWidth, e.pageX-_this.offLeft))
			_this.box.style.top = top+'px'
			_this.box.style.left = left+'px'
		}
	}

	this.upFun = function(e){
		//console.log('upFun')
		_this.isTrag = false
	}

	this.preventDefault = function(e){
		e.preventDefault()
		//console.log(e.type)
		return false
	}
}
