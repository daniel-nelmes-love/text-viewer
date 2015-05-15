$(document).ready(function() {

	$('.viewer-button').on('click', function() {
		if ($(this).is('#left-button')) {
			checkStatus('#left-text', '#right-text', 'colourA');
		} else if ($(this).is('#right-button')) {
			checkStatus('#right-text', '#left-text', 'colourB');
		} else {

		};
	})
});

function checkStatus(selectedEle, otherEle, bgColour) {
	if ($(selectedEle).hasClass('hidden')) {
		closeViewer(selectedEle, otherEle, bgColour);
		openViewer(selectedEle, otherEle);
	} else {
		closeViewer(selectedEle, otherEle);
	};
}

function openViewer(selectedEle, otherEle) {
	// Buttons when viewer is open (Left, Right, All, None)
	// Left and right are distance from the center
	// All and none are distance from the bottom
	animateButtons('-225', '175', '-25', '-25');
	$('.text-container').animate({
		// Viewer maximums
		"width": '400',
		"height": '250'
	}, function() {
		showText(selectedEle, otherEle);
	});
}

function closeViewer(selectedEle, otherEle, bgColour) {
	// Buttons when viewer is closed (Left, Right, All, None)
	animateButtons('-55', '0', '-50', '-50');
	$('.text-container').animate({
		// Closed viewer
		"width": '0',
		"height": '0'
	}, function() {
		hideText(selectedEle, otherEle);

		var selectedColour = bgColour
		if (selectedColour==='colourA') {
			$('.text-container').removeClass('colourB');
			$('.text-container').addClass('colourA');
		} else {
			$('.text-container').removeClass('colourA');
			$('.text-container').addClass('colourB');
		};
	});
}

function animateButtons(left, right, all, none) {
	$('#left-button').animate({"margin-left":left});
	$('#right-button').animate({"margin-left":right});
	$('#all-button').animate({"margin-top":all});
	$('#none-button').animate({"margin-top":none});
}

function showText(selectedEle, otherEle) {
	$(otherEle).addClass('hidden');
	$(selectedEle).removeClass('hidden');
}

function hideText(selectedEle, otherEle) {
	$(otherEle).addClass('hidden');
	$(selectedEle).addClass('hidden');
}