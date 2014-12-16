var res = {
		HelloWorld_png : "res/HelloWorld.png",
		Rect_png : "res/rect.png",
		BG_jpg : "res/BG.jpg",
		fruits_png: "res/fruits.png",
        fruits_blur_png : "res/fruits_blur.png",
        home_title_png : "res/home_title.png",
        // Blocks
		Pipe_2way_line : "res/test2-i.png",
		Pipe_2way_curve : "res/test2-l.png",
		Pipe_3way : "res/test2-t.png",
		Pipe_4way : "res/test2-x.png",
		isolation_png: "res/isolation.png",
		treasure_png: "res/treasure.png",
		fixed_sign : "res/fixed.png",
		// UI
		fbConnectNormal_png: "res/fb_connect.png",
		fbConnectSelected_png: "res/fb_connect.png",
		fbLogoutNormal_png: "res/fb_logout.png",
		fbLogoutSelected_png: "res/fb_logout.png",
		playNormal_png: "res/play_btn.png",
		playSelected_png: "res/play_btn.png",
		button_n: "res/animationbuttonnormal.png",
		button_p: "res/animationbuttonpressed.png",
		nextNormal_png: "res/nextNormal.png",
		nextSelected_png: "res/nextSelected.png",
		retryNormal_png: "res/retryNormal.png",
		retrySelected_png: "res/retrySelected.png",
		CloseNormal_png : "res/CloseNormal.png",
		CloseSelected_png : "res/CloseSelected.png",
		levelCircle_png : "res/circle.png",
		// Characters
		sally : "res/sally.png",
		cony : "res/cony.png",
		cony_headsick: "res/cony_headsick.png",
		sadSally_png: "res/sadSally.png",
		happySally_png: "res/happySally.png",
		// HP
		hpfull_png: "res/hp_full_140.png",
		hpempty_png: "res/hp_empty_140.png",
		// Items
		item_carrot_png: "res/item_carrot.png",
		// Mixer
		mixer_png: "res/mixer.png",
		no_cup: "res/no_cup.png",
		papercup_small_empty: "res/papercup_small.png",
		papercup_small_half: "res/papercup_small.png",
		papercup_small_full: "res/papercup_small.png",
		// Font
		LINEBold_ttf: {
   	     type:"font",
   		 name:"LINEBold",
   		 srcs:["res/fonts/LINEBold.ttf"]
   		},
   		// Sounds
    rotateRight_mp3 : "res/sound/rotateRight.mp3",
    rotateLeft_mp3 : "res/sound/rotateLeft.mp3",GamePlayBGM_mp3 : "res/sound/GamePlayBGM.mp3",
    attack_mp3 : "res/sound/attack.mp3",gameclear_mp3 : "res/sound/gameclear.mp3",gameover_mp3 : "res/sound/gameover.mp3",button_mp3 : "res/sound/button.mp3"
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}
