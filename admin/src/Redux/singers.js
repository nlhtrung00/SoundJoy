import React, { useEffect, useState } from 'react'

function ApiSinger() {
    const [singers, createSingers] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch('http://localhost:5000/singers')
            const jsonResult = await result.json()

            createSingers(jsonResult)
        }

        fetchData()
    }, [])

    const result = await fetch('http://localhost:5000/singers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
    })

    return (
        ApiGenre(result)
    )
}