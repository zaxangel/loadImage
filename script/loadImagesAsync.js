class loadImagesAsync{
    constructor(){
        this.start = { y:0 };
        this.end = { y:0 };
        this.index = 0;
        this.max = 0;
        this.moveY = 250;
        
        this.init();
    }
    init(){
        this.touchModule();
        this.getData();
        
    }
    getData(){
        this.ajax("http://localhost:3000/data").then((data) => {
            this.arr = JSON.parse(data);
            this.max = this.arr.length;
            this.addImage();
        })
    }
    addImage(){
        if(this.index >= this.max){
            return;
        }else{
            this.createImage(this.arr[this.index]).then((img) => {
                document.body.appendChild(img);
            })
            this.index++;
        }

    }
    ajax(url){
        return new Promise((resolve, reject) => {
            let xhr = null;
            if(window.XMLHttpRequest){
                xhr = new XMLHttpRequest();
            }else{
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.onreadystatechange = () => {
                if(xhr.readyState !== 4){
                    return;
                }
                if(xhr.status === 200){
                    let data = xhr.responseText;
                    resolve(data);
                }else{
                    let error = new Error('Failed To Load Images.');
                    reject(error);
                }
            }
            xhr.open('get', url);
            xhr.send(null);
        });
    }
    createImage(src){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = src;
            img.onload = () => {
                resolve(img);
            }
            img.onerror = () => {
                let err = new Error("图片跑丢了！");
                reject(err);
            }
        })
    }
    touchModule(){
        document.addEventListener("touchstart", (event) => {
            this.start.y = event.touches[0].clientY;
        });
        document.addEventListener("touchmove", (event) => {
            this.end.y = event.touches[0].clientY;
        })
        document.addEventListener("touchend", (event) => {
            let absY = Math.abs(this.end.y - this.start.y);
            if(absY > this.moveY){
                this.addImage();
            }
        })
    }
}