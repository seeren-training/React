import { useState } from "react";

const useNavHook = () => {

    const [isBurger, setBurger] = useState(false);
    
    const [currentItem, setCurrentItem] = useState('');

    const toogleBurger = () => setBurger(() => !isBurger);

    const activeItem = (name) => setCurrentItem(() => name);
    
    return [isBurger, toogleBurger, currentItem, activeItem];

};

export default useNavHook;