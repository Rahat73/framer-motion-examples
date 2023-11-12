import "./App.css";
import {
  AnimatePresence,
  animate,
  motion,
  useCycle,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { parentVariant, childVariant, exitAnimation } from "./assets/variants";
import { useEffect, useState } from "react";

function App() {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [color, cycleColor] = useCycle("red", "yellow");
  // const [reset, setReset] = useState(0);
  let count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  useEffect(() => {
    const controls = animate(count, 100, { duration: 10, ease: "easeInOut" });
    return controls.stop;
  }, [count]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-purple-950 via-sky-600 to-rose-900 p-10 bg-fixed">
        <div className="w-9/12 mx-auto mb-[300px] grid md:grid-cols-1 lg:grid-cols-3 gap-10">
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              whileTap={{ scale: 0.75, borderRadius: "100%" }}
              whileHover={{ rotate: 90 }}
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragSnapToOrigin="true"
              dragTransition={{ bounceDamping: 20, bounceStiffness: 500 }}
              className="w-32 h-32 bg-white rounded-2xl"
            ></motion.div>
            <p className="text-white">drag, whileTap, whileHover</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              className="w-32 h-32 bg-white rounded-2xl"
              drag="x"
              dragSnapToOrigin="true"
              style={{ x, opacity }}
            />
            <p className="text-white">drag x, useMotionValue, useTransform</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 180, scale: [1, 1.5] }}
              transition={{
                duration: 1,
              }}
              className="w-32 h-32 bg-white rounded-2xl"
            />
            <p className="text-white translate-y-8">whileInView</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div id="box" className="w-32 h-32 bg-white rounded-2xl"></div>
            <button
              onClick={() =>
                animate("#box", { opacity: [1, 0, 1], scale: [1, 1.1, 1] })
              }
              className="px-5 bg-red-600 text-white mt-5"
            >
              Click
            </button>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              animate={{
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-32 h-32 bg-white"
            />
            <p className="text-white">repeat, keyframes</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              variants={parentVariant}
              initial="closed"
              animate={isOpen ? "opened" : "closed"}
              className="text-white text-center font-bold text-4xl flex"
            >
              <motion.p variants={childVariant}>H</motion.p>
              <motion.p variants={childVariant}>E</motion.p>
              <motion.p variants={childVariant}>L</motion.p>
              <motion.p variants={childVariant}>L</motion.p>
              <motion.p variants={childVariant}>O</motion.p>
            </motion.div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 bg-red-600 text-white mt-5"
            >
              Click
            </button>
            <p className="text-white">variants, staggeredChildren</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              style={{ scale: scrollYProgress }}
              className="w-32 h-32 rounded-2xl bg-white"
            ></motion.div>
            <p className="text-white">scrollYProgress</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {color === "red" ? (
                <motion.div
                  variants={exitAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={"red"}
                  className="w-32 h-32 rounded-2xl bg-red-600"
                ></motion.div>
              ) : (
                <motion.div
                  variants={exitAnimation}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={"yellow"}
                  className="w-32 h-32 rounded-2xl bg-yellow-400"
                ></motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={() => cycleColor()}
              className="px-5 bg-red-600 text-white mt-5"
            >
              Cycle
            </button>
            <p className="text-white">exit animation</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              animate={{ scaleX: [null, 1.5, 2, null] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
                duration: 3,
                times: [0, 0.7, 0.8, 1],
              }}
              className="w-32 h-32 rounded-2xl bg-white"
            ></motion.div>
            <p className="text-white">repeat, times</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <motion.div
              variants={parentVariant}
              animate={isOpen ? "opened" : "closed"}
              className="w-32 h-32 rounded-2xl bg-white"
            >
              <motion.h1
                variants={childVariant}
                className="font-bold text-6xl text-red-500 min-h-full flex justify-center items-center"
              >
                X
              </motion.h1>
            </motion.div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-5 bg-red-600 text-white mt-5"
            >
              Click
            </button>
            <p className="text-white">variants, when</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div className="w-32 h-32 rounded-2xl bg-white flex justify-center items-center">
              <motion.p className="text-4xl font-bold text-red-500">
                {rounded}
              </motion.p>
            </div>
            {/* <button
              onClick={() => (count = 0)}
              className="px-5 bg-red-600 text-white mt-5"
            >
              Reset
            </button> */}
            <p className="text-white">useMotionValue, useTransform, animate</p>
          </div>
          <div className=" backdrop-blur-2xl w-72 h-72 rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <div
              className={`w-44 h-20 rounded-3xl bg-white p-2 cursor-pointer flex ${
                isOpen ? "justify-end" : "justify-start"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`w-20 h-18 rounded-3xl ${
                  isOpen ? "bg-yellow-500" : "bg-blue-400"
                }`}
              ></motion.div>
            </div>
            <p className="text-white">layout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
