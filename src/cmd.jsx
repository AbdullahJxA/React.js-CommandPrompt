import React, { useState, useEffect, useRef } from "react"

function Cmd() {
    var [userText, setUserText] = useState("")
    var [outputText, setOutputText] = useState([])
    var containerRef = useRef(null)
    var test = ">"
    var onExit = () => {
        window.location.href = "https://youtube.com"
    }
    var ping = async (address) => {
        let results = []
            var start = Date.now()
            try {
                await fetch(address, { mode: "no-cors" })
                var end = Date.now()
                results.push(`Reply from ${address}: time=${end - start}ms`)
            } catch (error) {
                results.push(`Timeout`)
            }
        return results
    }
    var onEnter = async (event) => {
        if (event.key === "Enter") {
            let newOutput = ""
            if (userText === "help") {
                newOutput = "clear: Clears the command prompt\nshutdown: Shutsdown the command prompt\nping: Ping a website\ntime: Get the current time"
            } else if (userText === "clear") {
                setOutputText([])
                setUserText("")
                return
            } else if (userText === `jxa`) {
                newOutput = `You will be redirected in 3 seconds!`
                setTimeout(() => window.location.href = `https://jxa.world`, 3000)
            } else if (userText === `shutdown`) {
                newOutput = `Goodbye!`
                setTimeout(() => window.location.replace(`https://youtube.com`), 1000)
            } if (userText.startsWith("ping")) {
                var ipAddress = userText.split(" ")[1]
                if (ipAddress) {
                    newOutput = `Pinging ${ipAddress} with 32 bytes of data:\n`
                    var pingResults = await ping(`${ipAddress}`)
                    newOutput += pingResults.join("\n")
                } else {
                    newOutput = "Please specify an IP"
                }
            } else if (userText === "time") {
                var currentTime = new Date().toLocaleTimeString("en-US")
                newOutput = `${currentTime}`
            } else if (userText === "exit") {
                newOutput = `Exiting...`
                setTimeout(() => window.location.href = `https://google.com`, 1000)
            } else {
                newOutput = `"${userText}" is not recognized as an internal or external command`
            }
            setOutputText((prevOutput) => [...prevOutput, `C:\\Users\\Administrator> ${userText}`, newOutput])
            setUserText("")
            event.preventDefault()
        }
    }

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [outputText])

    return (
        <div>
            <div className="title"></div>
            <div className="cmd">
                <div className="talkingPartContainer" ref={containerRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <div className="talkingPart" id="1">
                        Microsoft Windows [Version 10.0.22631.4317]<br></br>
                        (c) Microsoft Corporation. All rights reserved.
                        <br />
                        {outputText.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                        <p className="userName">
                            C:\Users\Administrator{test}
                            <input type="text" className="userTextInput" value={userText} onChange={(e) => setUserText(e.target.value)} maxLength="50" onKeyPress={onEnter} autoFocus />
                        </p>
                    </div>
                </div>
            </div>
            <div className="cmdName">
                <i class="bx bx-x" id="closeButton" onClick={onExit}></i>
                <i className="bx bx-terminal"></i>
                <p>C:\WINDOWS\system32\cmd.exe</p>
            </div>
        </div>
    )
}

export default Cmd