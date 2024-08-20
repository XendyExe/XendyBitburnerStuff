import React from "react";
interface BarData {
    color: string,
    value: number
}

function BarElement(data: BarData, index: number) {
    return <div style={{
        marginTop: `-${index * 16}px`,
        height: "16px",
        background: data.color,
        borderRadius: "8px",
        transform: `translateX(-${(1 - data.value) * 100}%)`,
        transition: "transform 0.5s ease-out"
    }}/>
}

export function Bar(baseColor: string, text: string, data: BarData[]) {

    return <div style={{
        top: "-4px",
        margin: "8px",
        fontSize: "24px",
        background: baseColor,
        width: "calc(100% - 16px)",
        height: "16px",
        borderRadius: "8px",
        overflow: "hidden"
    }}>
        {...data.map(d=>BarElement(d, data.indexOf(d)))}
        <span style={{
            top: "-27px",
            marginLeft: "5px",
            fontSize: "13px",
            color: "#000000",
            position: "relative"
        }}>
            {text}
        </span>
    </div>
}