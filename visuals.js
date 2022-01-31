function moveToGame(){
    title = document.getElementById("title");
    title.style.display = "none";
    img = document.getElementById("img");
    img.style.display = "none";
    var menu = document.getElementById("menu");
    menu.style.display = "none";
    var cols = document.getElementsByTagName("canvas");
    for(i = 0; i < cols.length; i++) {
      cols[i].style.display = "block";
    }
}