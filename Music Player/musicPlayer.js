



        //Nghĩ cách fix bug khi seek
        //Nghĩ bấm vào option thì thực hiện gì










const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const heading = $('header > h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');         
const repeatBtn = $('.btn-repeat');
const randomBtn = $(".btn-random");
const list = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,           
    isRepeat: false,
    listSongPlayed: [],
    song: [
        {
            name: "VÌ CÔ TA LÀ NGƯỜI THỨ 3",
            singer: "COVER BY CẨM NHI",
            path: "./Music/VÌ CÔ TA LÀ NGƯỜI THỨ 3 (DEMO) COVER BY CẨM NHI.mp3",
            image:"./Image/cbdbb3c3adbe5ae003af.jpg",
        },
        {
            name: "TÌNH BẠN DIỆU KỲ",
            singer: "AMEE x Ricky Star x Lăng LD ( Masew Remix )",
            path: "./Music/TÌNH BẠN DIỆU KỲ - AMEE x Ricky Star x Lăng LD ( Masew Remix ).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        {
            name: "Thức Giấc",
            singer: "Da LAB",
            path: "./Music/Thức Giấc - Da LAB (Official Music Video).mp3",
            image:"./Image/cbdbb3c3adbe5ae003af.jpg",
        },
        {
            name: "Impossible",
            singer: "James Arthur",
            path: "./Music/James Arthur - Impossible (Lyrics).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        {
            name: "TÌNH BẠN DIỆU KỲ",
            singer: "AMEE x Ricky Star x Lăng LD ( Masew Remix )",
            path: "./Music/TÌNH BẠN DIỆU KỲ - AMEE x Ricky Star x Lăng LD ( Masew Remix ).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        {
            name: "TÌNH BẠN DIỆU KỲ",
            singer: "AMEE x Ricky Star x Lăng LD ( Masew Remix )",
            path: "./Music/TÌNH BẠN DIỆU KỲ - AMEE x Ricky Star x Lăng LD ( Masew Remix ).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        {
            name: "Thức Giấc",
            singer: "Da LAB",
            path: "./Music/Thức Giấc - Da LAB (Official Music Video).mp3",
            image:"./Image/cbdbb3c3adbe5ae003af.jpg",
        },
        {
            name: "Impossible",
            singer: "James Arthur",
            path: "./Music/James Arthur - Impossible (Lyrics).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        {
            name: "TÌNH BẠN DIỆU KỲ",
            singer: "AMEE x Ricky Star x Lăng LD ( Masew Remix )",
            path: "./Music/TÌNH BẠN DIỆU KỲ - AMEE x Ricky Star x Lăng LD ( Masew Remix ).mp3",
            image:"./Image/665f63f1018cf6d2af9d.jpg",
        },
        
    ],

    start: function(){
        // Render list danh sách bài hát
        this.render();
        // Định nghĩa property cho object
        this.defineProperties();
        // Load bài hát đàu tiên lên ứng dụng
        this.loadCurrentSong();
        // Xử lí sự kiện
        this.handleEvents();
    },
    defineProperties: function(){
        Object.defineProperty(this, "currentSong", {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = `${this.currentSong.path}`

    },
   
    render: function(){
        let htmls = this.song.map((item, index) => {
            return `
                <div class="song ${index == this.currentIndex ? 'active' : ''}" data-set="${index}">
                    <div class="thumb" style="background-image: url('${item.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${item.name}</h3>
                    <p class="author">${item.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    // cập nhật trạng thái active
    update(){   
        var temp = Number(_this.currentIndex);
        $(".song.active").classList.remove('active');
        $(`.playlist .song:nth-child(${temp + 1})`).classList.add("active");
    },
    nextSong: function(){
        const countSong = this.song.length;
        this.currentIndex++;
        if(this.currentIndex > countSong - 1){
            this.currentIndex = 0;            
        }
        this.loadCurrentSong(); 
    },
    preSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.song.length - 1;            
        }
        this.loadCurrentSong(); 
    },
    //Random cho hết các bài hát trong danh sách roi lap lai
    randomSong: function(){
        this.listSongPlayed.length === this.song.length - 1 ? this.listSongPlayed.splice(0, this.listSongPlayed.length) : this.listSongPlayed.push(Number(this.currentIndex));
        do{
            var newIndex = Math.round(Math.random() * (this.song.length - 1));
        }while(newIndex == _this.currentIndex || this.listSongPlayed.includes(newIndex));
        _this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
   
    
    repeatSong: function(){
        if(audio.currentTime === audio.duration){
            audio.currentTime = 0;
        }
    },
    scrollToView: function(){
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end",
            })
        }, 300)
    },
    handleEvents: function (){
        // Đại diện cho list
        _this = this;
        // Xử lí scroll lớn nhỏ cdThumb
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            let newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 ;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    

        // Xử lí play music c1
        // playBtn.onclick =  function(){
        //     if(list.isPlaying){
        //         audio.pause();
        //         list.isPlaying = false;
        //     }
        //     else{
        //         audio.play();
        //         list.isPlaying = true;
        //     }
        //     $('.player').classList.toggle('playing');
        // }

        // Xử lí play music c2
        playBtn.onclick =  function(){
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
        }
        // Xử lí khi bấm play
        audio.onplay = function(){
            _this.isPlaying = true;
            $('.player').classList.add('playing');
            animateImg.play();
        }
        // Xử lí khi bấm pause
        audio.onpause = function(){
            _this.isPlaying = false;
            $('.player').classList.remove('playing')
            animateImg.pause();
        }

        //Xử lí CD quay / dừng
        const animateImg = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, // quay 1 vòng 10s
            iterations: Infinity
        })

        animateImg.pause();

        //Xử lí khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration * 100;
                $("#progress").value = progressPercent;
            }
        }
        //Xử lí khi seek bài hát
        $("#progress").onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        // Xử lí khi bấm next
        // nextBtn.onclick = function(){
        //     if(_this.isRandom){
        //         _this.randomSong();
        //     }
        //     else{
        //         _this.nextSong();
        //     }
        //     audio.play();
        //     _this.render();
        //     _this.scrollToView();
            
        // }

        //c2 active không cần render toàn danh sách
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.nextSong();
            }
            audio.play();
            _this.update();
            _this.scrollToView();
            
        }

        // Xử lí khi bấm pre

        preBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.preSong();
            }
            audio.play();
            // _this.render();
            _this.update();
            _this.scrollToView();
        }

        //Xử lí khi bấm random
        randomBtn.onclick = function(){
            randomBtn.classList.toggle('active');
            _this.isRandom = !_this.isRandom;
        }

        //Xử lí khi kết thúc bài thì tự next
        audio.onended = function(){
            if(_this.isRepeat){
                _this.repeatSong();
                audio.play();
            }
            else{
                nextBtn.click();
            }
        }
        
        //Xử lí khi lặp lại 1 bài hát bấm vào repeat
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active');
        }

        // Xử lí khi click vào 1 bài hát bất kỳ
        $('.playlist').onclick = function(e){
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                //Khi bấm vào thì chuyển bài
                if(e.target.closest('.song:not(.active)')){
                    _this.currentIndex = e.target.closest('.song:not(.active)').getAttribute('data-set');
                    _this.loadCurrentSong();
                    audio.play();
                    _this.update();
                }
                //Khi bấm vào option thì làm gì
                if(e.target.closest('.option')){

                }
            }
        }
    },
};

list.start();