import React from 'react';

const HEAD = (
  <div style={{
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    border: "4px solid black",
    position: "absolute",
    top: "50px",
    right: "-20px",
    borderColor: "black",
    boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)", // Sketchy feel?
    transform: "rotate(-5deg)",
    borderStyle: "solid",
    // Hand-drawn effect using border-radius variance
    borderTopLeftRadius: "60% 40%",
    borderTopRightRadius: "40% 60%",
    borderBottomRightRadius: "50% 50%",
    borderBottomLeftRadius: "50% 55%",
  }} />
);

const BODY = (
  <div style={{
    width: "6px",
    height: "100px",
    background: "black",
    position: "absolute",
    top: "100px",
    right: "3px",
    transform: "rotate(2deg)"
  }} />
);

const RIGHT_ARM = (
  <div style={{
    width: "80px",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "130px",
    right: "-77px",
    transform: "rotate(-30deg)",
    transformOrigin: "left bottom",
    borderRadius: "20% 80% 20% 80%",
  }} />
);

const LEFT_ARM = (
  <div style={{
    width: "80px",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "130px",
    right: "9px",
    transform: "rotate(30deg)",
    transformOrigin: "right bottom",
    borderRadius: "80% 20% 80% 20%",
  }} />
);

const RIGHT_LEG = (
  <div style={{
    width: "80px",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "190px",
    right: "-70px",
    transform: "rotate(60deg)",
    transformOrigin: "left bottom",
    borderRadius: "30% 70% 30% 70%",
  }} />
);

const LEFT_LEG = (
  <div style={{
    width: "80px",
    height: "6px",
    background: "black",
    position: "absolute",
    top: "190px",
    right: "0px",
    transform: "rotate(-60deg)",
    transformOrigin: "right bottom",
    borderRadius: "70% 30% 70% 30%",
  }} />
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

export function HangmanDrawing({ numberOfGuesses }) {
  return (
    <div style={{ position: "relative" }} className="h-[400px] w-[320px]">
      {BODY_PARTS.slice(0, numberOfGuesses).map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
      
      {/* NOOSE */}
      <div style={{ height: "50px", width: "6px", background: "black", position: "absolute", top: 0, right: 0, transform: "rotate(1deg)" }} />
      {/* TOP BAR */}
      <div style={{ height: "6px", width: "200px", background: "black", marginLeft: "120px", transform: "rotate(-1deg)" }} />
      {/* POLE */}
      <div style={{ height: "350px", width: "6px", background: "black", marginLeft: "120px", transform: "rotate(0.5deg)" }} />
      {/* BASE */}
      <div style={{ height: "6px", width: "250px", background: "black", transform: "rotate(-0.5deg)" }} />
    </div>
  );
}
