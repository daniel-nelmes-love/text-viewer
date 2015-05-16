// All values are in px
// Single viewer dimensions
textWidth		= 400
leftHeight		= 350
rightHeight		= 450
// Double viewer dimensions
fullWidth 		= 550
fullHeight		= 550

// Adjustments to button layout
// Gap between buttons
buttonSpacing	= 5
// Top buttons moving further away from the center
viewerButtonXadjust	= 0
// Bottom button moving further to the left
bottomButtonXadjust	= 0
// Buttons moving further upwards
viewerButtonYadjust	= 0
bottomButtonYadjust	= 0

$(document).ready(function() {
	getValues();
	setLayout();
	buttonClick();
});

// Start of functions
// get button dimensions
function getValues() {
	viewerButtonWidth	= $('.viewer-button').width();
	viewerButtonHeight	= $('.viewer-button').height();
	bottomButtonWidth	= $('.bottom-button').width();
	bottomButtonHeight	= $('.bottom-button').height();
	bottomShift = -bottomButtonHeight*0.5;
}
// Dynamic layout
function setLayout() {
	$('#text-viewer-container').css({
		"width":fullWidth-viewerButtonWidth,
		"height": fullHeight
	});
	$('#viewer-button-container').css({
		"width": fullWidth-viewerButtonWidth,
		"height": viewerButtonHeight,
		"margin-bottom": -(viewerButtonHeight/2+viewerButtonYadjust)
	});
	$('#left-button').css({
		"margin-left": -(viewerButtonWidth+buttonSpacing+viewerButtonXadjust)
	});
	$('#right-button').css({
		"margin-left": 0+viewerButtonXadjust
	});
	$('.bottom-button').css({
		"margin-left": -bottomButtonWidth/2-(bottomButtonXadjust+buttonSpacing/2),
		"margin-top": 0-bottomButtonYadjust
	});
}
// Button click listeners
function buttonClick() {
	$('.viewer-button').on('click', function() {
		if ($(this).is('#left-button')) {
			checkStatus('#left-text', '#right-text');
		} else if ($(this).is('#right-button')) {
			checkStatus('#right-text', '#left-text');
		};
	});
	$('.bottom-button').on('click', function() {
		if ($(this).is('#all-button')) {
			if ($('#left-text').children('ul').hasClass('hidden') &&
			 $('#right-text').children('ul').hasClass('hidden')) {
				doubleViewer();
			} else {
				closeViewer(false, 'double');
			};
		} else if ($(this).is('#none-button')) {
			closeViewer(true)
		};
	});
}
// Checks if button's information was hidden
function checkStatus(selectedEle, otherEle) {
	if ($('#all-button').hasClass('hidden')) {
		closeViewer(false, 'single', selectedEle);
	} else if ($(selectedEle).children('ul').hasClass('hidden')) {
		if ($(otherEle).children('ul').hasClass('hidden')) {
			singleViewer(selectedEle);
		} else {
			closeViewer(false, 'single', selectedEle);
		};
	} else {
		closeViewer(true);
	};
}
// Display's a single tab of information
function singleViewer(selectedEle) {		
	if (selectedEle === '#left-text') {
		var textHeight = leftHeight
	} else {
		var textHeight = rightHeight
	};
	var leftShift = -(textWidth/2)-(viewerButtonWidth/2)-viewerButtonXadjust
	var rightShift = (textWidth/2)-(viewerButtonWidth/2)+viewerButtonXadjust
	animateButtons(leftShift, rightShift, bottomShift);
	$(selectedEle).animate({
		"width": textWidth,
		"height": textHeight
	});
	$('#text-container').animate({
		"width": textWidth,
		"height": textHeight
	}, function() {
		$(selectedEle).children('ul').removeClass('hidden');
	});
}
// Displays both tabs of information
function doubleViewer() {
	var containerWidth = fullWidth-viewerButtonWidth
	var textBox = containerWidth/2-5
	var leftShift = -(containerWidth/2)-(viewerButtonWidth/2-(5+viewerButtonXadjust))
	var rightShift = (containerWidth/2)-(viewerButtonWidth/2+(5+viewerButtonXadjust))
	$('.text-box').addClass('double-view');
	$('#left-text').addClass('shift-left');
	$('#right-text').addClass('shift-right');
	animateButtons(leftShift, rightShift, bottomShift);
	$('#left-text').animate({
		"width": textBox,
		"height": fullHeight
	});
	$('#right-text').animate({
		"width": textBox,
		"height": fullHeight
	});
	$('#text-container').animate({
		"width": containerWidth,
		"height": fullHeight
	}, function() {
		$('.text-box').children('ul').removeClass('hidden');
		bottomButton('#all-button', '#none-button');
	});
}
// Closes all tabs
function closeViewer(fullClose, viewer, selectedEle) {
	animateButtons(-(viewerButtonWidth+5), 0, 0);
	function minimiseEle(thisEle) {
		$(thisEle).animate({
			"width": 0,
			"height": 0
		});
	}
	minimiseEle('#left-text');
	minimiseEle('#right-text');
	$('#left-text').children('ul').addClass('hidden');
	$('#right-text').children('ul').addClass('hidden');
	$('#text-container').animate({
		"width": 0,
		"height": 0
	}, function () {
		bottomButton('#none-button', '#all-button');
		$('.text-box').removeClass('double-view');
		$('#left-text').removeClass('shift-left');
		$('#right-text').removeClass('shift-right');
		if (fullClose === false) {
			if (viewer === 'single') {
				singleViewer(selectedEle);
			} else {
				doubleViewer();	
			};
		};
	});
}
// Moves buttons based on arguments
function animateButtons(leftShift, rightShift, bottomShift) {
	$('#left-button').animate({"margin-left":leftShift});
	$('#right-button').animate({"margin-left":rightShift});
	$('#all-button').animate({"margin-top": bottomShift});
	$('#none-button').animate({"margin-top": bottomShift});
}
// Selects which bottom button to show
function bottomButton(hideThis, showThis) {
	$(hideThis).addClass('hidden');
	$(showThis).removeClass('hidden');
}