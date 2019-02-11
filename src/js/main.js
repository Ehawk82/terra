var myUI;

myUI = {
	init: () => {
        var h, w;
		
		h = myHeight();
		w = myWidth();

		myUI.loader(h,w);
	},
	loader: (h,w) => {
		var dp = createEle("div");

        dp.innerHTML = "test";
        dp.className = "dp";

		dvContain.append(dp);
	}
};

window.onload = () => {
	myUI.init();
};