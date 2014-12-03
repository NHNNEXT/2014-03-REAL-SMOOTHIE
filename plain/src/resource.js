var res = {
		HelloWorld_png : "res/HelloWorld.png",
		CloseNormal_png : "res/CloseNormal.png",
		CloseSelected_png : "res/CloseSelected.png",
		Rect_png : "res/rect.png",
		BG_jpg : "res/BG.jpg",
		Pipe_2way_line : "res/test2-i.png",
		Pipe_2way_curve : "res/test2-l.png",
		Pipe_3way : "res/test2-t.png",
		Pipe_4way : "res/test2-x.png",
		fixed_sign : "res/fixed.png",
		sally : "res/sally.png",
		cony : "res/cony.png",
		cony_headsick: "res/cony_headsick.png",
		button_n: "res/animationbuttonnormal.png",
		button_p: "res/animationbuttonpressed.png",
		nextNormal_png: "res/nextNormal.png",
		nextSelected_png: "res/nextSelected.png",
		retryNormal_png: "res/retryNormal.png",
		retrySelected_png: "res/retrySelected.png",
		sadSally_png: "res/sadSally.png",
		happySally_png: "res/happySally.png",
		isolation_png: "res/isolation.png",
		treasure_png: "res/treasure.png",
		hpfull_png: "res/hp_full_140.png",
		hpempty_png: "res/hp_empty_140.png",
		mixer_png: "res/mixer.png",
		item_carrot_png: "res/item_carrot.png",
		LINEBold_ttf: {
   	     type:"font",
   		 name:"LINEBold",
   		 srcs:["res/fonts/LINEBold.ttf"]
   		},
    rotateRight_mp3 : "res/sound/rotateRight.mp3",
    rotateLeft_mp3 : "res/sound/rotateLeft.mp3",GamePlayBGM_mp3 : "res/sound/GamePlayBGM.mp3",
    attack_mp3 : "res/sound/attack.mp3",gameclear_mp3 : "res/sound/gameclear.mp3",gameover_mp3 : "res/sound/gameover.mp3",button_mp3 : "res/sound/button.mp3"
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}
