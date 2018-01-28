// Holds the data structure for all the context menus used in the app

var CONTEXT_MENU_CONTENTS = {
    forWindows : [
        'Listen'
    ],
    forSelection: [
        'Selection context menu'
    ]
}

function setUpContextMenus() {
    CONTEXT_MENU_CONTENTS.forWindows.forEach(function(commandId) {
        chrome.contextMenus.create({
            title: 'Ni-Howdy ' + commandId,
            type: 'radio',
            id: 'Ni-Howdy' + commandId,
            documentUrlPatterns: [ "chrome-extension://*/a.html"],
            contexts: ['all']
        });
    });
    CONTEXT_MENU_CONTENTS.forSelection.forEach(function(commandId) {
        chrome.contextMenus.create({
            type: "separator",
            id: 'sep1',
            contexts: ['selection']
        });
        chrome.contextMenus.create( {
            title: commandId + ' "%s"',
            id: commandId,
            contexts: ['selection']
        });
    });
}

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('a.html', {id: 'Ni-Howdy', outerBounds:{top: 0, left: 0, width: 300, height: 300}});
});

chrome.runtime.onInstalled.addListener(function() {
    // When the app gets installed, set up the context menus
    setUpContextMenus();
});

// assuming this is where the action happens after the click
// but don't know how to activate listening backend

chrome.contextMenus.onClicked.addListener(function(itemData) {
    if (itemData.menuItemId == "Ni-Howdy")
        chrome.app.window.create('a.html', {id: 'Ni-Howdy', outerBounds:{top: 0, left: 0, width: 300, height: 300}});
});