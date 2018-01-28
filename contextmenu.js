var contextMenuItem = {

        "id": "readOutLoud",
        "title": "Ni-Howdy",
        "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') }, function (tab) {
    });
});

chrome.contextMenus.onClicked.addListener(function(clickText){
        if (clickText.menuItemId == "readOutLoud" && clickText.selectionText){
                var text = window.getSelection().toString();

            chrome.notifications.create('limitNotif', notifOptions);
                chrome.storage.sync.get(['whole','end'], function(Listen){
                var ProAccuracy = 0;
                if(Listen.total){
                    ProAccuracy += parseInt(Listen.total);
                }
                ProAccuracy += parseInt(ClickText.selectionText);
                chrome.storage.sync.set({'total': ProAccuracy}, function(){
                    //if(ProAccuracy == 100){
                        // where graph should go
                        var notifOptions = {
                          type: 'basic',
                          iconUrl: "default_icon.png",
                            title: "Listening Complete",
                            message: "Congrats! You can read this spot-on!"
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    //}
                })
            })

        }
})
