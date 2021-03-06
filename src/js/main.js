var myUI,addBtnNames,userdata,btnLabel, worlddata;

addBtnNames = ["🔳","⚫","🔴","🔵","⚪","🔘", "▶"];
btnLabel = ["TOGGLE SCREEN","NEUTRON","PROTON","ELECTRON","PHOTON","ATOM", "TIME"];
userdata = {
	day: 1,
	dBool: false,
	planet_size: 1,
	income: 0,
	neutron: 3,
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

worlddata = {
	mass: 0,
	status: "HIGGS",
	charge: 0,
	spin: 0,
	climate: "",
	events: {},
	debris: {},
	debrisCount: 1,
	log: {}
};
myUI = {
	init: () => {
        var h, w;
		LSinit("worldData", worlddata);
		LSinit("userData", userdata);
		var uuu = parseLS("userData");
		var vvv = parseLS("worldData");

		h = myHeight();
		w = myWidth();

		myUI.loader(h,w,uuu,vvv);
	},
	loader: (h,w,uuu,vvv) => {
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

        	addBtns.onclick = myUI.senseBtns(addBtns,i,addBtnNames,uuu,vvv);
 			addBtns.onmouseover = myUI.overOn(addBtns,i,addBtnNames,uuu,vvv);
 			addBtns.innerHTML = addBtnNames[i];
 			addBtns.disabled = bool;

			addBtns.className = "addBtns";

        	dp.append(addBtns);
        }

        dp.className = "dp_full";

        myWorld.innerHTML = "&nbsp;";
        myWorld.className = "myWorld";
        myWorld.id = vvv.status;
        myWorld.style.height = uuu.planet_size + "px";
        myWorld.style.width = uuu.planet_size + "px";
        myWorld.style.left = +((w / 2) - (uuu.planet_size / 2)) + "px";
        myWorld.style.top = +((h / 2) - (uuu.planet_size / 2)) + "px";
        myWorld.onmouseover = myUI.planetLookUp(myWorld,uuu,vvv);
        //myUI.generateDebris(uuu,vvv);
		dvContain.append(dp,timerCase,myWorld);
	},
	generateDebris: function(uuu,vvv){
		for(var b = 1; b < vvv.debrisCount; b++){
			var unit = createEle("div"),
			    vDebris = vvv.debris;

			unit.innerHTML = "nbsp;";
			unit.className = "unit";
			unit.style.backgroundColor = "darkgrey";
			unit.style.top = vDebris[b][2] + "px";
	        unit.style.left = vDebris[b][1] + "px";
            unit.style.backgroundColor = vDebris[b][4];
			body.append(unit);

		}
		
	},
	planetLookUp: function(myWorld,uuu,vvv){
		return function(){
			var popup = createEle("span"),
			    x = event.clientX,
			    y = event.clientY;

			popup.innerHTML = "<p>SIZE:" + uuu.planet_size + "</p><p>TYPE: "+ vvv.status + "</p>";
			popup.style.position = "fixed";
			popup.className = "popup";
			popup.style.left = (x + 10) + "px";
			popup.style.top = y + "px";

			body.append(popup);

			myWorld.onmouseout = myUI.overOut(popup);
			//console.log(uuu.planet_size);
		}
	},
	overOn: function(addBtns,i,addBtnNames,uuu,vvv){
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
	neutronSwipe: function(addBtns,i,addBtnNames,uuu,vvv){
		var dp = addBtns.parentNode, dvContain = dp.parentNode, body = dvContain.parentNode;
		var myWorld = bySel("#" + vvv.status);
		takeFull(dp);

		function Thing(x, y){
			this.x = x;
			this.y = y;
		}

		var mousePos = new Thing(100, 100);
	    var mycanvas = createEle("div");

	    mycanvas.id = "mycanvas";
    	mycanvas.innerHTML = addBtns.innerHTML;
	    mycanvas.style.top = mousePos.y + "px";
	    mycanvas.style.left = mousePos.x + "px";

	    body.addEventListener('mousemove', function(event){
			mousePos.x = event.clientX;
			mousePos.y = event.clientY;
	        
	        mycanvas.innerHTML = addBtns.innerHTML;
	        mycanvas.style.top = mousePos.y + "px";
	        mycanvas.style.left = mousePos.x + "px";

		}, true);
		
		body.addEventListener('mousedown', myUI.placeUnit, true);

	    body.style.cursor = 'none';
		body.append(mycanvas);
		myWorld.disabled = true;
	},
	placeUnit: function(event){
			var unit = createEle("div"),
				mycanvas = bySel("#mycanvas"),
				uuu = parseLS("userData"),
				vvv = parseLS("worldData"),
				addBtns = bySelAll(".addBtns"),
				addBtnNames = bySelAll(".addBtnNames"),
				dp = bySel(".dp"),
				myWorld = bySel("#" + vvv.status),bkgnd,c;

			for (var b = 0; b < addBtns.length; b++) {
				if(b === 1){
					uuu.neutron = uuu.neutron - 1;
					bkgnd = "slategrey";
				    if(uuu.neutron <= 0){
				    	addBtns[b].disabled = true;
				    }
				    c = b;
				}
	
			}
			for (var d = 0; d < vvv.debrisCount; d++) {
				d = vvv.debrisCount + 1;
				var dTemplate = [
					key = vvv.debrisCount,
					x = Math.round(event.clientX),
					y = Math.round(event.clientY),
					speed = 0,
					color = bkgnd,
					name = btnLabel[c]
				];
		
				vvv.debris[vvv.debrisCount] = dTemplate;
				
		    	vvv.debrisCount = d;
			}

			saveLS("userData", uuu);
 			saveLS("worldData", vvv);

			unit.innerHTML = "nbsp;";
			unit.className = "unit";
			unit.style.backgroundColor = bkgnd;
			unit.style.top = event.clientY + "px";
	        unit.style.left = event.clientX + "px";

			body.style.cursor = 'default';
			
			body.append(unit);
			
			mycanvas.remove();
			myWorld.disabled = false;

			makeFull(dp);

			body.removeEventListener('mousedown', myUI.placeUnit, true);
	},
	guideDebris: function(){
		var vvv = parseLS("worldData"),
			uuu = parseLS("userData"),
			unit = bySelAll(".unit"),
		    vDebris = vvv.debris,h,w,hW,hH;

		h = myHeight();
		w = myWidth();

		hH = h / 2;
		hW = w / 2;


		for(var u = 0; u < unit.length; u++){
			unit[u].remove();
		}
        for(var d = 1; d < vvv.debrisCount; d++){
            //x

            if(vvv.debris[d][1] < hW){
            	vvv.debris[d][1] = vvv.debris[d][1] + 1;
            }
            if(vvv.debris[d][1] > hW){
            	vvv.debris[d][1] = vvv.debris[d][1] - 1;
            }
            //y
            if(vvv.debris[d][2] < hH){
            	vvv.debris[d][2] = vvv.debris[d][2] + 1;
            }
        	if(vvv.debris[d][2] > hH){
            	vvv.debris[d][2] = vvv.debris[d][2] - 1;
            }
            //y == x
            //console.log(vvv.debris[d][2]);
            //console.log(hH);
            if(+vvv.debris[d][1] === +hW){
            	//localStorage.removeItem(vvv.debris[d]);
            	delete vvv.debris[d],
            	    --vvv.debrisCount,
            	    myUI.calculateKeys();

            }
        }
        
		saveLS("worldData", vvv);
		myUI.generateDebris(uuu,vvv);
	},
	calculateKeys: function(){
		var vvv = parseLS("worldData");
		var dB = vvv.debrisCount - 1,
		    vDebris = vvv.debris;

		for(var v = 1; v < dB; v++){
			//vvv.debris[v][0] = v;
			console.log(vvv.debris[v]);
		}
		saveLS("worldData", vvv);
	},
	senseBtns: function(addBtns,i,addBtnNames,uuu,vvv){
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
				myUI.neutronSwipe(addBtns,i,addBtnNames,uuu,vvv);
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
					myUI.guideDebris(uuu,vvv);
					loop(uuu);

					function loop(uuu){
						setTimeout(function(){
							uuu.day++;
							saveLS("userData",uuu,vvv);
							timerIn.value = uuu.day;
							addBtns.innerHTML = "▶";
							addBtns.disabled = false;
						},100);
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