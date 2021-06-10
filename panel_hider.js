var rightPanel = null;
var leftPanel = null;
var button = null;

function addRightPanelHideButton() {
	button = document.createElement("Button");
	button.innerHTML = "hide panel";
	button.style = "top:0;right:0;position:absolute;z-index: 9999; font-family: monospace"
	button.onclick = function() {
		rightPanel.hidden = !rightPanel.hidden;
		button.innerHTML = rightPanel.hidden ? "show panel" : "hide panel";
	};
	document.body.appendChild(button);
}

function checkRightPanel() {
	var rightPanelTmp = document.getElementById('jira-issue-header-actions')?.parentNode?.parentNode;
	if (!!rightPanelTmp && rightPanelTmp !== rightPanel) {
		rightPanel = rightPanelTmp;
		rightPanel.hidden = false;
		if (!button) {
			addRightPanelHideButton();
		} else if (button.hidden) {
			button.hidden = false;
		}
	} else if (!rightPanelTmp && button && !button.hidden) {
		button.hidden = true;
	}
}

function checkLeftPanel() {
	var leftPanelTmp = document.getElementById('jira-issue-header')?.parentNode?.parentNode;
	if (!!leftPanelTmp && leftPanelTmp !== leftPanel) {
		leftPanel = leftPanelTmp;
		leftPanel.style.paddingLeft = "0px";
	}
}

function checkCodeBlocks() {
	var codeBlocks = document.getElementsByClassName('code-block');
	for (var i = 0; i < codeBlocks.length; i++) {
		element = codeBlocks.item(i);
		element.childNodes[0].childNodes[0].style.maxHeight = '40em';
	}
}

function observeChanges() {
  'use strict';
  var observer = new MutationObserver(function(mutations) {
  console.log(document.readyState)
	checkRightPanel();
	checkLeftPanel();
	checkCodeBlocks();
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
};

observeChanges();

