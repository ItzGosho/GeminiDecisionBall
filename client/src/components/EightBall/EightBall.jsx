import { useState } from 'react';
import { motion } from 'framer-motion';
import './EightBall.css';

export default function EightBall({ isShaking, answer, isAnswering }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const shakeVariants = {
    shake: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.8 },
    },
    idle: {
      rotate: 0,
    },
  };

  const triangleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.9, duration: 0.4 },
    },
  };

  return (
    <div className="eightball-container">
      <motion.div
        className="eightball-wrapper"
        variants={shakeVariants}
        animate={isShaking ? 'shake' : 'idle'}
        onClick={() => !isAnswering && setIsFlipped(!isFlipped)}
      >
        <div className="eightball">
          <div className="eightball-shine"></div>

          {answer && (
            <motion.div
              className="answer-triangle-wrapper"
              variants={triangleVariants}
              initial="hidden"
              animate={isAnswering ? 'hidden' : 'visible'}
            >
              <div className="answer-triangle"></div>
              <motion.div
                className="answer-text"
                variants={textVariants}
                initial="hidden"
                animate={isAnswering ? 'hidden' : 'visible'}
              >
                {answer}
              </motion.div>
            </motion.div>
          )}

          {!answer && <div className="eightball-number">8</div>}
        </div>
      </motion.div>
      {answer && <p className="hint-text">Click the ball to flip</p>}
    </div>
  );
}
