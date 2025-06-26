fetch('http://localhost:3002').then(response => response.text().then(data => {
    console.log(data)
}))

async function makeRequest(){
    const response = await fetch('http://localhost:3002')
    const data = await response.text()

    console.log(data)
}

makeRequest()