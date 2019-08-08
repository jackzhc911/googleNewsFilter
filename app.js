var blocklist;
const templateHtml = '<div><h1 style="padding: 30px; text-align: center;">生活很美好，不用看這些~~</h1></div>';

function removeNews () {
  //const articles = content.querySelectorAll(`div[id][role="article"]`)
  const articles = document.querySelectorAll('a.DY5T1d');
  //alert(articles.length);
  function hasSensitiveWordInBlocklist (article) {
    return blocklist.some((sensitiveWord) => article.innerHTML.includes(sensitiveWord));
  }

  articles.forEach(function (article) {
    if (hasSensitiveWordInBlocklist(article)) {
      article.innerHTML = templateHtml;
    }
  })
}

function main(){
	const url = chrome.runtime.getURL('./keywords.json');
	fetch(url).then(
		function(response) {
			if (response.status !== 200) {
				alert('Looks like there was a problem. Status Code: ' +
				response.status);
				return;
			}

			// Examine the text in the response
			response.text().then(function(data) {
				blocklist = eval(data);
			
				removeNews();
			});
		}
	).catch(function(err) {
		alert('Fetch Error :-S', err);
	});
}

main();