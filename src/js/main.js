var myUI,addBtnNames;
addBtnNames = ["➕","💲","🔘", "▶"];
myUI = {
	init: () => {
        var h, w;
		
		h = myHeight();
		w = myWidth();

		myUI.loader(h,w);
	},
	loader: (h,w) => {
		var dp = createEle("div"),
		    fsBtn = createEle("button");

		fsBtn.innerHTML = "⬜";
		fsBtn.className = "btns";
		fsBtn.onclick = myUI.toggleFullScreen();

        dp.append(fsBtn);

        for(var i = 0; i < addBtnNames.length; i++){
        	var addBtns = createEle("button");

        	addBtns.innerHTML = addBtnNames[i];

			addBtns.className = "gBtns";

        	dp.append(addBtns);
        }
        dp.className = "dp";

		dvContain.append(dp);
	},
	toggleFullScreen: () => {
        return function(){
			if (!document.fullscreenElement) {
            	document.documentElement.requestFullscreen();
        	} else {
            	if (document.exitFullscreen) {
                	document.exitFullscreen();
                }
            }
        }
	}
};

window.onload = () => {
	myUI.init();
};