// ==UserScript==
// @name         enha to namu
// @namespace    http://xenosi.de/
// @version      0.2
// @description  fixit
// @author       Song Hyo Jin (shj at xenosi.de)
// @match        https://www.google.com/*
// @match        https://www.google.co.kr/*
// @match        https://www.google.co.jp/*
// @match        http://www.google.com/*
// @match        http://www.google.co.kr/*
// @match        http://www.google.co.jp/*
// @grant        none
// ==/UserScript==
var rigvedawikiNet, mirrorEnhaKr, mirPe, namuMoe, namuWiki;

function redirect(a, setting, regex) {
    if (regex.test(a.href)) {
        switch (setting) {
            case "namu-wiki":
                a.href = a.href.replace(regex, "https://namu.wiki/w");
                break;

            case "namu-mirror-wiki":
                a.href = a.href.replace(regex, "https://namu.mirror.wiki/w");
                break;

            case "dark-namu-wiki":
                a.href = a.href.replace(regex, "https://namu.mirror.wiki/dark");
                break;

            default:
                a.href = a.href.replace(regex, "https://namu.wiki/w");
                break;
        }
    }
}

chrome.storage.sync.get(["rigvedawikiNet", "mirrorEnhaKr", "mirPe", "namuMirrorWiki", "namuMoe", "namuWiki"], function (items) {
    rigvedawikiNet = items["rigvedawikiNet"];
    mirrorEnhaKr = items["mirrorEnhaKr"];
    mirPe = items["mirPe"];
    namuMirrorWiki = items["namuMirrorWiki"];
    namuMoe = items["namuMoe"];
    namuWiki = items["namuWiki"];
});

setInterval(function() {
    var as = document.querySelectorAll("a:not(.replaced)");
    if(!as.length) return;
    for(var i = 0; i < as.length; i++) {
        (function(a) {
            var rigvedawikiKrNetRegexOld = new RegExp("https?:\/\/([a-z0-9]+[.])*rigvedawiki\.net\/r1\/wiki.php");
            var rigvedawikiKrNetRegexNew = new RegExp("https?:\/\/([a-z0-9]+[.])*rigvedawiki\.net");
            var mirrorEnhaKrRegex = new RegExp("https?:\/\/([a-z0-9]+[.])*enha\.kr\/wiki");
            var mirPeRegex = new RegExp("https?:\/\/([a-z0-9]+[.])*mir\.pe\/wiki");
            var namuMirrorWikiRegex = new RegExp("https?:\/\/([a-z0-9]+[.])*namu\.mirror\.wiki\/w");
            var namuMoeRegex = new RegExp("https?:\/\/([a-z0-9]+[.])*namu\.moe\/w");
            var namuWikiRegex = new RegExp("https?:\/\/([a-z0-9]+[.])*namu\.wiki\/w");
            if (rigvedawikiKrNetRegexNew.test(a.href) || mirrorEnhaKrRegex.test(a.href) || mirPeRegex.test(a.href) || namuMirrorWikiRegex.test(a.href) || namuMoeRegex.test(a.href) || namuWikiRegex.test(a.href)) {
                a.className += " replaced";

                // 예전의 URL 형식인지 먼저 확인한다. 이를 통과하게 되면 최신 갱신된 URL 형식의 테스트를 통과할 수 없다.
                redirect(a, rigvedawikiNet, rigvedawikiKrNetRegexOld);
                // 최근 갱신된 URL 형식일 때 통과된다.
                redirect(a, rigvedawikiNet, rigvedawikiKrNetRegexNew);
                redirect(a, mirrorEnhaKr, mirrorEnhaKrRegex);
                redirect(a, mirPe, mirPeRegex);
                redirect(a, namuMirrorWiki, namuMirrorWikiRegex);
                redirect(a, namuMoe, namuMoeRegex);
                redirect(a, namuWiki, namuWikiRegex);

                a.removeAttribute("onmousedown");
                var b = a.cloneNode(true);
                a.parentNode.replaceChild(b, a);
            }
        })(as[i]);
    }
}, 500);
