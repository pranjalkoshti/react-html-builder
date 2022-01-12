

export const downloadHtml = (innerHTML) =>{
    
        var element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(innerHTML));
        element.setAttribute('download', 'index.html');
        document.body.appendChild(element);
        element.click();
    }