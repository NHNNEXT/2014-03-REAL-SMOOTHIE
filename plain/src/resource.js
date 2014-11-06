var res = {
		HelloWorld_png : "res/HelloWorld.png",
		CloseNormal_png : "res/CloseNormal.png",
		CloseSelected_png : "res/CloseSelected.png",
		Rect_png : "res/rect.png",
		BG_jpg : "res/BG.jpg",
		Pipe_2way_line : "res/type-2way_l.png",
		Pipe_2way_curve : "res/type-2way_c.png",
		Pipe_3way : "res/type-3way.png",
		Pipe_4way : "res/type-4way.png",
		sally : "res/sally.png",
		cony : "res/cony.png",
		button_n: "res/animationbuttonnormal.png",
		button_p: "res/animationbuttonpressed.png",
		replayNormal_png: "res/replayNormal.png",
		replaySelected_png: "res/replaySelected.png",
		sadSally_png: "res/sadSally.png",
		LINEBold_ttf: {
   	     type:"font",
   		 name:"LINEBold",
   		 srcs:["res/fonts/LINEBold.ttf"]
   		}
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}