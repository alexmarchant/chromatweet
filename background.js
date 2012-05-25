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

function updateIcon() {
  if iconToggle === 0 {
    chrome.pageAction.setIcon({path:"bw-icon.png"});
    iconToggle = 1;
  } else {
    chrome.pageAction.setIcon({path:"bw-icon.png"});
    iconToggle = 0;
  }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
// Changes icon on-click.
// chrome.pageAction.onClicked.addListener(updateIcon);