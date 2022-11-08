window.onload = function(){
    var search = document.querySelector("button");
    var result = document.querySelector(".result");
    var query = document.querySelector("input");
    search.addEventListener('click', handleClick);
    var httpRequest = new XMLHttpRequest();
    
    function handleClick(clickEvent){
        clickEvent.preventDefault();
        var url = "superheroes.php?query=" + query.value;
        httpRequest.onreadystatechange = fetchingdata;
        httpRequest.open('GET', url, true);
        httpRequest.send();
    }
    function fetchingdata(){
        if (httpRequest.readyState === XMLHttpRequest.DONE){
            if (httpRequest.status === 200){
                var response = httpRequest.responseText;
                result.innerHTML = response;
            }
            else{
                result.innerHTML = "Error: This resquest can not be deliver. Please try again.";
            }
        }
    }
}