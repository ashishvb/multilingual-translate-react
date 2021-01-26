import  React,{ createContext, useState, useEffect, useContext } from 'react'

const TranslationCtx = createContext();

// Wrapper component to allow translation access all over the app
const MultiLingualTranslationWrapper = ({children, defLang, folderURL}) => {
    
    // State
    let [translation, setTranslations] = useState({})
    let [isTranslationLoading, setIsTranslationLoading] = useState(true);
    let [translationLanguage, setTranslationLanguage] = useState(localStorage.getItem('defLang') || defLang || 'en');
    let translationFolderURL =  folderURL || 'translations/'

    // Fetch translation of the default or user selected language
    useEffect(() => {
        
        onChangeTranslationLanguage()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    /**
     * @desc  Function to fetch and update translations on language change
     * @param  {string} language 
     */
    const onChangeTranslationLanguage = async (language = translationLanguage) => {
        setIsTranslationLoading(true);

        try {
            
            let response = await fetch(`${translationFolderURL}/${language}.json`);
            let responseJSON = await response.json();
        
            setTranslations(responseJSON);
            setTranslationLanguage(language);
            setIsTranslationLoading(false);
            localStorage.setItem('defLang', language);

       } catch (error) {

            setIsTranslationLoading(false);
            console.error(`Error in fetching/parsing the translations/${language}.json translation file`)
            console.error(error);   
       }

    }

    return (
        <TranslationCtx.Provider 
            value={{translation, isTranslationLoading, translationLanguage, onChangeTranslationLanguage}}>
            {children}
        </TranslationCtx.Provider>
    )
} 

/**
 * @desc custom hook to return functions to translate and change language
 */
const useTranslate = () => {

    const translationCtx =  useContext(TranslationCtx);
    
    /**
     * @desc Get value of the key from the nested translation json object
     * @param  {string} key Key of property whose value is required
     * @param  {string} defaultValue='' Fallback incase no translation found
     * @returns {string} The value of the key
     */
    const Translate = (key, defaultValue = '') => {

        if(Object.keys(translationCtx.translation).length === 0) return '';

        // Getting the value of the key from the nested translation json object
        let translation = translationCtx.translation;
        
        let tKeysArray  = key.split(".");

        tKeysArray.forEach(tKeysArrayItem => {
            translation = translation[tKeysArrayItem]
        });
    
        if(typeof translation != 'string' &&  typeof translation != 'number'  &&  typeof translation != 'boolean'){
            return  defaultValue || 'No translation found'
        }
    
        return translation;
    }

    // Change Language
    const ChangeLanguage = translationCtx.onChangeTranslationLanguage


    return [Translate, ChangeLanguage]
}


export default MultiLingualTranslationWrapper
export { useTranslate }