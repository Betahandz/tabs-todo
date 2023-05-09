import { motion } from 'framer-motion';

const Btn = ({title, handleClick}) => {
    return(
        <motion.button className="tab-button"
            animate={{scale: 1}}
            initial={{scale: 0}}
            transition={{type: "spring", bounce: 3}}
            onClick={handleClick}
        >
            {title}
        </motion.button>
    )
}

export default Btn;