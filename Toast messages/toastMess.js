function toast({type = '', title = '', messages='', duration = 3000}){
var main = document.getElementById('toast');
if(main){
    var toast = document.createElement('div');
    const icons = {
        success: 'fas fa-check',
        danger: 'fas fa-exclamation'
    };
    var icon = icons[type];
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add(`toast__${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = `
                        <div id="toast__icon"><i class='${icon}'></i></div>
                        <div id="toast__body">
                            <p id="title">${title}</p>
                            <p id="message">
                                ${messages}
                            </p>
                        </div>
                        <div id="toast__close"><i class="fas fa-times"></i></div>
                        `
    main.appendChild(toast);
    toast.onclick = function(e){
        if (e.target.closest('#toast__close')){
            main.removeChild(toast);
        }
    }

    const autoRemove = setTimeout(() => {
        main.removeChild(toast);
    }, duration + 1000)

    }
}   