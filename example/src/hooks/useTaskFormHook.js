import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { putBoard } from "../slices/boardSlice";

const useTaskFormHook = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);
    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState(null);

    const validateName = (name) => {
        setName(name)
        if (!name) {
            return setErrorName('Name is required');
        }
        if (name.length > 64) {
            return setErrorName('Name is too long');
        }
        return setErrorName(false);
    }

    const validateDescription = (description) => {
        setDescription(description)
        if (!description) {
            return setErrorDescription('Description is required');
        }
        if (description.length > 128) {
            return setErrorDescription('Description is too long');
        }
        return setErrorDescription(false);
    }

    const createTask = async (e) => {
        e.preventDefault();
        validateName(name);
        validateDescription(description);
        if (false === errorName
            && false === errorDescription) {
            await dispatch(putBoard({ name, description }));
            navigate('/task');
        }
    }

    return [name, description, errorName, errorDescription, validateName, validateDescription, createTask];

};

export default useTaskFormHook;