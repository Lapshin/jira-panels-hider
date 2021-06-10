var rightPanel = null;
var leftPanel = null;
var button = null;

function addRightPanelHideButton() {
	button = document.createElement("Button");
	button.innerHTML = "show panel";
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
		rightPanel.hidden = true;
		rightPanel.style.paddingRight = "0px";
		rightPanel.style.width = "10%";
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

function observeChanges() {
  'use strict';
  var observer = new MutationObserver(function(mutations) {
  console.log(document.readyState)
	checkRightPanel();
	checkLeftPanel();
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
};

observeChanges();

