// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 0 represents color icon, 1 b/w
var iconToggle = 0;

function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.match(/twitter.com/)) {
    chrome.pageAction.show(tabId);
  }
};

function toggleIconAndHighlights(tab) {
  if (iconToggle === 0) {
    chrome.pageAction.setIcon({path:"icons/icon_19-bw.png", tabId: tab.id});
    chrome.tabs.executeScript(tab.id, {
      file: "scripts/hide-highlights.js"
    });
    iconToggle = 1;
  } else {
    chrome.pageAction.setIcon({path:"icons/icon_19.png", tabId: tab.id});
    chrome.tabs.executeScript(tab.id, {
      file: "scripts/show-highlights.js"
    });
    iconToggle = 0;
  }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
// Changes icon on-click.
chrome.pageAction.onClicked.addListener(toggleIconAndHighlights);