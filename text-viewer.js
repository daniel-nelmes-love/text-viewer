// Basic Layout //
textContainerWidth	= 550
textContainerHeight	= 600
leftHeight			= 350
rightHeight			= 450
doubleHeight		= 550
buttonSpacing		= 5

// Closed Buttons //
closedLeftX			= 0
closedLeftY			= 0
closedRightX		= 0
closedRightY		= 0
closedBottomX		= 0
closedBottomY		= 0

// Open Buttons //
openLeftX			= 0
openLeftY			= 0
openRightX			= 0
openRightY			= 0
openBottomX			= 0
openBottomLeftY		= 0
openBottomRightY	= 0
openBottomAllY		= 0




$(document).ready(function() {
	setUp();
	buttonClick();
});

function setUp() {
	viewerButtonWidth	= $('.viewer-button').width();
	viewerButtonHeight	= $('.viewer-button').height();
	bottomButtonWidth	= $('.bottom-button').width();
	bottomButtonHeight	= $('.bottom-button').height();
	// Viewer Sizing //
	textBoxDrop			= viewerButtonHeight/2;
	textBoxWidth		= textContainerWidth-viewerButtonWidth;
	leftTextBoxHeight	= leftHeight;
	rightTextBoxHeight	= rightHeight;
	allTextBoxHeight	= textContainerHeight-textBoxDrop;
	// Closed Button Position //
	closedLeftX		= -(viewerButtonWidth+buttonSpacing/2)-closedLeftX;
	closedRightX	= 0+buttonSpacing/2+closedRightX;
	closedLeftY		= -viewerButtonHeight/2-closedLeftY;
	closedRightY	= -viewerButtonHeight/2-closedRightY;
	closedBottomX	= -bottomButtonWidth/2-closedBottomX;
	closedBottomY	= viewerButtonHeight-(bottomButtonHeight+closedBottomY);
	// Open Button Position //
	openLeftX		= -textContainerWidth/2-openLeftX;
	openRightX		= textContainerWidth/2-viewerButtonWidth+openRightX;
	openLeftY		= -viewerButtonHeight/2-openLeftY;
	openRightY		= -viewerButtonHeight/2-openRightY;
	openBottomX		= -bottomButtonWidth/2-openBottomX;
	openBottomY		= closedBottomX+bottomButtonHeight*1.5
	openBottomLeftY	= openBottomY+leftTextBoxHeight;
	openBottomRightY= openBottomY+rightTextBoxHeight;
	openBottomAllY	= openBottomY+allTextBoxHeight;
	

	$('#text-viewer-container').css({
		"width":textContainerWidth,
		"height": textContainerHeight
	});
	$('#viewer-button-container').css({
		"width": textContainerWidth,
		"height": viewerButtonHeight,
		"margin-top": -textBoxDrop
	});
	$('#text-container').css({
		"margin-top": -textBoxDrop
	});
	$('#left-button').css({
		"margin-left": closedLeftX
	});
	$('#right-button').css({
		"margin-left": closedRightX
	});
	$('.bottom-button').css({
		"margin-left": closedBottomX,
		"margin-top": closedBottomY
	});
}

// Button click listeners
function buttonClick() {
	$('.viewer-button').on('click', function() {
		var TargId = $(this).attr('id');
		checkStatus(TargId);
	});
	$('#none-button').on('click', function() {
		closeButtons();
		closeViewer();
	});
	$('#all-button').on('click', function() {
		if ($('#left-button-text').children('ul').hasClass('hidden') &&
			 $('#right-button-text').children('ul').hasClass('hidden')) {
			openButtons(openBottomAllY);
			doubleViewer();
		} else {
			closeButtons();
			closeViewer();
			openButtons(openBottomAllY);
			doubleViewer();
		}
	});
}
// Checks if button's information was hidden
function checkStatus(TargId) {
	if (TargId=='left-button') {
		var OppId = 'right-button';
		var bottomY = openBottomLeftY;
		var boxHeight = leftTextBoxHeight;
	} else {
		var OppId = 'left-button';
		var bottomY = openBottomRightY;
		var boxHeight = rightTextBoxHeight;
	};

	if ($('#all-button').hasClass('hidden')) {
		closeButtons();
		closeViewer();
		openButtons(bottomY);
		singleViewer(TargId, boxHeight);
	} else if ($('#'+TargId+'-text').children('ul').hasClass('hidden')) {
		if ($('#'+OppId+'-text').children('ul').hasClass('hidden')) {
			openButtons(bottomY);
			singleViewer(TargId, boxHeight);
		} else {
			closeButtons();
			closeViewer();
			openButtons(bottomY);
			singleViewer(TargId, boxHeight);
		};
	} else {
		closeButtons();
		closeViewer();
	};
}
function closeButtons() {
	$('#left-button').animate({"margin-left": closedLeftX});
	$('#right-button').animate({"margin-left": closedRightX});
	$('.bottom-button').animate({"margin-top": closedBottomY});
}
// Moves buttons based on arguments
function openButtons(bottomY) {
	$('#left-button').animate({"margin-left": openLeftX});
	$('#right-button').animate({"margin-left": openRightX});
	$('.bottom-button').animate({
		"margin-left": openBottomX,
		"margin-top": bottomY
	});
}
// Display's a single tab of information
function singleViewer(TargId, boxHeight) {
	$('.text-box').removeClass('double-view');
	$('#left-button-text').removeClass('shift-left');
	$('#right-button-text').removeClass('shift-right');
	$('#'+TargId+'-text').animate({
		"width": textBoxWidth,
		"height": boxHeight
	});
	$('#text-container').animate({
		"width": textBoxWidth,
		"height": boxHeight
	}, function() {
		$('#'+TargId+'-text').children('ul').removeClass('hidden');
		
	});
}
function closeViewer() {
	function minimiseEle(thisEle) {
		$(thisEle).animate({
			"width": 0,
			"height": 0
		});
		$(thisEle).children('ul').addClass('hidden');
	}
	minimiseEle('#left-button-text');
	minimiseEle('#right-button-text');

	$('#text-container').animate({
		"width": 0,
		"height": 0
	}, function () {
		bottomButton('#none-button', '#all-button');
	});
}

// Displays both tabs of information
function doubleViewer() {
	var textBox = textBoxWidth/2-4
	var leftShift = -(textBoxWidth/2)-(viewerButtonWidth/2)
	var rightShift = (textBoxWidth/2)-(viewerButtonWidth/2)
	$('.text-box').addClass('double-view');
	$('#left-button-text').addClass('shift-left');
	$('#right-button-text').addClass('shift-right');
	$('#left-button-text').animate({
		"width": textBox,
		"height": allTextBoxHeight
	});
	$('#right-button-text').animate({
		"width": textBox,
		"height": allTextBoxHeight
	});
	$('#text-container').animate({
		"width": textBoxWidth,
		"height": allTextBoxHeight
	}, function() {
		$('.text-box').children('ul').removeClass('hidden');
		bottomButton('#all-button', '#none-button');
	});
}

// Selects which bottom button to show
function bottomButton(hideThis, showThis) {
	$(hideThis).addClass('hidden');
	$(showThis).removeClass('hidden');
}










