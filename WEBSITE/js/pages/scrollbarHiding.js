function hideScrollbar(){
	var parents = document.getElementsByClassName('container1');
	var childs = document.getElementsByClassName('container2');
	var size = Object.keys(childs).length;
	for(i=0;i<size;i++){
		var parent = parents[i];
    	var child = childs[i];
		var number = child.offsetWidth - child.clientWidth + 2;
    	number = number + "px";
		child.style.paddingRight = number;
		child.style.marginTop = number;
		child.style.marginRight = "-" + number;
		child.style.marginLeft = number;
		child.style.margiBottom = number;
	}
}

hideScrollbar();

window.onresize = function(event) {
	hideScrollbar();
};