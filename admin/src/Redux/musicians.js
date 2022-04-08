import React, { useEffect, useState } from 'react'

function ApiMusician() {
    const [musicians, createMusicians] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch('http://localhost:5000/musicians')
            const jsonResult = await result.json()

            createMusicians(jsonResult)
        }

        fetchData()
    }, [])

    const result = await fetch('http://localhost:5000/musicians', {
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