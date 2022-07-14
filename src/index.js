const title = document.getElementById('title')
const poster = document.getElementById('poster')
const runtime = document.getElementById('runtime')
const filmInfo = document.getElementById('film-info')
const showtime = document.getElementById('showtime')
const ticketNum = document.getElementById('ticket-num')

const populatePage = async () => {
    let req = await fetch('http://localhost:3000/films/1')
    let res = await req.json()
    // console.log(res)
    title.textContent = res.title
    runtime.textContent = (res.runtime + " Minutes")
    poster.src = res.poster
    filmInfo.textContent = res.description
    showtime.textContent = res.showtime
    ticketNum.textContent = (res.capacity - res.tickets_sold)

    const button = document.getElementById('buy-ticket')
    button.addEventListener('click', () => {
            let tickets = parseInt(ticketNum.textContent)
            tickets--
            ticketNum.textContent = (`${tickets}`)
            if (ticketNum.textContent < 1 ) {
                button.textContent = "SOLD OUT"
                button.style.backgroundColor = "black"
                button.disabled = true
            }
    })
}

const films = document.getElementById('films')
films.textContent = ""

const listFilms = async () => {
    let req = await fetch('http://localhost:3000/films')
    let res = await req.json()
    // console.log(res)
    res.forEach((mov) => {
        // console.log(mov.title)
        let li = document.createElement('li')
        li.classList = "film item"
        li.textContent = mov.title
        films.append(li)
    })
}

listFilms()
populatePage()