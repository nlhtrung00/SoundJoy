import React, { useEffect, useState } from 'react'

function ApiGenre() {
    const [genres, createGenres] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch('http://localhost:5000/genres')
            const jsonResult = await result.json()

            createGenres(jsonResult)
        }

        fetchData()
    }, [])

    const result = await fetch('http://localhost:5000/genres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
    })

    return (
        ApiGenre()
    )
}