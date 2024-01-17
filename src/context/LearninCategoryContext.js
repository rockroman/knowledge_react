import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { createContext, useContext, useEffect, useState } from "react";

export const LearningCategoryContext = createContext();
export const SetLearningCategoryContext = createContext();

export const useLearningCategoryContext = () =>
  useContext(LearningCategoryContext);
export const useSetLearningCategoryContext = () =>
  useContext(SetLearningCategoryContext);

export const LearningCategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMount = async () => {
    try {
      const { data } = await axiosReq.get("/categories");
      console.log(data.results);
      setCategory(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <LearningCategoryContext.Provider value={category}>
      <SetLearningCategoryContext.Provider value={setCategory}>
        {children}
      </SetLearningCategoryContext.Provider>
    </LearningCategoryContext.Provider>
  );
};
