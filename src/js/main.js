var myUI,addBtnNames,userdata,btnLabel;

addBtnNames = ["🔳","⚫","🔴","🔵","⚪","🔘", "▶"];
btnLabel = ["TOGGLE SCREEN","NEUTRON","PROTON","ELECTRON","PHOTON","ATOM", "TIME"];
userdata = {
	day: 1,
	dBool: false,
	planet_size: 1,
	income: 0,
	neutron: 1,
	proton: 0,
	electron: 0,
	photon: 0,
	atom: 0,
	meteor: 0,
	asteroid: 0,
	comet: 0,
	gravity: 1,
	rock: 1,
	geode: 0,
	metal: 0,
	water: 0,
	plant: 0,
	animal: 0,
	beings: 0,
	spaceship: 0
};

myUI = {
	init: () => {
        var h, w;
		LSinit("userData", userdata);
		var uuu = parseLS("userData");

		h = myHeight();
		w = myWidth();

		myUI.loader(h,w,uuu);
	},
	loader: (h,w,uuu) => {
		var dp = createEle("div"), timerCase = createEle("div"), 
		    timerIn = createEle("input"), timerLabel = createEle("label"),
		    myWorld = createEle("div");

		timerLabel.innerHTML = "DAY";
		timerLabel.className = "timerLabel";
		timerLabel.setAttribute("for", "timer");

		timerIn.value = uuu.day;
		timerIn.className = "timerIn";
		timerIn.id = "timer";
		timerIn.disabled = true;
		timerIn.readOnly = true;

		timerCase.className = "timerCase";
		timerCase.append(timerLabel,timerIn);

        for(var i = 0; i < addBtnNames.length; i++){
        	var addBtns = createEle("button");
        	var bool;

        	if(i === 1){
        		if(uuu.neutron === 0){
					bool = true;
        		}else{
					bool = false;
        		}
			}
			if(i === 2){
				if(uuu.proton === 0){
					bool = true;
        		}else{
					bool = false;
        		}
			}
			if(i === 3){
				if(uuu.electron === 0){
					bool = true;
        		}else{
					bool = false;
        		}
			}
			if(i === 4){
				if(uuu.photon === 0){
					bool = true;
        		}else{
					bool = false;
        		}
			}
			if(i === 5){
				if(uuu.atom === 0){
					bool = true;
        		}else{
					bool = false;
        		}
			}
			if(i === 6){
				bool = false;
			}

        	addBtns.onclick = myUI.senseBtns(addBtns,i,addBtnNames,uuu);
 			addBtns.onmouseover = myUI.overOn(addBtns,i,addBtnNames,uuu);
 			addBtns.innerHTML = addBtnNames[i];
 			addBtns.disabled = bool;

			addBtns.className = "gBtns";

        	dp.append(addBtns);
        }
        dp.className = "dp";

        myWorld.innerHTML = "&nbsp;";
        myWorld.className = "myWorld";
        myWorld.style.height = uuu.planet_size + "px";
        myWorld.style.width = uuu.planet_size + "px";
        myWorld.style.left = +((w / 2) - (uuu.planet_size / 2)) + "px";
        myWorld.style.top = +((h / 2) - (uuu.planet_size / 2)) + "px";
        myWorld.onmouseover = myUI.planetLookUp(myWorld,uuu);

		dvContain.append(dp,timerCase,myWorld);
	},
	planetLookUp: function(myWorld,uuu){
		return function(){
			var popup = createEle("span"),
			    x = event.clientX,
			    y = event.clientY;

			popup.innerHTML = "SIZE:" + uuu.planet_size;
			popup.style.position = "fixed";
			popup.className = "popup";
			popup.style.left = (x + 10) + "px";
			popup.style.top = y + "px";

			body.append(popup);

			myWorld.onmouseout = myUI.overOut(popup);
			//console.log(uuu.planet_size);
		}
	},
	overOn: function(addBtns,i,addBtnNames,uuu){
		return function(){
			var popup = createEle("span"),
			    x = event.clientX,
			    y = event.clientY;

			var iVar;
			if(i === 0){
				iVar = "";
			}
			if(i === 1){
				iVar = ": " + uuu.neutron;
			}
			if(i === 2){
				iVar = ": " + uuu.proton;
			}
			if(i === 3){
				iVar = ": " + uuu.electron;
			}
			if(i === 4){
				iVar = ": " + uuu.photon;
			}
			if(i === 5){
				iVar = ": " + uuu.atom;
			}
			if(i === 6){
				iVar = "";
			}
			popup.innerHTML = btnLabel[i] + iVar;
			popup.className = "popup";
			popup.style.position = "fixed";
			popup.style.left = (x + 10) + "px";
			popup.style.top = y + "px";

			body.append(popup);

			addBtns.onmouseout = myUI.overOut(popup);
			
		}
	},
	overOut: function(popup){
		return function(){
			popup.remove();
		}
	},
	neutronSwipe: function(addBtns,i,addBtnNames,uuu){
		console.log(uuu.neutron);
	},
	senseBtns: function(addBtns,i,addBtnNames,uuu){
		return function(){
			var timerIn = bySel(".timerIn");
			if(i === 0){
				if (!document.fullscreenElement) {
            	document.documentElement.requestFullscreen();
        		} else {
	            	if (document.exitFullscreen) {
	                	document.exitFullscreen();
	                }
            	}
			}
			if(i === 1){
				myUI.neutronSwipe(addBtns,i,addBtnNames,uuu);
			}
			if(i === 2){

			}
			if(i === 3){

			}
			if(i === 4){

			}
			if(i === 5){

			}
			if(i === 6){
				if(addBtns.innerHTML === "▶"){
					var popup = bySel(".popup");

					if(popup){
						popup.remove();
					}
					addBtns.innerHTML = "⌛";
					addBtns.disabled = true;

					loop(uuu);

					function loop(uuu){
						setTimeout(function(){
							uuu.day++;
							saveLS("userData",uuu);
							timerIn.value = uuu.day;
							addBtns.innerHTML = "▶";
							addBtns.disabled = false;
						},5000);
					};
				} else {
					addBtns.innerHTML = "▶";
				}
			}
		}
	}
};

window.onload = function() {
	myUI.init();
};