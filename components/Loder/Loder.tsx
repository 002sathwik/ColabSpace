import React from "react";
import "./Loder.module.css"
const Loder = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="loader">
        <div className="box box-1">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-2">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-3">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
        <div className="box box-4">
          <div className="side-left" />
          <div className="side-right" />
          <div className="side-top" />
        </div>
      </div>
    </section>
  );
};

export default Loder;
