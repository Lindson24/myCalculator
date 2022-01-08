const btnNum = document.querySelectorAll('[num]')
const opBtn = document.querySelectorAll('[op]')
const ac = document.querySelector('[ac]')
const del = document.querySelector('[del]')
const equal = document.querySelector('[equal]')
const prevDiv = document.querySelector('.prev')
const currDiv = document.querySelector('.curr')
const signal = document.querySelector('.signal')

class Calculator{
    constructor(prevDiv,currDiv,signal){
        this.prevDiv = prevDiv
        this.currDiv = currDiv
        this.signal = signal
        this.clear()
    }
    clear(){
        this.curr = ''
        this.prev = ''
        this.sig = ''
        this.op = undefined
    }
    del(){
        this.curr = this.curr.slice(0,-1)
    }
    operation(op){
        if(this.curr === '')return
        if(this.prev !== '' && this.curr !== ''){this.compute()}
        this.op = op
        this.prev = this.curr
        this.curr = ''
        this.sig = op
    }
    num(n){
        if(n === '.' && this.curr === '')return
        if(n === '.' && this.curr.includes('.'))return
        if(n === '0' && this.curr === '0')return
        if(this.curr === '0' && n !== '.')return
        this.curr = this.curr.toString() + n.toString()
    }
    compute(){
        let n = parseFloat(this.prev)
        let m = parseFloat(this.curr)
        let res 
        switch(this.op){
            case '+':res=n+m;break
            case '-':res=n-m;break
            case '*':res=n*m;break
            case '/':res=n/m;break
            default:return
        }
        this.sig = ''
        this.prev = ''
        this.curr = res.toString()
    }
    displayUpdate(){
        this.currDiv.innerText = this.curr
        this.prevDiv.innerText = this.prev
        this.signal.innerText = this.sig
    }
}

const app = new Calculator(prevDiv,currDiv,signal)

btnNum.forEach(x => {
    x.addEventListener('click',function(){
        app.num(x.innerText)
        app.displayUpdate()
    })
})
ac.addEventListener('click',function(){
    app.clear()
    app.displayUpdate()
})
opBtn.forEach(x => {
    x.addEventListener('click',function(){
        app.operation(x.innerText)
        app.displayUpdate()
    })
})
del.addEventListener('click',function(){
    app.del()
    app.displayUpdate()
})
equal.addEventListener('click',function(){
    app.compute()
    app.displayUpdate()
})
