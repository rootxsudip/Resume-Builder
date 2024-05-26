import React, { createContext, useState, useContext } from 'react';


const ResumeContext = createContext(null);


export const ResumeProvider = ({ children }) => {
    
    const [resumes, setResumes] = useState([]);

    const addResume = (newResume) => {
        if (resumes === null) {
            setResumes([newResume]);
        } else {
            setResumes([...resumes, newResume]);
        }
    };

    const addResumes = (resumes) => {
            setResumes(resumes)
    };

    const updateResume = (id, updatedResume) => {
        if (resumes !== null) {
            setResumes(resumes.map(resume => (resume.id === id ? updatedResume : resume)));
        }
    };

    const deleteResume = (id) => {
        if (resumes !== null) {
            setResumes(resumes.filter(resume => resume.id !== id));
        }
    };

    return (
        <ResumeContext.Provider value={{ resumes, addResume, updateResume, deleteResume, addResumes }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumes = () => useContext(ResumeContext);
