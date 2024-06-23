/* Custom JS */

/* Start Single Page Application */
(function () {

    var partialsCache = {}

    function fetchFile(path, callback){
        var request = new XMLHttpRequest();
        request.onload = function () {
        callback(request.responseText);
        };
        request.open("GET", path);
        request.send(null);
    }

    function getContent(fragmentId, callback){
        if(partialsCache[fragmentId]) {
        callback(partialsCache[fragmentId]);
        } else {
        fetchFile("templates/" + fragmentId + ".html", function (content) {
            partialsCache[fragmentId] = content;
            callback(content);
        });
        }
    }

    function setActiveLink(fragmentId){
        var navbarDiv = document.getElementById("navbar"),
            links = navbarDiv.children,
            i, link, pageName;
        for(i = 0; i < links.length; i++){
        link = links[i];
        pageName = link.getAttribute("href").substr(1);
        if(pageName === fragmentId) {
            link.setAttribute("class", "active");
        } else {
            link.removeAttribute("class");
        }
        }
    }

    function navigate(){
        var contentDiv = document.getElementById("content"),
            fragmentId = location.hash.substr(1);
        getContent(fragmentId, function (content) {
        contentDiv.innerHTML = content;
        });
        setActiveLink(fragmentId);
    }

    if(!location.hash) {
        location.hash = "#home";
    }

    navigate();
    window.addEventListener("hashchange", navigate)

}());
/* End Single Page Application */