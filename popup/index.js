// Матур (красивый) JSON код
var input = document.getElementById("code")

chrome.storage.local.get('gatheredPolygons', data => {
	var stringify = JSON.stringify(data.gatheredPolygons, null, 2)
	input.innerHTML = hljs.highlight(stringify, {
          language: 'json',
    }).value
	//if(data != null) input.value = JSON.stringify(data)
})

// Кнопка скачивания
var button = document.getElementById("download")
button.addEventListener("click", () => {
	chrome.storage.local.get('gatheredPolygons', data => {
		downloadObjectAsJson(data.gatheredPolygons, "Объекты")
	})
}, false)

// Скрипт для локального скачивания .json
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Кнопка очистки
var resetButton = document.getElementById("reset")
resetButton.addEventListener("click", () => {
	chrome.storage.local.set({ 'gatheredPolygons': [] })
	input.innerHTML = "[]"
}, false)