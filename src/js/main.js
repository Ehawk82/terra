var myUI;

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
		fsBtn.onclick = myUI.toggleFullScreen();

        dp.append(fsBtn);
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