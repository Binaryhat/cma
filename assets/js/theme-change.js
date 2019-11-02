var $body = $("body");
var defaultfontsize = 14;
var fontsize = defaultfontsize;

$( document ).ready(function() {    
    var stored_theme=window.localStorage.getItem('stored_theme');
    if(stored_theme != undefined){
        _addTheme(stored_theme);
    }
});

function _removeThemes() {
    $body.removeClass("dark_theme");
    $body.removeClass("default_theme");
    $body.removeClass("green_theme");
    $body.removeClass("blue_theme");
    $body.removeClass("red_theme");

    $body.removeClass("blind_theme");
    window.localStorage.setItem('stored_theme', 'default_theme');
}

function _addTheme(themeName) {
    $body.addClass(themeName);
}

function _applyTheme(themeName) {
    _removeThemes();
    setTimeout( _addTheme(themeName), 10);
    window.localStorage.setItem('stored_theme', ''+themeName+'');
}

$body.on("change", "#settingmodal input#darkSwitch", function (e) {
    var isChecked = $(e.target).is(":checked");
     
    _applyTheme(isChecked ? "dark_theme" : "default_theme");
});

$body.on("change", "#settingmodal input.theme-changer", function (e) {
    // var themeName = $(e.target).attr("theme-name");
    _applyTheme(e.target.value);
});

$body.on("click", "#settingmodal #blindbtnid", function (e) {
    // var themeName = $(e.target).attr("theme-name");
    _applyTheme('blind_theme');
});

$body.on("click", "#settingmodal #_biggify", function (e) {

    if(fontsize<20)
    {
        fontsize++;
    }
    else 
    {  }
    
    $('html').css('font-size', fontsize+'px');
    $('h4').css('font-size', fontsize+'px');
    $('div').css('font-size', fontsize+'px');
    $('span').css('font-size', fontsize+'px');
   
    
});

$body.on("click", "#settingmodal #_smallify", function (e) {
    if(fontsize>9)
    {
        fontsize--;
    }
    else 
    {  }
    
    $('html').css('font-size', fontsize+'px');
    $('h4').css('font-size', fontsize+'px');
    $('div').css('font-size', fontsize+'px');
    $('span').css('font-size', fontsize+'px');
});

$body.on("click", "#settingmodal #resettheme", function (e) {
    _removeThemes();
    $('html').css('font-size', '');
    $('h4').css('font-size', '');
    $('div').css('font-size','');
    $('span').css('font-size', '');
});

 
