/*global $ */
$(document).ready(function () {

    "use strict";

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI


    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

    $(".menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");

    //Adds menu-mobile class (for mobile toggle menu) before the normal menu
    //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
    //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble

    $(".menu > ul > li").hover(
        function (e) {
            if ($(window).width() > 943) {
                $(this).children("ul").fadeIn(150);
                e.preventDefault();
            }
        }, function (e) {
            if ($(window).width() > 943) {
                $(this).children("ul").fadeOut(150);
                e.preventDefault();
            }
        }
    );
    //If width is more than 943px dropdowns are displayed on hover


    //the following hides the menu when a click is registered outside
    $(document).on('click', function(e){
        if($(e.target).parents('.menu').length === 0)
            $(".menu > ul").removeClass('show-on-mobile');
    });

    $(".menu > ul > li").click(function() {
        //no more overlapping menus
        //hides other children menus when a list item with children menus is clicked
        var thisMenu = $(this).children("ul");
        var prevState = thisMenu.css('display');
        $(".menu > ul > li > ul").fadeOut();
        if ($(window).width() < 943) {
            if(prevState !== 'block')
                thisMenu.fadeIn(150);
        }
    });
    //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

    $(".menu-mobile").click(function (e) {
        $(".menu > ul").toggleClass('show-on-mobile');
        e.preventDefault();
    });
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)

});




var headerH = $("#header").outerHeight(true);//headerの高さを取得

//スクロール途中からヘッダーの高さを変化させるための設定を関数でまとめる
function FixedAnime() {
	//ヘッダーの高さを取得
	var scroll = $(window).scrollTop();
	if (scroll >= headerH){//ヘッダーの高さを超えたら
        $('#header').addClass('HeightMin');//#headerについているHeightMinというクラス名を付与
	}else{
        $('#header').removeClass('HeightMin');//HeightMinというクラス名を除去
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	FixedAnime();//スクロール途中からヘッダーの高さを変化させる関数を呼ぶ
});

//リンク先のidまでスムーススクロール
//※ページ内リンクを行わない場合は不必要なので削除してください
$('#g-navi li a').click(function () {
	var headerVal = $("#header").outerHeight(true);	//現在のheaderの高さを取得

	//ヘッダーが高さの状態を取得してスクロールする範囲を調整する
	var scroll = $(window).scrollTop();	//スクロール
	var adjust = 0						//調整の変数
	if(scroll <= headerVal ){			//スクロールとヘッダーの高さを取得
		adjust = 70;					//スクロール値がヘッダーの高さ以内であれば調整変数に70を入れる
	}

	var elmHash = $(this).attr('href'); //hrefを取得
	var pos = $(elmHash).offset().top-headerVal-adjust;	//クリックしたheader分の高さと調整分を引いた高さまでスクロール

	$('body,html').animate({scrollTop: pos}, 1000);
	return false;
});
